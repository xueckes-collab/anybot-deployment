const API_BASE = '/api';

function getToken() {
    return localStorage.getItem('admin_token');
}

function headers(includeAuth = true) {
    const h = { 'Content-Type': 'application/json' };
    if (includeAuth && getToken()) {
          h['Authorization'] = `Bearer ${getToken()}`;
    }
    return h;
}

// ── 邮箱验证码登录 ──────────────────────────────────────
export async function sendCode(email) {
    const res = await fetch(`${API_BASE}/send-code`, {
          method: 'POST',
          headers: headers(false),
          body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data;
}

export async function verifyCode(email, code) {
    const res = await fetch(`${API_BASE}/verify-code`, {
          method: 'POST',
          headers: headers(false),
          body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    return data;
}

// ── 旧密码登录（保留兼容） ────────────────────────────────
export async function login(username, password) {
    const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: headers(false),
          body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '登录失败');
    return data;
}

export async function getConfig() {
    const res = await fetch(`${API_BASE}/config`, { headers: headers() });
    if (!res.ok) throw new Error('获取配置失败');
    return res.json();
}

export async function saveConfig(data) {
    const res = await fetch(`${API_BASE}/config`, {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('保存配置失败');
    return res.json();
}

export async function getPrompts() {
    const res = await fetch(`${API_BASE}/prompts`, { headers: headers() });
    if (!res.ok) throw new Error('获取 Prompt 失败');
    return res.json();
}

export async function createPrompt(name, content) {
    const res = await fetch(`${API_BASE}/prompts`, {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify({ name, content }),
    });
    if (!res.ok) throw new Error('创建失败');
    return res.json();
}

export async function updatePrompt(id, data) {
    const res = await fetch(`${API_BASE}/prompts/${id}`, {
          method: 'PUT',
          headers: headers(),
          body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('更新失败');
    return res.json();
}

export async function activatePrompt(id) {
    const res = await fetch(`${API_BASE}/prompts/${id}/activate`, {
          method: 'POST',
          headers: headers(),
    });
    if (!res.ok) throw new Error('切换失败');
    return res.json();
}

export async function deletePrompt(id) {
    const res = await fetch(`${API_BASE}/prompts/${id}`, {
          method: 'DELETE',
          headers: headers(),
    });
    if (!res.ok) throw new Error('删除失败');
    return res.json();
}

export async function getQuickReplies() {
    const res = await fetch(`${API_BASE}/quick-replies`, { headers: headers() });
    if (!res.ok) throw new Error('获取快捷回复失败');
    return res.json();
}

export async function createQuickReply(keyword, reply) {
    const res = await fetch(`${API_BASE}/quick-replies`, {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify({ keyword, reply }),
    });
    if (!res.ok) throw new Error('创建失败');
    return res.json();
}

export async function updateQuickReply(id, data) {
    const res = await fetch(`${API_BASE}/quick-replies/${id}`, {
          method: 'PUT',
          headers: headers(),
          body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('更新失败');
    return res.json();
}

export async function deleteQuickReply(id) {
    const res = await fetch(`${API_BASE}/quick-replies/${id}`, {
          method: 'DELETE',
          headers: headers(),
    });
    if (!res.ok) throw new Error('删除失败');
    return res.json();
}

export async function getConversations(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/conversations${qs ? '?' + qs : ''}`, { headers: headers() });
    if (!res.ok) throw new Error('获取对话记录失败');
    return res.json();
}

export async function getConversation(id) {
    const res = await fetch(`${API_BASE}/conversations/${id}`, { headers: headers() });
    if (!res.ok) throw new Error('获取对话详情失败');
    return res.json();
}

export async function getDocuments() {
    const res = await fetch(`${API_BASE}/documents`, { headers: headers() });
    if (!res.ok) throw new Error('获取文档列表失败');
    return res.json();
}

export async function uploadDocument(file) {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${getToken()}` },
          body: form,
    });
    if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || '上传失败');
    }
    return res.json();
}

export async function deleteDocument(id) {
    const res = await fetch(`${API_BASE}/documents/${id}`, {
          method: 'DELETE',
          headers: headers(),
    });
    if (!res.ok) throw new Error('删除失败');
    return res.json();
}


// ——— 用户管理 API ———

export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`, { headers: headers() });
  if (!res.ok) throw new Error('获取用户列表失败');
  return res.json();
}

export async function getUserLogs() {
  const res = await fetch(`${API_BASE}/users/logs`, { headers: headers() });
  if (!res.ok) throw new Error('获取登录记录失败');
  return res.json();
}

export async function banUser(email) {
  const res = await fetch(`${API_BASE}/users/ban`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('封禁用户失败');
  return res.json();
}

export async function unbanUser(email) {
  const res = await fetch(`${API_BASE}/users/unban`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('解封用户失败');
  return res.json();
}

export async function deleteUser(email) {
  const res = await fetch(`${API_BASE}/users/${encodeURIComponent(email)}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) throw new Error('注销用户失败');
  return res.json();
}
