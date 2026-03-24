import { useState, useEffect } from 'react';
import { getConversations, getConversation } from '../api';

export default function Conversations() {
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const load = async () => {
    try {
      const params = {};
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;
      const data = await getConversations(params);
      setList(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, [dateFrom, dateTo]);

  const viewDetail = async (id) => {
    try {
      const data = await getConversation(id);
      setDetail(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-4">对话记录</h1>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-600 mr-2">开始日期</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mr-2">结束日期</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Session ID</th>
                <th className="border border-gray-200 px-4 py-2 text-left">创建时间</th>
                <th className="border border-gray-200 px-4 py-2 text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{c.id}</td>
                  <td className="border border-gray-200 px-4 py-2 font-mono text-sm truncate max-w-[200px]">
                    {c.session_id}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{c.created_at}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => viewDetail(c.id)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      查看
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && (
            <p className="text-gray-500 text-sm mt-2">暂无对话记录</p>
          )}
        </div>

        {detail && (
          <div className="w-96 border border-gray-200 rounded p-4 bg-gray-50 max-h-[500px] overflow-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">对话详情</h3>
              <button
                onClick={() => setDetail(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              {detail.messages?.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded ${
                    m.role === 'user' ? 'bg-blue-100 ml-4' : 'bg-gray-200 mr-4'
                  }`}
                >
                  <span className="text-xs text-gray-500">{m.role}</span>
                  <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
