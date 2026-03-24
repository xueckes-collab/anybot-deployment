# 聊天机器人管理后台 - 项目结构

```
chatbot/
├── admin/
│   ├── admin-frontend/          # React + Tailwind 前端
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   ├── package.json
│   │   └── vite.config.js
│   │
│   ├── admin-backend/            # Node.js + Express 后端
│   │   ├── server.js
│   │   ├── db.js
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── package.json
│   │
│   └── admin-data/               # 运行时数据（自动创建）
│       ├── db.sqlite
│       └── documents/
│
└── backend/                      # 现有 Python FastAPI
```

## 功能模块

1. **System Prompt 管理** - 多套模板、一键切换
2. **模型参数配置** - Temperature、Max Tokens、模型选择
3. **对话记录** - 列表、详情、日期筛选
4. **知识库文档** - 上传 PDF/TXT、列表、删除
5. **快捷回复** - 关键词→固定回复规则、启用/禁用

## 技术栈

- 前端: React 18 + Vite + Tailwind CSS
- 后端: Node.js + Express
- 存储: SQLite (better-sqlite3)
- 认证: JWT
