# 聊天机器人管理后台

## 技术栈

- **前端**: React 18 + Vite + Tailwind CSS
- **后端**: Node.js + Express
- **存储**: SQLite (better-sqlite3)
- **认证**: JWT

## 快速开始

### 1. 安装依赖

```bash
# 后端
cd admin-backend && npm install

# 前端
cd admin-frontend && npm install
```

### 2. 启动服务

```bash
# 终端 1: 启动后端 (端口 3001)
cd admin-backend && npm run dev

# 终端 2: 启动前端开发服务器 (端口 3002，代理 API 到 3001)
cd admin-frontend && npm run dev
```

### 3. 访问

- 开发: http://localhost:3002
- 默认账号: `admin` / `admin123`

### 4. 生产构建

```bash
cd admin-frontend && npm run build
# 构建产物在 admin-frontend/dist，由 admin-backend 静态托管
cd admin-backend && npm start
# 访问 http://localhost:3001
```

## 功能模块

1. **System Prompt 管理** - 多套模板、一键切换、显示当前生效版本和修改时间
2. **模型参数配置** - Temperature、Max Tokens、模型选择，保存后立即生效
3. **对话记录** - 列表、详情、按日期筛选
4. **知识库文档** - 上传 PDF/TXT、列表、删除
5. **快捷回复** - 关键词→固定回复、启用/禁用

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/login | 登录 |
| GET | /api/config | 获取配置 |
| POST | /api/config | 保存配置 |
| GET | /api/prompts | 获取 Prompt 列表 |
| POST | /api/prompts | 新建 Prompt |
| PUT | /api/prompts/:id | 更新 Prompt |
| POST | /api/prompts/:id/activate | 切换生效模板 |
| DELETE | /api/prompts/:id | 删除模板 |
| GET | /api/quick-replies | 快捷回复列表 |
| POST | /api/quick-replies | 新建规则 |
| PUT | /api/quick-replies/:id | 更新规则 |
| DELETE | /api/quick-replies/:id | 删除规则 |
| GET | /api/conversations | 对话列表 |
| GET | /api/conversations/:id | 对话详情 |
| GET | /api/documents | 文档列表 |
| POST | /api/upload | 上传文档 |
| DELETE | /api/documents/:id | 删除文档 |

## 与 Python 后端联动

- 配置保存后写入 `admin-data/config.json`，Python 每次请求时读取
- 对话记录由 Python 写入 `admin-data/db.sqlite`
- 快捷回复、System Prompt、模型参数均实时生效，无需重启 Python 服务
