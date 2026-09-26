const BLOB_KEY = 'data/case-studies.json';
const MAX = 6;

async function readBlob(put, list) {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (!blobs.length) return [];
    const res = await fetch(blobs[0].url);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function writeBlob(put, data) {
  await put(BLOB_KEY, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  let put, list;
  try {
    const blob = require('@vercel/blob');
    put = blob.put;
    list = blob.list;
  } catch (e) {
    return res.status(500).json({ error: 'blob_import_failed: ' + e.message });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ error: 'BLOB_READ_WRITE_TOKEN not set' });
  }

  try {
    if (req.method === 'GET') {
      const studies = await readBlob(put, list);
      return res.status(200).json(studies);
    }

    if (req.method === 'POST') {
      const study = req.body;
      const all = await readBlob(put, list);
      const idx = all.findIndex((c) => c.id === study.id);
      if (idx >= 0) {
        all[idx] = study;
      } else {
        if (all.length >= MAX) {
          return res.status(400).json({ error: `Max ${MAX} case studies reached.` });
        }
        all.unshift(study);
      }
      await writeBlob(put, all);
      return res.status(200).json(all);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const all = (await readBlob(put, list)).filter((c) => c.id !== id);
      await writeBlob(put, all);
      return res.status(200).json(all);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
};
