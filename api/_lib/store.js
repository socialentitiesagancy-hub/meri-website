const { put, get } = require('@vercel/blob');
const {
  SESSION_COOKIE,
  allowCors,
  parseCookies,
  readJsonBody,
  sendJson,
  verifySessionToken,
} = require('./auth.js');

async function readList(key) {
  const result = await get(key, { access: 'private', useCache: false });
  if (!result || !result.stream) return [];
  const data = await new Response(result.stream).json();
  return Array.isArray(data) ? data : [];
}

async function writeList(key, data) {
  await put(key, JSON.stringify(data), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

function createListHandler({ key, max }) {
  return async function handler(req, res) {
    allowCors(req, res);
    if (req.method === 'OPTIONS') return res.status(204).end();

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return sendJson(res, 500, { error: 'BLOB_READ_WRITE_TOKEN not set' });
    }

    try {
      if (req.method === 'GET') {
        res.setHeader('Cache-Control', 'no-store');
        return sendJson(res, 200, await readList(key));
      }

      const session = verifySessionToken(parseCookies(req)[SESSION_COOKIE]);
      if (!session.ok) return sendJson(res, 401, { error: 'Not authenticated' });

      if (req.method === 'POST') {
        const item = readJsonBody(req);
        if (!item || typeof item.id !== 'string') {
          return sendJson(res, 400, { error: 'Invalid item' });
        }
        const all = await readList(key);
        const idx = all.findIndex((x) => x.id === item.id);
        if (idx >= 0) {
          all[idx] = item;
        } else {
          if (max && all.length >= max) {
            return sendJson(res, 400, { error: `Max ${max} items reached.` });
          }
          all.unshift(item);
        }
        await writeList(key, all);
        return sendJson(res, 200, all);
      }

      if (req.method === 'DELETE') {
        const { id } = readJsonBody(req);
        const all = (await readList(key)).filter((x) => x.id !== id);
        await writeList(key, all);
        return sendJson(res, 200, all);
      }

      return sendJson(res, 405, { error: 'Method not allowed' });
    } catch (err) {
      console.error(`${key} handler error:`, err);
      return sendJson(res, 500, { error: err.message || String(err) });
    }
  };
}

module.exports = { readList, createListHandler };
