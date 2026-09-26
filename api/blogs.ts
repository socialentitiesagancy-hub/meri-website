import { put, list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const BLOB_KEY = 'data/blogs.json';

async function readBlob(): Promise<unknown[]> {
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

async function writeBlob(data: unknown[]) {
  await put(BLOB_KEY, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const blogs = await readBlob();
    return res.json(blogs);
  }

  if (req.method === 'POST') {
    const blog = req.body;
    const all = await readBlob() as { id: string }[];
    const idx = all.findIndex((b) => b.id === blog.id);
    if (idx >= 0) all[idx] = blog;
    else all.unshift(blog);
    await writeBlob(all);
    return res.json(all);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const all = (await readBlob() as { id: string }[]).filter((b) => b.id !== id);
    await writeBlob(all);
    return res.json(all);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
