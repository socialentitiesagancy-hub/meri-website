import { put, list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const BLOB_KEY = 'data/case-studies.json';
const MAX = 6;

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
    const studies = await readBlob();
    return res.json(studies);
  }

  if (req.method === 'POST') {
    const study = req.body;
    const all = await readBlob() as { id: string }[];
    const idx = all.findIndex((c) => c.id === study.id);
    if (idx >= 0) {
      all[idx] = study;
    } else {
      if (all.length >= MAX) {
        return res.status(400).json({ error: `Max ${MAX} case studies reached.` });
      }
      all.unshift(study);
    }
    await writeBlob(all);
    return res.json(all);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const all = (await readBlob() as { id: string }[]).filter((c) => c.id !== id);
    await writeBlob(all);
    return res.json(all);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
