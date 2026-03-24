import { useState, useEffect } from 'react';
import {
  getQuickReplies,
  createQuickReply,
  updateQuickReply,
  deleteQuickReply,
} from '../api';

export default function QuickReplies() {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [reply, setReply] = useState('');
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const data = await getQuickReplies();
      setList(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    if (!keyword.trim()) return;
    try {
      setError('');
      await createQuickReply(keyword.trim(), reply);
      setKeyword('');
      setReply('');
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleToggle = async (item) => {
    try {
      setError('');
      await updateQuickReply(item.id, { enabled: !item.enabled });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('确定删除此规则？')) return;
    try {
      setError('');
      await deleteQuickReply(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-4">快捷回复管理</h1>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <p className="text-sm text-gray-500 mb-4">
        当用户消息包含关键词时，优先返回预设内容
      </p>

      <div className="mb-6 flex gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-600 mb-1">触发关键词</label>
          <input
            type="text"
            placeholder="如: 价格"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-48"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">固定回复</label>
          <input
            type="text"
            placeholder="如: 请联系销售获取报价"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-64"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          添加
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">关键词</th>
            <th className="border border-gray-200 px-4 py-2 text-left">回复内容</th>
            <th className="border border-gray-200 px-4 py-2 text-left">状态</th>
            <th className="border border-gray-200 px-4 py-2 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{r.keyword}</td>
              <td className="border border-gray-200 px-4 py-2">{r.reply}</td>
              <td className="border border-gray-200 px-4 py-2">
                <button
                  onClick={() => handleToggle(r)}
                  className={`text-sm px-2 py-0.5 rounded ${
                    r.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {r.enabled ? '开启' : '关闭'}
                </button>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <button
                  onClick={() => handleDelete(r.id)}
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
        <p className="text-gray-500 text-sm mt-2">暂无规则</p>
      )}
    </div>
  );
}
