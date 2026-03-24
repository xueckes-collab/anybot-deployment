import { useState, useEffect } from 'react';
import { getConfig, saveConfig } from '../api';

const MODELS = [
  'deepseek-chat',
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-4-turbo',
  'gpt-3.5-turbo',
];

export default function Config() {
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [model, setModel] = useState('deepseek-chat');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getConfig().then((cfg) => {
      setTemperature(cfg.temperature);
      setMaxTokens(cfg.max_tokens);
      setModel(cfg.model);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await saveConfig({ temperature, max_tokens: maxTokens, model });
      setMessage('保存成功，已立即生效');
    } catch (e) {
      setMessage('保存失败: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-4">模型参数配置</h1>
      {message && (
        <p className={`mb-4 text-sm ${message.includes('失败') ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <div className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature: {temperature}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Tokens
          </label>
          <input
            type="number"
            min="100"
            max="8192"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value, 10) || 2048)}
            className="border border-gray-300 rounded px-3 py-2 w-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            模型版本
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-64"
          >
            {MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {saving ? '保存中...' : '保存'}
        </button>
      </div>
    </div>
  );
}
