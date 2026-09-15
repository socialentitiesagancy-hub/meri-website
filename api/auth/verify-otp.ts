import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  allowCors,
  createSessionToken,
  isEmailAllowed,
  normalizeEmail,
  rateLimit,
  readJsonBody,
  sendJson,
  setSessionCookie,
  verifyChallengeToken,
} from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  allowCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const { email, otp, challengeToken } = readJsonBody<{
      email?: string;
      otp?: string;
      challengeToken?: string;
    }>(req);

    if (!email || !otp || !challengeToken) {
      return sendJson(res, 400, { error: 'Email, code, and challenge token are required' });
    }

    const normalized = normalizeEmail(email);
    const code = String(otp).trim();
    if (!/^\d{6}$/.test(code)) {
      return sendJson(res, 400, { error: 'Enter the 6-digit code from your email' });
    }

    if (!isEmailAllowed(normalized)) {
      return sendJson(res, 401, { error: 'Unauthorized email' });
    }

    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : undefined) ||
      'unknown';
    if (!rateLimit(`verify:${ip}:${normalized}`, 10, 15 * 60 * 1000)) {
      return sendJson(res, 429, { error: 'Too many attempts. Try again later.' });
    }

    const result = verifyChallengeToken(challengeToken, normalized, code);
    if (result.ok === false) {
      return sendJson(res, 401, { error: result.error });
    }

    const sessionToken = createSessionToken(normalized);
    setSessionCookie(res, sessionToken);

    return sendJson(res, 200, {
      ok: true,
      email: normalized,
      message: 'Signed in successfully',
    });
  } catch (err) {
    console.error('verify-otp error', err);
    return sendJson(res, 500, { error: 'Verification failed' });
  }
}
