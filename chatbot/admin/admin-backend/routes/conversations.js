import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authMiddleware } from '../middleware/auth.js';
import { DATA_DIR } from '../db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONV_FILE = path.join(DATA_DIR, 'conversations.json');

function loadConv() {
  if (!fs.existsSync(CONV_FILE)) return { conversations: [], messages: [] };
  try {
    return JSON.parse(fs.readFileSync(CONV_FILE, 'utf8'));
  } catch {
    return { conversations: [], messages: [] };
  }
}

const router = express.Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  const { date_from, date_to } = req.query;
  const data = loadConv();
  let list = data.conversations || [];
  if (date_from) list = list.filter((c) => c.created_at >= date_from);
  if (date_to) list = list.filter((c) => c.created_at <= date_to + ' 23:59:59');
  list = list.sort((a, b) => (b.created_at > a.created_at ? 1 : -1)).slice(0, 500);
  res.json(list);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = loadConv();
  const conv = (data.conversations || []).find((c) => c.id === id);
  if (!conv) return res.status(404).json({ error: '对话不存在' });
  const messages = (data.messages || []).filter((m) => m.conversation_id === id).sort((a, b) => a.id - b.id);
  res.json({ ...conv, messages });
});

export const conversationsRouter = router;
