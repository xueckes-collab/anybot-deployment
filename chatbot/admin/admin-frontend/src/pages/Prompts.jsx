import { useState, useEffect } from 'react';
import {
  getConfig,
  getPrompts,
  createPrompt,
  updatePrompt,
  activatePrompt,
  deletePrompt,
} from '../api';

export default function Prompts() {
  const [prompts, setPrompts] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeUpdatedAt, setActiveUpdatedAt] = useState('');
  const [editing, setEditing] = useState(null);
  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const cfg = await getConfig();
      const list = await getPrompts();
      setPrompts(list);
      setActiveId(cfg.active_prompt_id);
      setActiveUpdatedAt(cfg.active_prompt_updated_at || '');
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    try {
      setError('');
      await updatePrompt(editing.id, { content: newContent, name: newName });
      setEditing(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      setError('');
      await createPrompt(newName, newContent);
      setNewName('');
      setNewContent('');
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleActivate = async (id) => {
    try {
      setError('');
      await activatePrompt(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('确定删除此模板？')) return;
    try {
      setError('');
      await deletePrompt(id);
      if (editing?.id === id) setEditing(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-4">System Prompt 管理</h1>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <p className="text-sm text-gray-500 mb-4">
        当前生效: ID {activeId} · 最后修改: {activeUpdatedAt || '-'}
      </p>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-2">新建模板</h2>
        <input
          type="text"
          placeholder="模板名称"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64 mr-2 mb-2"
        />
        <textarea
          placeholder="Prompt 内容"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={4}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
        />
        <button
          onClick={handleCreate}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          保存为新模板
        </button>
      </div>

      <div>
        <h2 className="text-sm font-medium text-gray-700 mb-2">模板列表</h2>
        <div className="space-y-2">
          {prompts.map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 rounded p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  {p.name}
                  {p.is_active && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      当前生效
                    </span>
                  )}
                </span>
                <div className="flex gap-2">
                  {!p.is_active && (
                    <button
                      onClick={() => handleActivate(p.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      切换
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditing(p);
                      setNewName(p.name);
                      setNewContent(p.content);
                    }}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    删除
                  </button>
                </div>
              </div>
              {editing?.id === p.id ? (
                <div>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border rounded px-2 py-1 w-64 mb-2"
                  />
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={6}
                    className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                  />
                  <button
                    onClick={handleSave}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    保存
                  </button>
                </div>
              ) : (
                <pre className="text-sm text-gray-600 whitespace-pre-wrap truncate max-h-20">
                  {p.content}
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
