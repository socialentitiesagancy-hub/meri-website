import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  SESSION_COOKIE,
  allowCors,
  parseCookies,
  sendJson,
  verifySessionToken,
} from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  allowCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const cookies = parseCookies(req);
    const session = verifySessionToken(cookies[SESSION_COOKIE]);
    if (!session.ok) {
      return sendJson(res, 401, { authenticated: false });
    }
    return sendJson(res, 200, { authenticated: true, email: session.email });
  } catch (err) {
    console.error('session error', err);
    return sendJson(res, 500, { authenticated: false, error: 'Session check failed' });
  }
}
