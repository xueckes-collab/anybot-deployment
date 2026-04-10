import { useState, useEffect } from 'react';
import { getUsers, getUserLogs, banUser, unbanUser, deleteUser } from '../api.js';

export default function Users() {
  const [tab, setTab] = useState('users'); // 'users' | 'logs'
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (e) {
      setMsg('获取用户列表失败: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await getUserLogs();
      setLogs(data);
    } catch (e) {
      setMsg('获取登录记录失败: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 'users') fetchUsers();
    else fetchLogs();
  }, [tab]);

  const handleBan = async (email) => {
    if (!confirm(`确认封禁 ${email}？封禁后该用户无法继续登录。`)) return;
    try {
      await banUser(email);
      setMsg(`已封禁 ${email}`);
      fetchUsers();
    } catch (e) {
      setMsg('封禁失败: ' + e.message);
    }
  };

  const handleUnban = async (email) => {
    if (!confirm(`确认解封 ${email}？`)) return;
    try {
      await unbanUser(email);
      setMsg(`已解封 ${email}`);
      fetchUsers();
    } catch (e) {
      setMsg('解封失败: ' + e.message);
    }
  };

  const handleDelete = async (email) => {
    if (!confirm(`确认注销 ${email}？这将删除其所有登录记录，允许该邮箱重新注册。`)) return;
    try {
      await deleteUser(email);
      setMsg(`已注销 ${email}，可重新注册`);
      fetchUsers();
    } catch (e) {
      setMsg('注销失败: ' + e.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">用户管理</h1>

      {msg && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-blue-800 text-sm">
          {msg}
          <button className="ml-3 text-blue-500 hover:text-blue-700" onClick={() => setMsg('')}>✕</button>
        </div>
      )}

      {/* Tab 切换 */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          className={`pb-2 px-4 font-medium ${tab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setTab('users')}
        >
          用户列表
        </button>
        <button
          className={`pb-2 px-4 font-medium ${tab === 'logs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setTab('logs')}
        >
          登录记录
        </button>
      </div>

      {loading && <p className="text-gray-500">加载中...</p>}

      {/* 用户列表 */}
      {tab === 'users' && !loading && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">邮箱</th>
                <th className="p-3 border">登录次数</th>
                <th className="p-3 border">最近登录</th>
                <th className="p-3 border">状态</th>
                <th className="p-3 border">操作</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr><td colSpan={5} className="p-3 text-center text-gray-400">暂无用户记录</td></tr>
              )}
              {users.map((u) => (
                <tr key={u.email} className="hover:bg-gray-50">
                  <td className="p-3 border font-mono text-xs">{u.email}</td>
                  <td className="p-3 border text-center">{u.login_count}</td>
                  <td className="p-3 border text-xs">{u.last_login ? new Date(u.last_login).toLocaleString('zh-CN') : '-'}</td>
                  <td className="p-3 border">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${u.status === 'banned' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {u.status === 'banned' ? '已封禁' : '正常'}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <div className="flex gap-2">
                      {u.status === 'banned' ? (
                        <button
                          onClick={() => handleUnban(u.email)}
                          className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                        >解封</button>
                      ) : (
                        <button
                          onClick={() => handleBan(u.email)}
                          className="px-2 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600"
                        >封禁</button>
                      )}
                      <button
                        onClick={() => handleDelete(u.email)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >注销</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-gray-400">共 {users.length} 个用户 · 封禁：用户无法登录；注销：删除记录并允许重新注册</p>
        </div>
      )}

      {/* 登录记录 */}
      {tab === 'logs' && !loading && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">邮箱</th>
                <th className="p-3 border">IP 地址</th>
                <th className="p-3 border">登录时间</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 && (
                <tr><td colSpan={3} className="p-3 text-center text-gray-400">暂无登录记录</td></tr>
              )}
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="p-3 border font-mono text-xs">{log.email}</td>
                  <td className="p-3 border text-xs text-gray-500">{log.ip || '-'}</td>
                  <td className="p-3 border text-xs">{new Date(log.login_at).toLocaleString('zh-CN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-gray-400">共 {logs.length} 条记录</p>
        </div>
      )}
    </div>
  );
}
