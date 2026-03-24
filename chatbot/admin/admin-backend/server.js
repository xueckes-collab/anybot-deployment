/**
 * 聊天机器人管理后台 - Express 服务
 */
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { authRouter } from './routes/auth.js';
import { configRouter } from './routes/config.js';
import { promptsRouter } from './routes/prompts.js';
import { quickRepliesRouter } from './routes/quickReplies.js';
import { conversationsRouter } from './routes/conversations.js';
import { documentsRouter, upload, uploadHandler } from './routes/documents.js';
import { authMiddleware } from './middleware/auth.js';
import { syncConfigToFile } from './utils/configSync.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.ADMIN_PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

// 初始化时同步配置到文件
try {
  syncConfigToFile();
} catch (e) {
  console.warn('Config sync warning:', e.message);
}

// 健康检查
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// API 路由
app.use('/api', authRouter);
app.use('/api/config', configRouter);
app.use('/api/prompts', promptsRouter);
app.use('/api/quick-replies', quickRepliesRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/documents', documentsRouter);
// POST /api/upload 上传知识库文件
app.post('/api/upload', authMiddleware, upload.single('file'), uploadHandler);

// 静态文件 - React 前端构建产物
const frontendDist = path.resolve(__dirname, '..', 'admin-frontend', 'dist');
const indexHtml = path.join(frontendDist, 'index.html');

if (fs.existsSync(indexHtml)) {
  // 先注册前端路由，再挂载静态资源（/assets 等）
  const serveIndex = (req, res) => res.sendFile(indexHtml);
  app.get('/', serveIndex);
  app.get('/login', serveIndex);
  app.get('/prompts', serveIndex);
  app.get('/config', serveIndex);
  app.get('/conversations', serveIndex);
  app.get('/documents', serveIndex);
  app.get('/quick-replies', serveIndex);
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/assets')) return next();
    res.sendFile(indexHtml);
  });
  app.use(express.static(frontendDist));
} else {
  app.get('/', (req, res) => {
    res.send(`
      <h1>管理后台</h1>
      <p>请先构建前端: <code>cd admin-frontend && npm run build</code></p>
      <p>当前路径: ${frontendDist}</p>
    `);
  });
}

app.listen(PORT, () => {
  console.log(`Admin backend: http://localhost:${PORT}`);
  if (!fs.existsSync(indexHtml)) {
    console.log('提示: 请执行 cd admin-frontend && npm run build');
  }
});
