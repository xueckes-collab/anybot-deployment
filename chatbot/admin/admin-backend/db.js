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
      d.login_logs = d.login_logs || [];
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
          content: `You are an intelligent product consultant for Anyway Flooring, a professional flooring and wall panel company.

          Rules:
          - Answer based ONLY on the product knowledge provided below. Do not fabricate specs or claims.
          - If the knowledge base doesn't have the answer, say so honestly and suggest contacting the sales team.
          - Be professional yet friendly. Use tables for parameter comparisons when helpful.
          - When recommending products, explain your reasoning.
          - You can respond in the same language the customer uses (English, Chinese, etc.).

          【Product Knowledge】
          {context}`,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
    }];
    save(_data);
}

export const config = {
    getAll() { return _data.config; },
    set(key, value) {
          _data.config[key] = String(value);
          save(_data);
    },
};

export const prompt_templates = {
    all() { return _data.prompt_templates; },
    get(id) { return _data.prompt_templates.find(p => p.id === id); },
    create(name, content) {
          const id = (_data.prompt_templates.reduce((m, p) => Math.max(m, p.id), 0)) + 1;
          const now = new Date().toISOString();
          _data.prompt_templates.push({ id, name, content, is_active: false, created_at: now, updated_at: now });
          save(_data);
          return _data.prompt_templates.find(p => p.id === id);
    },
    update(id, data) {
          const p = _data.prompt_templates.find(p => p.id === id);
          if (!p) return null;
          if (data.name !== undefined) p.name = data.name;
          if (data.content !== undefined) p.content = data.content;
          p.updated_at = new Date().toISOString();
          save(_data);
          return p;
    },
    setActive(id) {
          _data.prompt_templates.forEach(p => { p.is_active = p.id === id; });
          _data.config.system_prompt_id = String(id);
          save(_data);
    },
    delete(id) {
          _data.prompt_templates = _data.prompt_templates.filter(p => p.id !== id);
          save(_data);
    },
};

export const quick_replies = {
    all() { return _data.quick_replies; },
    create(keyword, reply) {
          const id = (_data.quick_replies.reduce((m, r) => Math.max(m, r.id), 0)) + 1;
          _data.quick_replies.push({ id, keyword: keyword.trim(), reply, enabled: true, created_at: new Date().toISOString() });
          save(_data);
          return _data.quick_replies.find(r => r.id === id);
    },
    update(id, data) {
          const r = _data.quick_replies.find(r => r.id === id);
          if (!r) return null;
          if (data.keyword !== undefined) r.keyword = data.keyword.trim();
          if (data.reply !== undefined) r.reply = data.reply;
          if (data.enabled !== undefined) r.enabled = data.enabled;
          save(_data);
          return r;
    },
    delete(id) {
          _data.quick_replies = _data.quick_replies.filter(r => r.id !== id);
          save(_data);
    },
};

export const documents = {
    all() { return _data.documents; },
    create(filename, filepath, file_type) {
          const id = (_data.documents.reduce((m, d) => Math.max(m, d.id), 0)) + 1;
          _data.documents.push({ id, filename, filepath, file_type, status: 'pending', created_at: new Date().toISOString() });
          save(_data);
          return _data.documents.find(d => d.id === id);
    },
    get(id) { return _data.documents.find(d => d.id === id); },
    delete(id) {
          _data.documents = _data.documents.filter(d => d.id !== id);
          save(_data);
    },
};

export const conversations = {
    all(filters = {}) {
          let list = _data.conversations;
          if (filters.date_from) list = list.filter(c => c.created_at >= filters.date_from);
          if (filters.date_to) list = list.filter(c => c.created_at <= filters.date_to + ' 23:59:59');
          return list.sort((a, b) => b.created_at > a.created_at ? 1 : -1).slice(0, 500);
    },
    get(id) {
          const c = _data.conversations.find(c => c.id === id);
          if (!c) return null;
          const messages = _data.messages.filter(m => m.conversation_id === id).sort((a, b) => a.created_at > b.created_at ? 1 : -1);
          return { ...c, messages };
    },
    getOrCreate(session_id) {
          let c = _data.conversations.find(c => c.session_id === session_id);
          if (!c) {
                  const id = (_data.conversations.reduce((m, c) => Math.max(m, c.id), 0)) + 1;
                  c = { id, session_id, created_at: new Date().toISOString() };
                  _data.conversations.push(c);
                  save(_data);
          }
          return c;
    },
    addMessage(convId, role, content) {
          const id = (_data.messages.reduce((m, msg) => Math.max(m, msg.id), 0)) + 1;
          _data.messages.push({ id, conversation_id: convId, role, content, created_at: new Date().toISOString() });
          save(_data);
    },
};

export const login_logs = {
    // 记录一次登录（不重置已封禁用户的状态）
    add(email, ip) {
          _data.login_logs = _data.login_logs || [];
          const id = (_data.login_logs.reduce((m, l) => Math.max(m, l.id), 0)) + 1;
          _data.login_logs.push({ id, email, ip: ip || '', login_at: new Date().toISOString() });
          save(_data);
    },

    // 返回所有登录记录，按时间倒序
    all() {
          return (_data.login_logs || []).sort((a, b) => b.login_at > a.login_at ? 1 : -1);
    },

    // 返回去重后的用户列表（每个邮箱只保留最新登录时间 + 状态）
    uniqueUsers() {
          _data.login_logs = _data.login_logs || [];
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
              if (map.has(log.email)) map.get(log.email).login_count++;
      }
          // 合并封禁状态（从 user_status 表）
      const statusMap = _data.user_status || {};
          return [...map.values()]
            .map(u => ({ ...u, status: statusMap[u.email] || 'active' }))
            .sort((a, b) => b.last_login > a.last_login ? 1 : -1);
    },

    // 封禁用户
    ban(email) {
          _data.user_status = _data.user_status || {};
          _data.user_status[email] = 'banned';
          save(_data);
    },

    // 解封用户
    unban(email) {
          _data.user_status = _data.user_status || {};
          _data.user_status[email] = 'active';
          save(_data);
    },

    // 删除用户的所有登录记录及状态（允许重新注册）
    deleteUser(email) {
          _data.login_logs = (_data.login_logs || []).filter(l => l.email !== email);
          if (_data.user_status) delete _data.user_status[email];
          save(_data);
    },

    // 检查用户是否被封禁
    isBanned(email) {
          return (_data.user_status || {})[email] === 'banned';
    },
};

// 导出 db 对象（向后兼容）
export const db = { config, prompt_templates, quick_replies, documents, conversations, login_logs };

export { DATA_DIR, DOCS_DIR };
