const {
  allowCors,
  createChallengeToken,
  generateOtp,
  isEmailAllowed,
  normalizeEmail,
  rateLimit,
  readJsonBody,
  sendJson,
} = require('../_lib/auth.js');
const { sendOtpEmail } = require('../_lib/mail.js');

module.exports = async function handler(req, res) {
  allowCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const { email } = readJsonBody(req);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendJson(res, 400, { error: 'Enter a valid email address' });
    }

    const normalized = normalizeEmail(email);
    if (!isEmailAllowed(normalized)) {
      return sendJson(res, 200, {
        ok: true,
        message: 'If this email is authorized, a code has been sent.',
      });
    }

    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : undefined) || 'unknown';
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
      detail: process.env.NODE_ENV === 'production' ? undefined : String(err && err.message),
    });
  }
};
