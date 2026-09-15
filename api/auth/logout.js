const { allowCors, clearSessionCookie, sendJson } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  allowCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  clearSessionCookie(res);
  return sendJson(res, 200, { ok: true });
};
