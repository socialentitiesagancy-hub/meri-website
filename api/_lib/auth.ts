import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const SESSION_COOKIE = 'se_admin_session';
export const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('AUTH_SECRET must be set (min 16 characters)');
  }
  return secret;
}

export function getAllowedEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS || '';
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailAllowed(email: string): boolean {
  const allowed = getAllowedEmails();
  if (allowed.length === 0) return false;
  return allowed.includes(email.trim().toLowerCase());
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function generateOtp(): string {
  return String(crypto.randomInt(100000, 999999));
}

export function hashOtp(otp: string, email: string): string {
  return crypto
    .createHmac('sha256', getSecret())
    .update(`${normalizeEmail(email)}:${otp}`)
    .digest('hex');
}

function b64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function fromB64url(input: string): Buffer {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, 'base64');
}

function sign(payloadB64: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payloadB64).digest('base64url');
}

export function createChallengeToken(email: string, otp: string): string {
  const payload = {
    email: normalizeEmail(email),
    otpHash: hashOtp(otp, email),
    exp: Date.now() + OTP_TTL_MS,
  };
  const payloadB64 = b64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

export function verifyChallengeToken(
  token: string,
  email: string,
  otp: string
): { ok: true } | { ok: false; error: string } {
  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false, error: 'Invalid challenge token' };

  const [payloadB64, sig] = parts;
  const expected = sign(payloadB64);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, error: 'Invalid challenge token' };
  }

  let payload: { email: string; otpHash: string; exp: number };
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

export function createSessionToken(email: string): string {
  const payload = {
    email: normalizeEmail(email),
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payloadB64 = b64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

export function verifySessionToken(
  token: string | undefined
): { ok: true; email: string } | { ok: false } {
  if (!token) return { ok: false };
  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false };
  const [payloadB64, sig] = parts;
  const expected = sign(payloadB64);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return { ok: false };

  try {
    const payload = JSON.parse(fromB64url(payloadB64).toString('utf8')) as {
      email: string;
      exp: number;
    };
    if (!payload.email || !payload.exp || Date.now() > payload.exp) return { ok: false };
    if (!isEmailAllowed(payload.email)) return { ok: false };
    return { ok: true, email: payload.email };
  } catch {
    return { ok: false };
  }
}

export function parseCookies(req: VercelRequest): Record<string, string> {
  const header = req.headers.cookie;
  if (!header) return {};
  return Object.fromEntries(
    header.split(';').map((part) => {
      const [k, ...rest] = part.trim().split('=');
      return [k, decodeURIComponent(rest.join('=') || '')];
    })
  );
}

export function setSessionCookie(res: VercelResponse, token: string) {
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

export function clearSessionCookie(res: VercelResponse) {
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  const parts = [
    `${SESSION_COOKIE}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
  ];
  if (secure) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function readJsonBody<T>(req: VercelRequest): T {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body || '{}') as T;
  }
  return (req.body || {}) as T;
}

export function sendJson(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader('Content-Type', 'application/json').json(body);
}

export function allowCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/** Simple per-instance rate limit (best-effort on serverless). */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 15 * 60 * 1000): boolean {
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
