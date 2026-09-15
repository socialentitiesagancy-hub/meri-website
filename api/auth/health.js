const { allowCors, sendJson } = require('../_lib/auth.js');

/** Simple health check to verify /api works on Vercel */
module.exports = async function handler(req, res) {
  allowCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  return sendJson(res, 200, {
    ok: true,
    hasAuthSecret: Boolean(process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 16),
    hasAdminEmails: Boolean(process.env.ADMIN_EMAILS),
    hasSmtpHost: Boolean(process.env.SMTP_HOST),
    hasSmtpUser: Boolean(process.env.SMTP_USER),
    hasSmtpPass: Boolean(process.env.SMTP_PASS),
  });
};
