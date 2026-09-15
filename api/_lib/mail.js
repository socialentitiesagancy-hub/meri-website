const nodemailer = require('nodemailer');

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

async function sendOtpEmail(to, otp) {
  const host = requireEnv('SMTP_HOST');
  const port = Number(process.env.SMTP_PORT || '587');
  const user = requireEnv('SMTP_USER');
  const pass = requireEnv('SMTP_PASS');
  const from = process.env.SMTP_FROM || user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Social Entities Admin" <${from}>`,
    to,
    subject: 'Your Social Entities admin login code',
    text: `Your verification code is ${otp}. It expires in 10 minutes.\n\nIf you did not request this, ignore this email.`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#0F1A34">
        <h2 style="margin:0 0 12px;color:#5B6A50">Admin portal login</h2>
        <p style="margin:0 0 16px;line-height:1.5">Use this one-time code to sign in. It expires in <strong>10 minutes</strong>.</p>
        <p style="font-size:32px;letter-spacing:8px;font-weight:800;margin:24px 0;color:#0F1A34">${otp}</p>
        <p style="margin:0;color:#78716c;font-size:13px">If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { sendOtpEmail };
