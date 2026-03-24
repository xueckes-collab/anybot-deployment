import { useState, useEffect } from 'react';
import { getDocuments, uploadDocument, deleteDocument } from '../api';

export default function Documents() {
  const [list, setList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const data = await getDocuments();
      setList(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      await uploadDocument(file);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('确定删除此文档？')) return;
    try {
      setError('');
      await deleteDocument(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-4">知识库文档管理</h1>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="mb-4">
        <label className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer">
          {uploading ? '上传中...' : '上传文档'}
          <input
            type="file"
            accept=".pdf,.txt,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.md,.csv,.json,.xml,.html,.htm,.rtf"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <p className="text-gray-600 text-xs mt-2">
          支持格式: PDF, TXT, DOCX, DOC, XLSX, XLS, PPTX, PPT, MD, CSV, JSON, XML, HTML, RTF (最大 50MB)
        </p>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-200 px-4 py-2 text-left">文件名</th>
            <th className="border border-gray-200 px-4 py-2 text-left">类型</th>
            <th className="border border-gray-200 px-4 py-2 text-left">状态</th>
            <th className="border border-gray-200 px-4 py-2 text-left">上传时间</th>
            <th className="border border-gray-200 px-4 py-2 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {list.map((d) => (
            <tr key={d.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{d.id}</td>
              <td className="border border-gray-200 px-4 py-2">{d.filename}</td>
              <td className="border border-gray-200 px-4 py-2">{d.file_type || '-'}</td>
              <td className="border border-gray-200 px-4 py-2">{d.status}</td>
              <td className="border border-gray-200 px-4 py-2">{d.created_at}</td>
              <td className="border border-gray-200 px-4 py-2">
                <button
                  onClick={() => handleDelete(d.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {list.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">暂无文档</p>
      )}
    </div>
  );
}
