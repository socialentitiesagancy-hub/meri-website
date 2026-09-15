const crypto = require('crypto');

const SESSION_COOKIE = 'se_admin_session';
const OTP_TTL_MS = 10 * 60 * 1000;
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('AUTH_SECRET must be set (min 16 characters)');
  }
  return secret;
}

function getAllowedEmails() {
  return String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function isEmailAllowed(email) {
  const allowed = getAllowedEmails();
  if (allowed.length === 0) return false;
  return allowed.includes(String(email).trim().toLowerCase());
}

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}

function hashOtp(otp, email) {
  return crypto
    .createHmac('sha256', getSecret())
    .update(`${normalizeEmail(email)}:${otp}`)
    .digest('hex');
}

function b64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function fromB64url(input) {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, 'base64');
}

function sign(payloadB64) {
  return b64url(crypto.createHmac('sha256', getSecret()).update(payloadB64).digest());
}

function createChallengeToken(email, otp) {
  const payload = {
    email: normalizeEmail(email),
    otpHash: hashOtp(otp, email),
    exp: Date.now() + OTP_TTL_MS,
  };
  const payloadB64 = b64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

function verifyChallengeToken(token, email, otp) {
  const parts = String(token || '').split('.');
  if (parts.length !== 2) return { ok: false, error: 'Invalid challenge token' };

  const [payloadB64, sig] = parts;
  const expected = sign(payloadB64);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, error: 'Invalid challenge token' };
  }

  let payload;
  try {
    payload = JSON.parse(fromB64url(payloadB64).toString('utf8'));
  } catch {
    return { ok: false, error: 'Invalid challenge token' };
  }

  if (!payload?.email || !payload?.otpHash || !payload?.exp) {
    return { ok: false, error: 'Invalid challenge token' };
  }
  if (Date.now() > payload.exp) {
    return { ok: false, error: 'Code expired. Request a new one.' };
  }
  if (payload.email !== normalizeEmail(email)) {
    return { ok: false, error: 'Email mismatch' };
  }

  const otpHash = hashOtp(otp, email);
  const ha = Buffer.from(otpHash);
  const hb = Buffer.from(payload.otpHash);
  if (ha.length !== hb.length || !crypto.timingSafeEqual(ha, hb)) {
    return { ok: false, error: 'Invalid verification code' };
  }

  return { ok: true };
}

function createSessionToken(email) {
  const payload = {
    email: normalizeEmail(email),
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payloadB64 = b64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

function verifySessionToken(token) {
  if (!token) return { ok: false };
  const parts = String(token).split('.');
  if (parts.length !== 2) return { ok: false };
  const [payloadB64, sig] = parts;
  const expected = sign(payloadB64);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return { ok: false };

  try {
    const payload = JSON.parse(fromB64url(payloadB64).toString('utf8'));
    if (!payload.email || !payload.exp || Date.now() > payload.exp) return { ok: false };
    if (!isEmailAllowed(payload.email)) return { ok: false };
    return { ok: true, email: payload.email };
  } catch {
    return { ok: false };
  }
}

function parseCookies(req) {
  const header = req.headers.cookie;
  if (!header) return {};
  return Object.fromEntries(
    header.split(';').map((part) => {
      const [k, ...rest] = part.trim().split('=');
      return [k, decodeURIComponent(rest.join('=') || '')];
    })
  );
}

function setSessionCookie(res, token) {
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ];
  if (secure) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

function clearSessionCookie(res) {
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  const parts = [`${SESSION_COOKIE}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0'];
  if (secure) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

function readJsonBody(req) {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body || '{}');
    } catch {
      return {};
    }
  }
  return req.body || {};
}

function sendJson(res, status, body) {
  if (typeof res.status === 'function') {
    return res.status(status).json(body);
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function allowCors(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const hits = new Map();

function rateLimit(key, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || now > row.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (row.count >= limit) return false;
  row.count += 1;
  return true;
}

module.exports = {
  SESSION_COOKIE,
  getAllowedEmails,
  isEmailAllowed,
  normalizeEmail,
  generateOtp,
  createChallengeToken,
  verifyChallengeToken,
  createSessionToken,
  verifySessionToken,
  parseCookies,
  setSessionCookie,
  clearSessionCookie,
  readJsonBody,
  sendJson,
  allowCors,
  rateLimit,
};
