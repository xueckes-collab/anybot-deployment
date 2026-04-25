# Widget 登录界面 (轻量版)

为根目录 `chatbot-widget.html` 增加访客登录:**姓名 / 邮箱 / 电话三字段必填、前后端双重校验、记录到管理后台**。

> 这是「轻量准入门槛」方案,适合留资记录场景,不依赖 Supabase 邮箱验证。
> 如需邮箱真实性验证,请使用仓库里另一套 Supabase 完整方案
> ( `SETUP_AUTH.md` + `chatbot/widget/` )。

---

## 用户体验

1. 访客点开 widget → 看到登录表单
2. 输入姓名 / 邮箱 / 电话 → 实时校验
3. 通过校验后:
   - 信息存入 `sessionStorage`,刷新页面不重新填
   - 进入聊天界面,正常对话
4. 标题栏右上角"退出"按钮 → 清空登录态,可换人重新登录

## 校验规则 (前后端一致)

| 字段 | 规则 |
|---|---|
| 姓名 | 2~30 字符,中英文 + 空格 + `.` `-` `·` `'`,首字符必须字母或汉字 |
| 邮箱 | 标准 RFC 简化格式 (`xxx@yyy.zz`) |
| 电话 | ① 中国大陆 11 位手机号 (1[3-9] 开头),或 ② 以 `+` 开头的国际格式,整体 8~16 位数字,可含空格 / 短横线 |

服务端会再做一次同样的校验,前端被绕过时返回 400。

---

## 数据流

```
浏览器                    后端 (FastAPI)               存储
──────                    ──────────────              ──────
登录表单 ── user{name,email,phone} ─▶ /api/chat/stream
                                       │
                                       ├─ validate_user_info()  ⇒ 400 if 不合法
                                       │
                                       ├─ session_manager.set_user_info()
                                       │
                                       ├─ upsert_lead() (异步,失败静默)
                                       │                                ▼
                                       │                       Supabase profiles
                                       │                       (若环境变量已配)
                                       │
                                       └─ session_manager.add_message()
                                                                        ▼
                                                              admin/admin-data/
                                                              conversations.json
                                                              (记录访客 + 消息)
```

每条会话在 `conversations.json` 里同时保存 `name / email / phone`,`/admin` 后台用现有的"按姓名 / 邮箱 / 电话过滤"搜索框就能直接找到访客对应的对话。

---

## 改动文件

### 前端

| 文件 | 改动 |
|---|---|
| `chatbot-widget.html` | 重写:增加登录界面、表单校验、`sessionStorage` 存登录态、聊天请求体里带 `user` 字段 |

### 后端 (FastAPI)

| 文件 | 改动 |
|---|---|
| `chatbot/backend/routers/chat.py` | `ChatRequest` 增加 `user` 字段;请求时调 `_validate_and_record_user()` |
| `chatbot/backend/services/session_manager.py` | 增加 `set_user_info()` / `get_user_info()`;`add_message` 把 user 一起传给 admin_persist |
| `chatbot/backend/utils/admin_persist.py` | `persist_conversation` 增加 `user` 参数,合并到会话记录 |
| `chatbot/backend/utils/lead_persist.py` | **新文件**:服务端验证 + 上抛到 Supabase `profiles` 表(可选) |

---

## 部署

1. **必须**: 把上面 5 个文件 push 到 main,Render 会自动重部署。
2. **可选** (用 Supabase 持久化访客信息): 确保 `SUPABASE_URL` 和 `SUPABASE_SERVICE_ROLE_KEY` 两个环境变量已配 (跟 SETUP_AUTH.md 是同一个 Supabase),并且 `profiles` 表存在。
   - 如果 profiles 表还没建,在 Supabase SQL Editor 跑:
     ```sql
     create table if not exists public.profiles (
       id uuid primary key default gen_random_uuid(),
       name text,
       email text unique,
       phone text,
       source text,
       created_at timestamptz default now(),
       updated_at timestamptz default now()
     );
     ```
   - 如果环境变量没配,widget 仍能正常用,只是访客名册不会同步到 Supabase,只在 `conversations.json` 里。

```bash
git add chatbot-widget.html WIDGET_LOGIN.md \
        chatbot/backend/routers/chat.py \
        chatbot/backend/services/session_manager.py \
        chatbot/backend/utils/admin_persist.py \
        chatbot/backend/utils/lead_persist.py
git commit -m "feat: 给 widget 加登录界面(姓名/邮箱/电话+前后端校验+留资)"
git push origin main
```

---

## 测试

仓库 `tests/` 目录下有 14 条 E2E 测试,覆盖前端 + 后端 + 整链路:

```bash
# 一次性安装测试依赖
pip install pytest playwright
playwright install chromium

# 跑全部测试 (~3 秒)
python3 -m pytest tests/ -v
```

包含三个文件:
- `tests/test_chat_e2e.py` (6 条):FastAPI TestClient 跑 `/api/chat` 与 `/api/chat/stream`,覆盖合法/非法 `user`、向后兼容、SSE 流、会话延续
- `tests/test_widget_e2e.py` (7 条):Playwright + 路由拦截,覆盖登录界面渲染、字段校验、submit、`sessionStorage`、退出、已登录跳过
- `tests/test_full_integration.py` (1 条):真后端 + 真 Chromium,从填表到 `conversations.json` 的全链路验证

测试用 `conftest.py` 统一 stub 掉 OpenAI/Chroma,无需任何外部依赖即可跑。

> ⚠️ **测试中发现并修复了一个 pre-existing bug**:原 widget 的 SSE 解析器把每行 `data:` 内容当 JSON 整体解析(`JSON.parse(line.slice(6))`),并期望里面有 `event` 字段。但后端用 sse_starlette 输出的是标准 SSE(`event: meta\ndata: {...}\n\n`),所以 token 永远进不来,助手消息永远不会显示。已改为标准 SSE 解析(buffer + `\n\n` 切分 + 区分 `event:` / `data:` 字段)。

## 已知限制

- 这版**没有真实性验证** (没有发邮箱验证码 / 短信 OTP),恶意用户可以填假信息绕过。如果需要真实性,用 `SETUP_AUTH.md` 那套完整 Supabase 方案。
- `sessionStorage` 关闭浏览器就清空(不是 `localStorage`),这是有意为之,避免共享设备的访客串信息。
- 服务端校验放在 `chat` 接口里;如果将来想加独立的 `/api/widget/lead` 接口接受表单提交,直接复用 `validate_user_info()` 和 `upsert_lead()` 就好。
