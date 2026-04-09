import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendCode, verifyCode } from '../api';

export default function Login() {
    const [step, setStep] = useState('email'); // 'email' | 'code' | 'success'
  const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const timerRef = useRef(null);
    const { login } = useAuth();
    const navigate = useNavigate();

  useEffect(() => {
        return () => clearInterval(timerRef.current);
  }, []);

  const startCountdown = (sec = 60) => {
        setCountdown(sec);
        timerRef.current = setInterval(() => {
                setCountdown(prev => {
                          if (prev <= 1) { clearInterval(timerRef.current); return 0; }
                          return prev - 1;
                });
        }, 1000);
  };

  const handleSendCode = async (e) => {
        e.preventDefault();
        setError(''); setInfo('');
        if (!email) { setError('请输入邮箱地址'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('邮箱格式不正确'); return; }
        setLoading(true);
        try {
                const data = await sendCode(email);
                if (data.success) {
                          setStep('code');
                          setInfo('验证码已发送，请查收邮件');
                          startCountdown(60);
                } else {
                          setError(data.message || '发送失败，请稍后重试');
                }
        } catch (err) {
                setError(err.message || '网络错误，请重试');
        } finally {
                setLoading(false);
        }
  };

  const handleResend = async () => {
        setError(''); setInfo('');
        setLoading(true);
        try {
                const data = await sendCode(email);
                if (data.success) {
                          setInfo('验证码已重新发送');
                          startCountdown(60);
                } else {
                          setError(data.message || '发送失败');
                }
        } catch (err) {
                setError(err.message || '网络错误');
        } finally {
                setLoading(false);
        }
  };

  const handleVerify = async (e) => {
        e.preventDefault();
        setError(''); setInfo('');
        if (!code || code.length !== 6) { setError('请输入6位验证码'); return; }
        setLoading(true);
        try {
                const data = await verifyCode(email, code);
                if (data.success) {
                          login(data.token, data.email);
                          setStep('success');
                          setTimeout(() => navigate('/'), 1200);
                } else {
                          setError(data.message || '验证失败');
                }
        } catch (err) {
                setError(err.message || '网络错误，请重试');
        } finally {
                setLoading(false);
        }
  };

  return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
                      <h1 className="text-2xl font-bold text-gray-800 mb-1">管理后台登录</h1>h1>
                      <p className="text-sm text-gray-500 mb-6">请使用邮箱验证码登录</p>p>
              
                {step === 'email' && (
                    <form onSubmit={handleSendCode}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>label>
                                <input
                                                type="email"
                                                placeholder="请输入管理员邮箱"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
                                                required
                                                autoComplete="email"
                                              />
                      {error && <p className="text-red-500 text-sm mb-3">{error}</p>p>}
                                <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 font-medium"
                                              >
                                  {loading ? '发送中...' : '发送验证码'}
                                </button>button>
                    </form>form>
                      )}
              
                {step === 'code' && (
                    <form onSubmit={handleVerify}>
                                <div className="bg-gray-50 rounded-lg px-3 py-2 mb-4 text-sm text-gray-600">
                                              验证码已发送至：<span className="font-medium text-gray-800">{email}</span>span>
                                </div>div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">验证码</label>label>
                                <input
                                                type="text"
                                                placeholder="请输入6位验证码"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500 text-center text-xl tracking-widest font-mono"
                                                maxLength={6}
                                                inputMode="numeric"
                                                autoFocus
                                              />
                      {info && <p className="text-green-600 text-sm mb-2">{info}</p>p>}
                      {error && <p className="text-red-500 text-sm mb-2">{error}</p>p>}
                                <div className="flex items-center justify-between mb-4 text-sm">
                                              <button
                                                                type="button"
                                                                onClick={() => { setStep('email'); setCode(''); setError(''); setInfo(''); clearInterval(timerRef.current); setCountdown(0); }}
                                                                className="text-gray-500 hover:text-gray-700"
                                                              >
                                                              ← 重新输入邮箱
                                              </button>button>
                                  {countdown > 0 ? (
                                      <span className="text-gray-400">{countdown}秒后可重发</span>span>
                                    ) : (
                                      <button
                                                          type="button"
                                                          onClick={handleResend}
                                                          disabled={loading}
                                                          className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                                                        >
                                                        重新发送
                                      </button>button>
                                              )}
                                </div>div>
                                <button
                                                type="submit"
                                                disabled={loading || code.length !== 6}
                                                className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 font-medium"
                                              >
                                  {loading ? '验证中...' : '验证并登录'}
                                </button>button>
                    </form>form>
                      )}
              
                {step === 'success' && (
                    <div className="text-center py-6">
                                <div className="text-5xl mb-4">✅</div>div>
                                <h3 className="text-xl font-semibold text-green-600 mb-2">登录成功！</h3>h3>
                                <p className="text-gray-500 text-sm">正在跳转到管理后台...</p>p>
                    </div>div>
                      )}
              </div>div>
        </div>div>
      );
}
</div>
