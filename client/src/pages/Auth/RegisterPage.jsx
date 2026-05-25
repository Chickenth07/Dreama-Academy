import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { userAPI } from '../../services/api';
import { useApp } from '../../context/AppContext';

const courses = [
  'IELTS Foundation', 'IELTS Intensive', 'IELTS Elite 1-1',
  'IELTS Online', 'Tiếng Anh Doanh nghiệp', 'Tiếng Anh Mất Gốc Online',
];

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', course: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { showNotification } = useApp();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await userAPI.register(form);
      setSuccess(true);
      showNotification('Đăng ký thành công!', 'success');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Link to="/" className="flex items-center gap-3 justify-center mb-8" id="register-logo">
          <div className="w-12 h-12 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-primary">
            <span className="text-white font-bold text-xl font-display">D</span>
          </div>
          <div className="text-white">
            <p className="font-display font-bold text-xl">Dreama Academy</p>
            <p className="text-xs text-white/50">Học IELTS thực chiến</p>
          </div>
        </Link>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {success ? (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <FaCheckCircle className="text-green-500 text-4xl" />
              </div>
              <h2 className="font-display font-bold text-navy text-2xl mb-3">Đăng ký thành công!</h2>
              <p className="text-text-secondary mb-6">
                Chào mừng bạn đến với Dreama Academy. Chúng tôi sẽ liên hệ trong 24 giờ.
              </p>
              <div className="flex gap-3 justify-center">
                <Link to="/dang-nhap" id="register-goto-login" className="btn btn-primary">Đăng nhập</Link>
                <Link to="/" id="register-goto-home" className="btn btn-outline">Về trang chủ</Link>
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-display font-bold text-navy text-2xl mb-2">Đăng ký học</h1>
              <p className="text-text-secondary text-sm mb-7">Tạo tài khoản để bắt đầu hành trình IELTS cùng Dreama Academy.</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>
              )}

              <form onSubmit={handleSubmit} id="register-form" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="form-label" htmlFor="register-name">Họ và tên *</label>
                    <input id="register-name" name="name" type="text" value={form.name} onChange={handleChange}
                      placeholder="Nguyễn Văn A" className="form-input" required />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="register-email">Email *</label>
                    <input id="register-email" name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="email@example.com" className="form-input" required />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="register-phone">Số điện thoại *</label>
                    <input id="register-phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="0901 234 567" className="form-input" required />
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="register-password">Mật khẩu *</label>
                  <div className="relative">
                    <input
                      id="register-password" name="password"
                      type={showPw ? 'text' : 'password'}
                      value={form.password} onChange={handleChange}
                      placeholder="Tối thiểu 8 ký tự" className="form-input pr-11" required minLength={8}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy"
                      id="register-toggle-password">
                      {showPw ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="register-course">Khóa học quan tâm</label>
                  <select id="register-course" name="course" value={form.course} onChange={handleChange} className="form-input">
                    <option value="">-- Chọn khóa học --</option>
                    {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <button type="submit" id="register-submit-btn" disabled={loading}
                  className={`btn btn-primary w-full btn-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {loading ? (
                    <span className="flex items-center gap-2 justify-center">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang đăng ký...
                    </span>
                  ) : '🚀 Đăng ký ngay'}
                </button>
                <p className="text-xs text-center text-text-muted">
                  Bằng cách đăng ký, bạn đồng ý với{' '}
                  <a href="#" className="text-primary hover:underline">Điều khoản sử dụng</a>.
                </p>
              </form>

              <p className="text-center text-sm text-text-secondary mt-6">
                Đã có tài khoản?{' '}
                <Link to="/dang-nhap" id="register-login-link" className="text-primary font-semibold hover:underline">Đăng nhập</Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
