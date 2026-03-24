import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { db, DOCS_DIR } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
router.use(authMiddleware);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, DOCS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.txt';
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${base}_${Date.now()}${ext}`);
  },
});

// 支持的文件格式
const ALLOWED_EXTENSIONS = [
  '.pdf',      // PDF
  '.txt',      // 纯文本
  '.docx',     // Word 2007+
  '.doc',      // 旧版 Word
  '.xlsx',     // Excel 2007+
  '.xls',      // 旧版 Excel
  '.pptx',     // PowerPoint 2007+
  '.ppt',      // 旧版 PowerPoint
  '.md',       // Markdown
  '.csv',      // CSV
  '.json',     // JSON
  '.xml',      // XML
  '.html',     // HTML
  '.htm',      // HTML
  '.rtf',      // Rich Text Format
];

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.includes(ext)) cb(null, true);
    else cb(new Error(`不支持的文件格式。支持的格式: ${ALLOWED_EXTENSIONS.join(', ')}`));
  },
});

const uploadHandler = (req, res) => {
  if (!req.file) return res.status(400).json({ error: '未选择文件' });
  const ext = path.extname(req.file.originalname).toLowerCase();
  const id = db.documents.create(req.file.originalname, req.file.filename, ext);
  res.json({ id, filename: req.file.originalname, success: true });
};

router.get('/', (req, res) => {
  res.json(db.documents.all().map((d) => ({ id: d.id, filename: d.filename, file_type: d.file_type, status: d.status, created_at: d.created_at })));
});

router.post('/upload', upload.single('file'), uploadHandler);

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const doc = db.documents.get(id);
  if (!doc) return res.status(404).json({ error: '文档不存在' });
  const filePath = path.join(DOCS_DIR, doc.filepath);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  db.documents.delete(id);
  res.json({ success: true });
});

export { router as documentsRouter, upload, uploadHandler };
