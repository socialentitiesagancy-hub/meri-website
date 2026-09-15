const {
  SESSION_COOKIE,
  allowCors,
  parseCookies,
  sendJson,
  verifySessionToken,
} = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
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
};
