import express from 'express';
import nodemailer from 'nodemailer';
import { generateToken } from '../middleware/auth.js';
import { db } from '../db.js';

const router = express.Router();

// 允许登录的管理员邮箱白名单（在环境变量 ADMIN_EMAILS 中配置，逗号分隔）
const ALLOWED_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

const CODE_EXPIRE_MS = 10 * 60 * 1000; // 验证码10分钟有效

// SMTP 邮件配置
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// 内存存储验证码
const codeStore = new Map();

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/send-code
router.post('/send-code', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: '邮箱格式不正确' });
  }
  if (ALLOWED_EMAILS.length > 0 && !ALLOWED_EMAILS.includes(email.toLowerCase())) {
    return res.status(403).json({ success: false, message: '该邮箱无权限登录' });
  }

  const existing = codeStore.get(email);
  if (existing && Date.now() - existing.lastSentAt < 60 * 1000) {
    const waitSec = Math.ceil((60 * 1000 - (Date.now() - existing.lastSentAt)) / 1000);
    return res.status(429).json({ success: false, message: `请等待 ${waitSec} 秒后再发送` });
  }

  const code = generateCode();
  codeStore.set(email, {
    code,
    expireAt: Date.now() + CODE_EXPIRE_MS,
    lastSentAt: Date.now(),
    attempts: 0,
  });

  try {
    await transporter.sendMail({
      from: `"AnyBot 管理后台" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '【AnyBot】登录验证码',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#f9f9f9;border-radius:12px;">
          <h2 style="color:#1a1a2e;">AnyBot 管理后台</h2>
          <p style="color:#444;">您正在登录管理后台，验证码为：</p>
          <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#333;margin:24px 0;text-align:center;background:#fff;padding:16px;border-radius:8px;">
            ${code}
          </div>
          <p style="color:#888;font-size:13px;">验证码10分钟内有效，请勿泄露给他人。</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
          <p style="color:#aaa;font-size:12px;">如非本人操作，请忽略此邮件。</p>
        </div>
      `,
    });
    res.json({ success: true, message: '验证码已发送，请查收邮件' });
  } catch (err) {
    console.error('邮件发送失败:', err);
    codeStore.delete(email);
    res.status(500).json({ success: false, message: '邮件发送失败，请检查 SMTP 配置' });
  }
});

// POST /api/verify-code
router.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ success: false, message: '参数缺失' });
  }

  const record = codeStore.get(email);
  if (!record) {
    return res.status(400).json({ success: false, message: '验证码不存在，请重新发送' });
  }
  if (Date.now() > record.expireAt) {
    codeStore.delete(email);
    return res.status(400).json({ success: false, message: '验证码已过期，请重新发送' });
  }
  if (record.attempts >= 5) {
    codeStore.delete(email);
    return res.status(429).json({ success: false, message: '错误次数过多，请重新发送验证码' });
  }
  if (record.code !== String(code)) {
    record.attempts++;
    const left = 5 - record.attempts;
    return res.status(400).json({ success: false, message: `验证码错误，还可尝试 ${left} 次` });
  }

  codeStore.delete(email);

  // 记录登录日志
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
  try {
    db.login_logs.add(email, ip);
  } catch (e) {
    console.warn('记录登录日志失败:', e.message);
  }

  const token = generateToken(email);
  res.json({ success: true, message: '登录成功', token, email });
});

export const authRouter = router;
