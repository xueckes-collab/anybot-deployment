/**
 * JSON 文件存储（无需原生依赖）
 */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'admin-data');
const DATA_FILE = path.join(DATA_DIR, 'data.json');
const DOCS_DIR = path.join(DATA_DIR, 'documents');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

const DEFAULT_DATA = {
  config: { temperature: '0.7', max_tokens: '2048', model: 'deepseek-chat', system_prompt_id: '1' },
  prompt_templates: [],
  quick_replies: [],
  documents: [],
  conversations: [],
  messages: [],
  login_logs: [],
};

function load() {
  if (!fs.existsSync(DATA_FILE)) return { ...DEFAULT_DATA };
  try {
    const d = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    // 兼容旧数据：补充缺失字段
    if (!d.login_logs) d.login_logs = [];
    return d;
  } catch {
    return { ...DEFAULT_DATA };
  }
}

function save(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

let _data = load();

// 初始化默认 Prompt（如果还没有）
if (!_data.prompt_templates || _data.prompt_templates.length === 0) {
  _data.prompt_templates = [{
    id: 1,
    name: 'Default',
    content: `You are an intelligent product consultant for Anyway Flooring, a professional flooring and wall panel manufacturer. Your job is to help customers learn about products, compare options, and make informed decisions.

Rules:
- Answer based ONLY on the product knowledge provided below. Do not fabricate specs or claims.
- If the knowledge base doesn't have the answer, say so honestly and suggest contacting the sales team.
- Be professional yet friendly. Use tables for parameter comparisons when helpful.
- When recommending products, explain your reasoning.
- You can respond in the same language the customer uses (English, Chinese, etc.).

【Product Knowledge】
{context}`,
    is_active: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }];
  save(_data);
}

const db = {
  config: {
    getAll() {
      return { ..._data.config };
    },
    set(key, value) {
      _data.config[key] = String(value);
      save(_data);
    },
  },
  prompt_templates: {
    all() {
      return [..._data.prompt_templates];
    },
    get(id) {
      return _data.prompt_templates.find((p) => p.id === id);
    },
    create(name, content) {
      const id = (_data.prompt_templates.reduce((m, p) => Math.max(m, p.id), 0)) + 1;
      const now = new Date().toISOString();
      _data.prompt_templates.push({ id, name, content, is_active: 0, created_at: now, updated_at: now });
      save(_data);
      return id;
    },
    update(id, data) {
      const p = _data.prompt_templates.find((x) => x.id === id);
      if (!p) return;
      if (data.name !== undefined) p.name = data.name;
      if (data.content !== undefined) p.content = data.content;
      p.updated_at = new Date().toISOString();
      save(_data);
    },
    setActive(id) {
      _data.prompt_templates.forEach((p) => { p.is_active = p.id === id ? 1 : 0; });
      _data.config.system_prompt_id = String(id);
      save(_data);
    },
    delete(id) {
      _data.prompt_templates = _data.prompt_templates.filter((p) => p.id !== id);
      save(_data);
    },
  },
  quick_replies: {
    all() {
      return [..._data.quick_replies];
    },
    create(keyword, reply) {
      const id = (_data.quick_replies.reduce((m, r) => Math.max(m, r.id), 0)) + 1;
      _data.quick_replies.push({ id, keyword: keyword.trim(), reply, enabled: 1, created_at: new Date().toISOString() });
      save(_data);
      return id;
    },
    update(id, data) {
      const r = _data.quick_replies.find((x) => x.id === id);
      if (!r) return;
      if (data.keyword !== undefined) r.keyword = data.keyword.trim();
      if (data.reply !== undefined) r.reply = data.reply;
      if (data.enabled !== undefined) r.enabled = data.enabled ? 1 : 0;
      save(_data);
    },
    delete(id) {
      _data.quick_replies = _data.quick_replies.filter((r) => r.id !== id);
      save(_data);
    },
  },
  documents: {
    all() {
      return [..._data.documents];
    },
    create(filename, filepath, file_type) {
      const id = (_data.documents.reduce((m, d) => Math.max(m, d.id), 0)) + 1;
      _data.documents.push({ id, filename, filepath, file_type, status: 'pending', created_at: new Date().toISOString() });
      save(_data);
      return id;
    },
    get(id) {
      return _data.documents.find((d) => d.id === id);
    },
    delete(id) {
      _data.documents = _data.documents.filter((d) => d.id !== id);
      save(_data);
    },
  },
  conversations: {
    all(filters = {}) {
      let list = [..._data.conversations];
      if (filters.date_from) {
        list = list.filter((c) => c.created_at >= filters.date_from);
      }
      if (filters.date_to) {
        list = list.filter((c) => c.created_at <= filters.date_to + ' 23:59:59');
      }
      return list.sort((a, b) => (b.created_at > a.created_at ? 1 : -1)).slice(0, 500);
    },
    get(id) {
      const c = _data.conversations.find((x) => x.id === id);
      if (!c) return null;
      const messages = _data.messages.filter((m) => m.conversation_id === id).sort((a, b) => a.id - b.id);
      return { ...c, messages };
    },
    getOrCreate(session_id) {
      let c = _data.conversations.find((x) => x.session_id === session_id);
      if (!c) {
        const id = (_data.conversations.reduce((m, x) => Math.max(m, x.id), 0)) + 1;
        c = { id, session_id, created_at: new Date().toISOString() };
        _data.conversations.push(c);
        save(_data);
      }
      return c.id;
    },
    addMessage(convId, role, content) {
      const id = (_data.messages.reduce((m, x) => Math.max(m, x.id), 0)) + 1;
      _data.messages.push({ id, conversation_id: convId, role, content, created_at: new Date().toISOString() });
      save(_data);
    },
  },
  login_logs: {
    // 记录一次登录
    add(email, ip) {
      if (!_data.login_logs) _data.login_logs = [];
      const id = (_data.login_logs.reduce((m, x) => Math.max(m, x.id), 0)) + 1;
      _data.login_logs.push({ id, email, ip: ip || '', login_at: new Date().toISOString() });
      save(_data);
    },
    // 返回所有登录记录，按时间倒序
    all() {
      if (!_data.login_logs) return [];
      return [..._data.login_logs].sort((a, b) => (b.login_at > a.login_at ? 1 : -1));
    },
    // 返回去重后的用户列表（每个邮箱只保留最新登录时间）
    uniqueUsers() {
      if (!_data.login_logs) return [];
      const map = new Map();
      for (const log of _data.login_logs) {
        if (!map.has(log.email) || log.login_at > map.get(log.email).last_login) {
          map.set(log.email, {
            email: log.email,
            last_login: log.login_at,
            login_count: 0,
          });
        }
      }
      // 统计每个邮箱的登录次数
      for (const log of _data.login_logs) {
        if (map.has(log.email)) {
          map.get(log.email).login_count++;
        }
      }
      return [...map.values()].sort((a, b) => (b.last_login > a.last_login ? 1 : -1));
    },
  },
};

export { db, DATA_DIR, DOCS_DIR };
at: new Date().toISOString(),
  });
  save(_data);
}

const db = {
    users: {
          findByUsername(username) {
                  return _data.users.find((u) => u.username === username);
          },
    },

    config: {
          getAll() {
                  return { ..._data.config };
          },
          set(key, value) {
                  _data.config[key] = String(value);
                  save(_data);
          },
    },

    prompt_templates: {
          all() {
                  return [..._data.prompt_templates];
          },
          get(id) {
                  return _data.prompt_templates.find((p) => p.id === id);
          },
          create(name, content) {
                  const id = (_data.prompt_templates.reduce((m, p) => Math.max(m, p.id), 0)) + 1;
                  const now = new Date().toISOString();
                  _data.prompt_templates.push({ id, name, content, is_active: 0, created_at: now, updated_at: now });
                  save(_data);
                  return id;
          },
          update(id, data) {
                  const p = _data.prompt_templates.find((x) => x.id === id);
                  if (!p) return;
                  if (data.name !== undefined) p.name = data.name
