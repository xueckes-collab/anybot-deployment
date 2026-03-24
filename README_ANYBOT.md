# 🤖 AnyBot - AI 聊天机器人系统

## 📦 项目概述

**AnyBot** 是一个完整的、生产级的 AI 聊天机器人系统，包括：

- ✅ **聊天机器人后端** - FastAPI + OpenAI + 知识库
- ✅ **管理后台** - Node.js + React 管理界面
- ✅ **可嵌入 Widget** - 可直接插入任何网站
- ✅ **官网** - HTML + CSS + JavaScript

---

## 🚀 快速开始

### 第一步：配置 API 密钥

```bash
# 复制环境配置
cp .env.example .env

# 编辑 .env，填入你的 OpenAI API 密钥
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
```

### 第二步：启动后端

```bash
cd chatbot/backend
pip install -r requirements.txt
python main.py
```

### 第三步：启动管理后台

```bash
cd chatbot/admin/admin-backend
npm install
npm start

# 前端（新终端）
cd chatbot/admin/admin-frontend
npm install
npm run dev
```

### 第四步：集成到网站

复制 `chatbot-widget.html` 中的代码到你的网站。

---

## 📁 项目结构

```
anybot/
├── 📄 文档
│   ├── 系统完成总结.md          ← 总体总结
│   ├── 快速集成指南.md          ← 3 步集成
│   ├── Widget使用说明.md        ← Widget 说明
│   ├── DEPLOYMENT.md            ← 部署指南
│   ├── 打包清单.md              ← 打包说明
│   ├── 最终文件清单.md          ← 文件清单
│   ├── 快速参考卡.md            ← 快速参考
│   └── .env.example             ← 环境配置模板
│
├── 🤖 Widget
│   └── chatbot-widget.html      ← 可嵌入的 Widget
│
├── 💬 聊天机器人
│   └── chatbot/
│       ├── backend/             ← FastAPI 后端
│       └── admin/               ← 管理后台
│
├── 🌐 官网
│   ├── html/
│   ├── style/
│   ├── img/
│   └── script/
│
└── ⚙️ 配置
    ├── 启动后台.bat
    ├── 启动网站.bat
    └── 其他配置文件
```

---

## 📖 文档指南

### 快速开始（推荐）
1. **快速参考卡.md** - 5 分钟快速了解
2. **快速集成指南.md** - 10 分钟快速集成

### 详细说明
3. **系统完成总结.md** - 20 分钟深入了解
4. **Widget使用说明.md** - 15 分钟了解 Widget
5. **DEPLOYMENT.md** - 30 分钟了解部署

### 其他
6. **打包清单.md** - 打包说明
7. **最终文件清单.md** - 文件清单

---

## 🎯 核心功能

### 聊天机器人
- 实时 AI 对话
- 流式响应（逐字显示）
- 知识库集成
- 会话管理
- 对话记录保存

### 管理后台
- 知识库文档管理
- System Prompt 配置
- 对话记录查看
- 用户管理
- 数据统计

### 网站集成
- 可嵌入的 Widget
- 响应式设计
- 支持所有浏览器
- 支持手机/平板/桌面

---

## 🔧 系统要求

- **Python** 3.8+
- **Node.js** 16+
- **npm** 8+
- **内存** 2GB+
- **磁盘** 5GB+

---

## 📱 访问地址

| 服务 | 地址 |
|------|------|
| 后端 API | http://localhost:8000 |
| 管理后台 | http://localhost:3001 |
| 官网 | http://localhost:3000 |

---

## 🔐 默认账号

| 项目 | 用户名 | 密码 |
|------|--------|------|
| 管理后台 | admin | admin123 |

⚠️ **上线前必须修改！**

---

## 🚀 部署到生产环境

### 1. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，填入实际的配置
```

### 2. 安装依赖

```bash
# 后端
cd chatbot/backend
pip install -r requirements.txt

# 管理后台
cd chatbot/admin/admin-backend
npm install

cd chatbot/admin/admin-frontend
npm install
```

### 3. 构建前端

```bash
cd chatbot/admin/admin-frontend
npm run build
```

### 4. 启动服务

```bash
# 后端
gunicorn -w 4 -b 0.0.0.0:8000 chatbot.backend.main:app

# 管理后台
cd chatbot/admin/admin-backend
npm start
```

### 5. 配置 Nginx

参考 `DEPLOYMENT.md` 中的 Nginx 配置。

---

## 🆘 常见问题

### Q: Widget 不显示？
**A:** 检查 API 地址是否正确，后端是否运行。

### Q: 无法发送消息？
**A:** 查看浏览器控制台（F12）的错误信息。

### Q: 后端无法启动？
**A:** 检查 Python 版本和依赖是否正确安装。

### Q: 管理后台无法访问？
**A:** 检查 Node.js 是否安装，端口是否被占用。

---

## 📞 技术支持

### 查看日志
- 后端：后端窗口输出
- 前端：浏览器控制台（F12）

### 测试连接
```bash
curl http://localhost:8000/api/health
```

### 查看文档
- `系统完成总结.md` - 总体概览
- `DEPLOYMENT.md` - 部署指南
- `Widget使用说明.md` - Widget 说明

---

## 📦 打包和交付

### 打包前清理

```bash
# 删除缓存
rm -rf node_modules __pycache__ .git
rm .env
```

### 打包

```bash
# Linux/Mac
tar -czf anybot.tar.gz anybot/

# Windows
# 右键 → 发送到 → 压缩文件夹
```

### 交付清单

- [x] 所有源代码
- [x] 知识库数据
- [x] 配置数据
- [x] 文档说明
- [x] 环境配置模板
- [x] Widget 代码

---

## ✨ 系统亮点

✅ **完整** - 包含后端、管理后台、Widget
✅ **易用** - 3 步集成到网站
✅ **强大** - 支持知识库、流式响应、会话管理
✅ **安全** - HTTPS、CORS、密钥管理
✅ **可扩展** - 支持自定义、集成第三方服务
✅ **生产级** - 经过测试，可直接上线
✅ **文档完善** - 详细的部署和使用说明

---

## 🎉 准备好了！

### 现在你可以：

1. ✅ 在网站上集成聊天机器人
2. ✅ 用户可以与 AI 对话
3. ✅ 管理知识库和配置
4. ✅ 查看对话记录
5. ✅ 监控系统性能

### 立即开始：

1. 配置 API 密钥
2. 启动系统
3. 集成到网站
4. 上线使用

---

## 📄 许可证

MIT License

---

## 👨‍💻 作者

ANYWAY FLOOR

---

**祝你使用愉快！** 🚀

有任何问题，参考相关文档或查看浏览器控制台的错误信息。
