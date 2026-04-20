# 启用用户注册 + 管理后台（5 分钟上手）

这份文档只讲**本次新增功能**的上线步骤：让访客必须填姓名 / 电话 / 邮箱才能使用聊天机器人，并通过管理后台查看所有注册用户。

一共三步：建 Supabase 项目 → 配 Render 环境变量 → push 代码。

---

## 前提

- 你已经有一个 Render 账号，`anybot-api` 服务跑得起来
- 你能访问仓库 `xueckes-collab/anybot-deployment` 并能 push

---

## Step 1 · 建 Supabase 项目（约 2 分钟）

1. 打开 [supabase.com](https://supabase.com) 注册/登录，免费档就够用。
2. 点 **New project**：
   - Name 随便取（比如 `anybot`）
   - Database Password 随便生成一个存好（后面不用，但丢了要重置）
   - Region 选离你用户最近的
3. 项目建好后等 1–2 分钟初始化完成。

### 1.1 跑建表 SQL

左侧菜单 → **SQL Editor** → **New query**，把 `chatbot/backend/supabase_schema.sql` 的内容**整段粘进去** → 点 **Run**。

看到 "Success. No rows returned" 就算成功。这一步会创建 `profiles` 表并配好 RLS。

### 1.2 打开邮箱验证

左侧菜单 → **Authentication** → **Providers** → **Email**：

- 确保 **Enable Email provider** 是 ON
- 把 **Confirm email** 打开（默认就是开的）

左侧菜单 → **Authentication** → **URL Configuration**：

- **Site URL** 填你的 Render 线上域名，例如 `https://anybot-api.onrender.com`
- 底下的 **Redirect URLs** 也把这个域名加进去

这样用户收到的验证邮件里的链接，点开会回到你的站点。

### 1.3 拿两个 Key

左侧菜单 → **Project Settings** → **API**，把这两个值复制出来备用：

- **Project URL** —— 形如 `https://xxxx.supabase.co`
- **service_role secret** —— 点 "Reveal" 才能看到。这是**超级密钥**，只能放在后端，绝对不要写进前端 / 仓库。

---

## Step 2 · 配 Render 环境变量（约 1 分钟）

去 Render Dashboard → 选 `anybot-api` 服务 → **Environment** 标签页 → 加这三个变量：

| Key | Value |
|---|---|
| `SUPABASE_URL` | Step 1.3 拿到的 Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Step 1.3 拿到的 service_role secret |
| `ADMIN_EMAILS` | 你想作为管理员登录的邮箱（多个用逗号分隔，例如 `you@example.com`） |

点 **Save changes**。Render 会自动重新部署服务。

> **另外**：`render.yaml` 里原来那个 `anybot-admin`（Node 版管理后台）这次已经删掉了。如果你之前在 Render 上手动建过这个服务，去 Dashboard 把它 Suspend 或 Delete 就好，不影响主服务。

---

## Step 3 · Push 代码

把本次改动 push 到 GitHub 主分支。Render 监听到后会自动部署新版本（包含 widget、鉴权、删除功能）。

```bash
git push origin main
```

---

## 验证上线成功

### 3.1 访客注册 → 聊天流程

1. 打开任意嵌入了 widget 的页面（或 `https://<你的域名>/test` 如果测试页还在）
2. 点右下角气泡 → 看到**带 Log in / Sign up 两个 Tab 的登录框**
3. 切到 **Sign up**，填姓名 + 邮箱（用一个你能收信的真实邮箱）+ 电话 + 密码 + 勾选同意
4. 提交 → 提示 "Account created. Please check your email..."
5. 去收件箱，点验证链接
6. 回到 widget，切回 **Log in** Tab，用刚才的邮箱密码登录 → 进入聊天，开始问问题

### 3.2 管理后台

1. 浏览器打开 `https://<你的域名>/login`
2. 用 `ADMIN_EMAILS` 里的邮箱登录（你也需要先在 Sign up 流程里注册这个邮箱并完成验证）
3. 跳到 `/admin` 看到用户列表
4. 能看到刚才注册的访客、能搜索、能点"删除"

---

## 故障排查

**点注册 → 提示 "Supabase is not configured"**
→ `SUPABASE_URL` 或 `SUPABASE_SERVICE_ROLE_KEY` 没配，或 Render 还没重新部署。

**点注册 → 提示 "duplicate key value..."**
→ 这个邮箱已经注册过，去 Log in 而不是 Sign up。

**注册成功但收不到邮件**
→ Supabase 免费档的内建邮件服务**每小时限 30 封、每个邮箱限 4 封**，且发件地址是 `noreply@mail.app.supabase.io`，容易进垃圾箱。先翻一下垃圾邮件。正式投产请在 Supabase 后台 Auth → SMTP Settings 配你自己的 SMTP 或第三方邮件服务。

**登录成功但开始聊天提示 "session has expired"**
→ Supabase access token 默认 1 小时过期。Widget 会自动弹回登录框，再登一次即可。后续版本可以加 refresh token 自动续期，这版先不做。

**`/admin` 登录后提示 "该账号无管理员权限"**
→ 你登录用的邮箱不在 `ADMIN_EMAILS` 里。把邮箱加进去，保存，等 Render 重新部署。注意大小写不敏感，但不能有多余空格（逗号分隔）。

**删除用户失败**
→ 看 Render 日志。最常见原因：service_role key 配错了，或粘贴时多了换行。

---

## 改了哪些代码

- `chatbot/widget/chatbot-widget.js` + `chatbot-widget.css`：登录框从单邮箱字段改成 Tab 式注册/登录表单；chat 请求带 `Authorization: Bearer <token>`；401 自动退出
- `chatbot/backend/utils/auth_dep.py`：新文件，FastAPI 依赖项校验 Supabase token
- `chatbot/backend/routers/chat.py`：`/api/chat` 与 `/api/chat/stream` 强制鉴权，会话按 `user_id` 隔离
- `chatbot/backend/routers/admin.py`：新增 `DELETE /api/admin/users/{id}`（同步删 profiles 和 auth.users）
- `chatbot/backend/templates/admin.html`：表格多一列"删除"按钮，带二次确认
- `chatbot/backend/supabase_schema.sql`：Supabase 一键建表 SQL（含 RLS）
- `render.yaml`：加 Supabase / Admin 环境变量，删掉已作废的 Node `anybot-admin` 服务
