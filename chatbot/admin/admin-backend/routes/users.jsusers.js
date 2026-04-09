import express from 'express';
import { db } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/users — 返回去重后的用户列表（每个邮箱最新登录时间 + 登录次数）
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

export const usersRouter = router;
