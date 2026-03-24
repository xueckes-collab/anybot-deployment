# Anyway Flooring Chatbot - Render 部署指南

本项目已配置好适用于 [Render](https://render.com) 的一键部署配置文件 `render.yaml`。

## 部署步骤

1. **准备代码库**：
   - 将此目录下的所有文件推送至您的私有 GitHub 仓库。

2. **在 Render 中导入**：
   - 登录 Render 控制台，点击 **"New +"** -> **"Blueprint"**。
   - 连接您的 GitHub 仓库。
   - Render 会自动识别 `render.yaml` 并显示待创建的服务：`anybot-api` (后端) 和 `anybot-admin` (管理后台)。

3. **配置环境变量**：
   - 在部署过程中或部署后，请在 `anybot-api` 服务的 **Environment** 设置中配置以下必填项：
     - `OPENAI_API_KEY`: 您的 OpenAI API 密钥。
   - 在 `anybot-admin` 服务中配置：
     - `JWT_SECRET`: 随机字符串，用于管理后台登录认证。

4. **完成部署**：
   - 点击 **"Apply"**。Render 将自动构建并运行这两个服务。

## 服务访问地址

- **机器人后端 (API)**: `https://anybot-api.onrender.com` (已配置 `/health` 接口)
- **管理后台**: `https://anybot-admin.onrender.com` (默认账号: `admin` / `admin123`，已适配 Render 端口)

## 如何在官网接入机器人

在您官网的 `</body>` 标签前加入以下脚本：

```html
<script src="https://anybot-api.onrender.com/widget/chatbot-widget.js" 
        data-api-url="https://anybot-api.onrender.com" defer></script>
```

> **注意**：请将上述 URL 替换为您在 Render 上实际分配的域名。
