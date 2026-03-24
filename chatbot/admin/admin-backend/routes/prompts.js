import express from 'express';
import { db } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import { syncConfigToFile } from '../utils/configSync.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  res.json(db.prompt_templates.all());
});

router.post('/', (req, res) => {
  const { name, content } = req.body;
  if (!name || content === undefined) return res.status(400).json({ error: '缺少 name 或 content' });
  const id = db.prompt_templates.create(name, content || '');
  syncConfigToFile();
  res.json({ id, success: true });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, content } = req.body;
  if (name !== undefined) db.prompt_templates.update(id, { name });
  if (content !== undefined) db.prompt_templates.update(id, { content });
  syncConfigToFile();
  res.json({ success: true });
});

router.post('/:id/activate', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.prompt_templates.setActive(id);
  syncConfigToFile();
  res.json({ success: true });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.prompt_templates.delete(id);
  syncConfigToFile();
  res.json({ success: true });
});

export const promptsRouter = router;
