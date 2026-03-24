import express from 'express';
import { db } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import { syncConfigToFile } from '../utils/configSync.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  const config = db.config.getAll();
  const prompts = db.prompt_templates.all();
  const activePrompt = prompts.find((p) => p.is_active) || prompts[0];
  res.json({
    temperature: parseFloat(config.temperature || 0.7),
    max_tokens: parseInt(config.max_tokens || 2048, 10),
    model: config.model || 'deepseek-chat',
    prompt_templates: prompts,
    active_prompt_id: activePrompt?.id,
    active_prompt_updated_at: activePrompt?.updated_at,
  });
});

router.post('/', (req, res) => {
  const { temperature, max_tokens, model } = req.body;
  if (temperature !== undefined) {
    db.config.set('temperature', Math.max(0, Math.min(1, parseFloat(temperature))));
  }
  if (max_tokens !== undefined) {
    db.config.set('max_tokens', Math.max(100, Math.min(8192, parseInt(max_tokens, 10))));
  }
  if (model !== undefined) {
    db.config.set('model', String(model));
  }
  syncConfigToFile();
  res.json({ success: true });
});

export { router as configRouter };
