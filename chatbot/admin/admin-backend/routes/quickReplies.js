import express from 'express';
import { db } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import { syncConfigToFile } from '../utils/configSync.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  res.json(db.quick_replies.all());
});

router.post('/', (req, res) => {
  const { keyword, reply } = req.body;
  if (!keyword || reply === undefined) return res.status(400).json({ error: '缺少 keyword 或 reply' });
  const id = db.quick_replies.create(keyword, reply || '');
  syncConfigToFile();
  res.json({ id, success: true });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { keyword, reply, enabled } = req.body;
  const updates = {};
  if (keyword !== undefined) updates.keyword = keyword;
  if (reply !== undefined) updates.reply = reply;
  if (enabled !== undefined) updates.enabled = enabled;
  if (Object.keys(updates).length) db.quick_replies.update(id, updates);
  syncConfigToFile();
  res.json({ success: true });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.quick_replies.delete(id);
  syncConfigToFile();
  res.json({ success: true });
});

export const quickRepliesRouter = router;
