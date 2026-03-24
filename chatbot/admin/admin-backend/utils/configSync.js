/**
 * 将配置同步到 Python 后端可读取的 config.json
 */
import fs from 'fs';
import { db, DATA_DIR } from '../db.js';

const CONFIG_JSON = `${DATA_DIR}/config.json`;

export function syncConfigToFile() {
  const config = db.config.getAll();
  const promptId = config.system_prompt_id || '1';
  const prompt = db.prompt_templates.get(parseInt(promptId, 10));
  config.system_prompt = prompt?.content || '';
  config.system_prompt_updated_at = prompt?.updated_at || null;
  config.quick_replies = db.quick_replies.all().filter((r) => r.enabled).map((r) => ({ keyword: r.keyword, reply: r.reply }));
  fs.writeFileSync(CONFIG_JSON, JSON.stringify(config, null, 2), 'utf8');
}
