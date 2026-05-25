import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Khóa học',
      links: [
        { label: 'IELTS Foundation', to: '/khoa-hoc/ielts-foundation' },
        { label: 'IELTS Intensive', to: '/khoa-hoc/ielts-intensive' },
        { label: 'IELTS Elite 1-1', to: '/khoa-hoc/ielts-elite' },
        { label: 'IELTS Online', to: '/khoa-hoc/ielts-online' },
        { label: 'Tiếng Anh DN', to: '/khoa-hoc/english-business' },
      ],
    },
    {
      title: 'Về chúng tôi',
      links: [
        { label: 'Giới thiệu', to: '/ve-chung-toi' },
        { label: 'Đội ngũ giảng viên', to: '/ve-chung-toi#giang-vien' },
        { label: 'Cơ sở vật chất', to: '/ve-chung-toi#co-so' },
        { label: 'Cam kết chất lượng', to: '/ve-chung-toi#cam-ket' },
      ],
    },
    {
      title: 'Hỗ trợ',
      links: [
        { label: 'Blog & Tài liệu', to: '/blog' },
        { label: 'Câu hỏi thường gặp', to: '/lien-he#faq' },
        { label: 'Liên hệ', to: '/lien-he' },
        { label: 'Đăng ký học', to: '/dang-ky' },
      ],
    },
  ];

  return (
    <footer className="bg-navy-900 text-white" role="contentinfo">
      {/* Top footer */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5" id="footer-logo">
              <div className="w-12 h-12 rounded-xl bg-primary-gradient flex items-center justify-center shadow-primary">
                <span className="text-white font-bold text-xl font-display">D</span>
              </div>
              <div>
                <span className="font-display font-bold text-xl block">Dreama Academy</span>
                <span className="text-xs text-gray-400">Trung tâm đào tạo tiếng Anh hàng đầu</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Dreama Academy – Nơi biến ước mơ IELTS của bạn thành hiện thực. Cam kết đầu ra, phương pháp thực chiến.
            </p>
            {/* Contact info */}
            <div className="space-y-3">
              <a href="tel:0901234567" className="flex items-center gap-3 text-sm text-gray-300 hover:text-primary transition-colors group" id="footer-phone">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <FaPhoneAlt className="text-primary text-xs" />
                </div>
                0901 234 567
              </a>
              <a href="mailto:info@dreamaacademy.edu.vn" className="flex items-center gap-3 text-sm text-gray-300 hover:text-primary transition-colors group" id="footer-email">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <FaEnvelope className="text-primary text-xs" />
                </div>
                info@dreamaacademy.edu.vn
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-primary text-xs" />
                </div>
                <span>123 Phố Huế, Hai Bà Trưng, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="font-display font-bold text-base mb-5 text-white">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-primary transition-colors hover-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Dreama Academy. All rights reserved.
          </p>
          {/* Social links */}
          <div className="flex items-center gap-3" id="footer-social">
            {[
              { icon: <FaFacebook />, href: '#', label: 'Facebook' },
              { icon: <FaYoutube />, href: '#', label: 'YouTube' },
              { icon: <FaTiktok />, href: '#', label: 'TikTok' },
              { icon: <FaInstagram />, href: '#', label: 'Instagram' },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 text-sm"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
