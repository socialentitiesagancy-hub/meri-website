import type { VercelRequest, VercelResponse } from '@vercel/node';
import { allowCors, clearSessionCookie, sendJson } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  allowCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  clearSessionCookie(res);
  return sendJson(res, 200, { ok: true });
}
