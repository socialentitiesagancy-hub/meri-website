const BLOB_KEY = 'data/blogs.json';

async function readBlob(put, list, download) {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (!blobs.length) return [];
    const { data } = await download(blobs[0].url);
    const text = await data.text();
    return JSON.parse(text);
  } catch {
    return [];
  }
}

async function writeBlob(put, data) {
  await put(BLOB_KEY, JSON.stringify(data), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  let put, list, download;
  try {
    const blob = require('@vercel/blob');
    put = blob.put;
    list = blob.list;
    download = blob.download;
  } catch (e) {
    return res.status(500).json({ error: 'blob_import_failed: ' + e.message });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ error: 'BLOB_READ_WRITE_TOKEN not set' });
  }

  try {
    if (req.method === 'GET') {
      const blogs = await readBlob(put, list, download);
      return res.status(200).json(blogs);
    }

    if (req.method === 'POST') {
      const blog = req.body;
      const all = await readBlob(put, list, download);
      const idx = all.findIndex((b) => b.id === blog.id);
      if (idx >= 0) all[idx] = blog;
      else all.unshift(blog);
      await writeBlob(put, all);
      return res.status(200).json(all);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const all = (await readBlob(put, list, download)).filter((b) => b.id !== id);
      await writeBlob(put, all);
      return res.status(200).json(all);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
};
