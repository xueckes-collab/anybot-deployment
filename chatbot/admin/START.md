# 管理后台启动说明

## 方式一：生产模式（推荐）

```bash
cd chatbot/admin/admin-backend
npm start
```

然后访问：**http://localhost:3001**

默认账号：`admin` / `admin123`

---

## 方式二：开发模式

```bash
# 终端 1：启动后端
cd chatbot/admin/admin-backend
npm run dev

# 终端 2：启动前端（热更新）
cd chatbot/admin/admin-frontend
npm run dev
```

访问：**http://localhost:3002**（前端会代理 API 到 3001）

---

## 常见问题

1. **打不开 / 空白页**
   - 确认访问的是 `http://localhost:3001`（不是 3002，除非你在用开发模式）
   - 确认后端已启动且无报错

2. **登录后报错**
   - 打开浏览器开发者工具 (F12) → Console，查看具体错误信息

3. **端口被占用**
   - 修改环境变量：`ADMIN_PORT=3005 npm start`

4. **前端未构建**
   - 先执行：`cd admin-frontend && npm run build`
