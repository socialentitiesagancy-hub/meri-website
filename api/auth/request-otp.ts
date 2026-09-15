import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  allowCors,
  createChallengeToken,
  generateOtp,
  isEmailAllowed,
  normalizeEmail,
  rateLimit,
  readJsonBody,
  sendJson,
} from '../_lib/auth';
import { sendOtpEmail } from '../_lib/mail';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  allowCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const { email } = readJsonBody<{ email?: string }>(req);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendJson(res, 400, { error: 'Enter a valid email address' });
    }

    const normalized = normalizeEmail(email);
    if (!isEmailAllowed(normalized)) {
      // Same response to avoid email enumeration
      return sendJson(res, 200, {
        ok: true,
        message: 'If this email is authorized, a code has been sent.',
      });
    }

    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : undefined) ||
      'unknown';
    if (!rateLimit(`otp:${ip}:${normalized}`, 5, 15 * 60 * 1000)) {
      return sendJson(res, 429, { error: 'Too many requests. Try again later.' });
    }

    const otp = generateOtp();
    const challengeToken = createChallengeToken(normalized, otp);
    await sendOtpEmail(normalized, otp);

    return sendJson(res, 200, {
      ok: true,
      challengeToken,
      message: 'Verification code sent. Check your inbox.',
      expiresInSeconds: 600,
    });
  } catch (err) {
    console.error('request-otp error', err);
    return sendJson(res, 500, {
      error: 'Unable to send verification code. Check SMTP configuration.',
    });
  }
}
