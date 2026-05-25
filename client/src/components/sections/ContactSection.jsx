import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { userAPI } from '../../services/api';

const courses = [
  'IELTS Foundation', 'IELTS Intensive', 'IELTS Elite 1-1',
  'IELTS Online', 'Tiếng Anh Doanh nghiệp', 'Tiếng Anh Mất Gốc Online',
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await userAPI.submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', course: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact-section" className="section bg-hero relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left info */}
          <motion.div
            className="text-white"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-5">
              <span className="font-semibold text-sm">📞 Tư vấn miễn phí</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 leading-tight">
              Đăng ký nhận tư vấn{' '}
              <span className="text-gradient">lộ trình IELTS</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Điền thông tin để được chuyên gia tư vấn lộ trình IELTS phù hợp nhất với bạn. Hoàn toàn miễn phí!
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {[
                'Tư vấn 1-1 với chuyên gia IELTS',
                'Phân tích trình độ hiện tại',
                'Đề xuất khóa học phù hợp',
                'Nhận tài liệu học miễn phí',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <FaCheckCircle className="text-primary flex-shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {[
                { icon: <FaPhoneAlt />, label: 'Hotline', value: '0901 234 567', href: 'tel:0901234567', id: 'contact-phone' },
                { icon: <FaEnvelope />, label: 'Email', value: 'info@dreamaacademy.edu.vn', href: 'mailto:info@dreamaacademy.edu.vn', id: 'contact-email' },
                { icon: <FaMapMarkerAlt />, label: 'Địa chỉ', value: '123 Phố Huế, Hai Bà Trưng, Hà Nội', href: '#', id: 'contact-address' },
              ].map(({ icon, label, value, href, id }) => (
                <a key={id} href={href} id={id} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 hover:bg-white/15 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/50 font-medium">{label}</p>
                    <p className="text-sm text-white font-semibold">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <FaCheckCircle className="text-green-500 text-4xl" />
                </div>
                <h3 className="font-display font-bold text-navy text-2xl mb-3">Đăng ký thành công!</h3>
                <p className="text-text-secondary mb-6">Chuyên gia của chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.</p>
                <button onClick={() => setStatus(null)} className="btn btn-primary">
                  Đăng ký lại
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-navy text-2xl mb-2">Đăng ký tư vấn</h3>
                <p className="text-text-secondary text-sm mb-6">Điền thông tin và chúng tôi sẽ liên hệ ngay!</p>

                <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label" htmlFor="contact-name">Họ và tên *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-phone-input">Số điện thoại *</label>
                      <input
                        id="contact-phone-input"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="0901 234 567"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-email-input">Email *</label>
                    <input
                      id="contact-email-input"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-course">Khóa học quan tâm</label>
                    <select
                      id="contact-course"
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">-- Chọn khóa học --</option>
                      {courses.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-message">Ghi chú</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Trình độ hiện tại, mục tiêu điểm số..."
                      rows={3}
                      className="form-input resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm">Đã xảy ra lỗi. Vui lòng thử lại hoặc gọi hotline.</p>
                  )}

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={status === 'loading'}
                    className={`btn btn-primary w-full btn-lg ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Đang gửi...
                      </span>
                    ) : (
                      '🚀 Đăng ký tư vấn ngay'
                    )}
                  </button>
                  <p className="text-xs text-center text-text-muted">
                    Bằng cách đăng ký, bạn đồng ý với{' '}
                    <a href="#" className="text-primary hover:underline">Chính sách bảo mật</a> của chúng tôi.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
