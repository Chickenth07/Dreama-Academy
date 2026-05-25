import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { userAPI } from '../../services/api';
import { useApp } from '../../context/AppContext';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, showNotification } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await userAPI.login(form);
      login(res.data, res.token);
      showNotification(`Chào mừng ${res.data.name}!`, 'success');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 justify-center mb-8" id="login-logo">
          <div className="w-12 h-12 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-primary">
            <span className="text-white font-bold text-xl font-display">D</span>
          </div>
          <div className="text-white">
            <p className="font-display font-bold text-xl">Dreama Academy</p>
            <p className="text-xs text-white/50">Học IELTS thực chiến</p>
          </div>
        </Link>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h1 className="font-display font-bold text-navy text-2xl mb-2">Đăng nhập</h1>
          <p className="text-text-secondary text-sm mb-7">Chào mừng bạn trở lại Dreama Academy!</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} id="login-form" className="space-y-4">
            <div>
              <label className="form-label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="form-input"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="login-password">Mật khẩu</label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="form-input pr-11"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
                  id="login-toggle-password"
                >
                  {showPw ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="login-remember" className="rounded border-gray-300 text-primary" />
                <span className="text-text-secondary">Nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-primary hover:underline font-medium" id="login-forgot-password">Quên mật khẩu?</a>
            </div>
            <button
              type="submit"
              id="login-submit-btn"
              disabled={loading}
              className={`btn btn-primary w-full btn-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang đăng nhập...
                </span>
              ) : 'Đăng nhập'}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Chưa có tài khoản?{' '}
            <Link to="/dang-ky" id="login-register-link" className="text-primary font-semibold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
          <div className="mt-4 text-center">
            <Link to="/" id="login-back-home" className="text-xs text-text-muted hover:text-navy transition-colors">
              ← Về trang chủ
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
