import express from 'express';
import { db } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/users — 返回去重后的用户列表（每个邮箱最新登录时间 + 登录次数 + 状态）
router.get('/', authMiddleware, (req, res) => {
  try {
    const users = db.login_logs.uniqueUsers();
    res.json(users);
  } catch (err) {
    console.error('获取用户列表失败:', err);
    res.status(500).json({ error: '获取用户列表失败' });
  }
});

// GET /api/users/logs — 返回完整登录记录（按时间倒序）
router.get('/logs', authMiddleware, (req, res) => {
  try {
    const logs = db.login_logs.all();
    res.json(logs);
  } catch (err) {
    console.error('获取登录记录失败:', err);
    res.status(500).json({ error: '获取登录记录失败' });
  }
});

// POST /api/users/ban — 封禁用户
router.post('/ban', authMiddleware, (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: '缺少 email 参数' });
  try {
    db.login_logs.ban(email);
    res.json({ success: true, message: `用户 ${email} 已被封禁` });
  } catch (err) {
    console.error('封禁用户失败:', err);
    res.status(500).json({ error: '封禁用户失败' });
  }
});

// POST /api/users/unban — 解封用户
router.post('/unban', authMiddleware, (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: '缺少 email 参数' });
  try {
    db.login_logs.unban(email);
    res.json({ success: true, message: `用户 ${email} 已解封` });
  } catch (err) {
    console.error('解封用户失败:', err);
    res.status(500).json({ error: '解封用户失败' });
  }
});

// DELETE /api/users/:email — 注销用户（删除所有登录记录，允许重新注册）
router.delete('/:email', authMiddleware, (req, res) => {
  const email = decodeURIComponent(req.params.email);
  if (!email) return res.status(400).json({ error: '缺少 email 参数' });
  try {
    db.login_logs.deleteUser(email);
    res.json({ success: true, message: `用户 ${email} 已注销，可重新注册` });
  } catch (err) {
    console.error('注销用户失败:', err);
    res.status(500).json({ error: '注销用户失败' });
  }
});

export const usersRouter = router;
