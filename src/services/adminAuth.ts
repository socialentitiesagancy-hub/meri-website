/**
 * Frontend helpers for admin email OTP auth (Vercel serverless + SMTP).
 */

export type SessionResponse = {
  authenticated: boolean;
  email?: string;
  error?: string;
};

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  return data as T;
}

export async function fetchAdminSession(): Promise<SessionResponse> {
  const res = await fetch('/api/auth/session', {
    method: 'GET',
    credentials: 'include',
  });
  return parseJson<SessionResponse>(res);
}

export async function requestAdminOtp(email: string): Promise<{
  ok: boolean;
  challengeToken?: string;
  message?: string;
  error?: string;
}> {
  const res = await fetch('/api/auth/request-otp', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await parseJson<{
    ok?: boolean;
    challengeToken?: string;
    message?: string;
    error?: string;
  }>(res);
  if (!res.ok) {
    return { ok: false, error: data.error || 'Failed to send code' };
  }
  return {
    ok: true,
    challengeToken: data.challengeToken,
    message: data.message,
  };
}

export async function verifyAdminOtp(input: {
  email: string;
  otp: string;
  challengeToken: string;
}): Promise<{ ok: boolean; email?: string; error?: string }> {
  const res = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await parseJson<{ ok?: boolean; email?: string; error?: string }>(res);
  if (!res.ok) {
    return { ok: false, error: data.error || 'Verification failed' };
  }
  return { ok: true, email: data.email };
}

export async function logoutAdmin(): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
}
