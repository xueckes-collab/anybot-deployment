import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/prompts', label: 'System Prompt' },
  { to: '/config', label: '模型参数' },
  { to: '/conversations', label: '对话记录' },
  { to: '/documents', label: '知识库文档' },
  { to: '/quick-replies', label: '快捷回复' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-56 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold">管理后台</h1>
        </div>
        <nav className="flex-1 p-2">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded mb-1 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <span className="text-sm text-gray-400">{user?.username}</span>
          <button
            onClick={handleLogout}
            className="ml-2 text-sm text-gray-400 hover:text-white"
          >
            退出
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6 bg-white min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
