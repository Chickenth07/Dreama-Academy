import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaPhoneAlt, FaChevronDown } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const navLinks = [
  { label: 'Trang chủ', to: '/' },
  {
    label: 'Khóa học',
    to: '/khoa-hoc',
    children: [
      { label: 'IELTS Foundation', to: '/khoa-hoc/ielts-foundation' },
      { label: 'IELTS Intensive', to: '/khoa-hoc/ielts-intensive' },
      { label: 'IELTS Elite 1-1', to: '/khoa-hoc/ielts-elite' },
      { label: 'IELTS Online', to: '/khoa-hoc/ielts-online' },
      { label: 'Tiếng Anh Doanh nghiệp', to: '/khoa-hoc/english-business' },
    ],
  },
  { label: 'Về chúng tôi', to: '/ve-chung-toi' },
  { label: 'Blog', to: '/blog' },
  { label: 'Liên hệ', to: '/lien-he' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, logout } = useApp();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleNavClick = () => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <>
      <header
        className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
        role="banner"
      >
        <div className="container-custom h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" onClick={handleNavClick} id="navbar-logo">
            <div className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center shadow-primary">
              <span className="text-white font-bold text-lg font-display">D</span>
            </div>
            <div className="hidden sm:block">
              <span className={`font-display font-bold text-lg leading-tight block transition-colors duration-300 ${isScrolled ? 'text-navy' : 'text-white'}`}>
                Dreama
              </span>
              <span className={`text-xs font-medium leading-tight block transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-primary-200'}`}>
                Academy
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <div key={link.to} className="relative group" id={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}>
                {link.children ? (
                  <>
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
                        ${isScrolled ? 'text-navy hover:text-primary hover:bg-primary/5' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <FaChevronDown className={`text-xs transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 py-2 w-64 overflow-hidden">
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className="flex items-center px-4 py-3 text-sm text-navy hover:bg-primary/5 hover:text-primary transition-colors duration-200"
                            onClick={handleNavClick}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
                      ${isActive
                        ? 'text-primary bg-primary/10'
                        : isScrolled
                          ? 'text-navy hover:text-primary hover:bg-primary/5'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:0901234567"
              id="navbar-phone"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300
                ${isScrolled ? 'text-navy hover:text-primary' : 'text-white hover:text-primary-200'}`}
            >
              <FaPhoneAlt className="text-primary text-xs" />
              0901 234 567
            </a>
            {user ? (
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${isScrolled ? 'text-navy' : 'text-white'}`}>{user.name}</span>
                <button onClick={logout} className="btn btn-sm bg-gray-100 text-navy hover:bg-gray-200 text-xs">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <Link to="/dang-nhap" id="navbar-login-btn" className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 ${isScrolled ? 'text-navy hover:text-primary' : 'text-white hover:text-primary-200'}`}>
                  Đăng nhập
                </Link>
                <Link to="/dang-ky" id="navbar-register-btn" className="btn btn-primary btn-sm">
                  Đăng ký học
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${isScrolled ? 'text-navy' : 'text-white'}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
            id="navbar-mobile-toggle"
          >
            {isMobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMobileOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
        onClick={() => setIsMobileOpen(false)}
      >
        <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" />
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transition-transform duration-300 overflow-y-auto ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2" onClick={handleNavClick}>
              <div className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-display font-bold text-navy">Dreama Academy</span>
            </Link>
            <button onClick={() => setIsMobileOpen(false)} className="p-1 text-gray-400 hover:text-navy">
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Mobile nav links */}
          <nav className="p-5 space-y-1">
            {navLinks.map((link) => (
              <div key={link.to}>
                {link.children ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full px-3 py-3 text-navy font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <FaChevronDown className={`text-xs text-gray-400 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === link.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className="flex items-center px-3 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            onClick={handleNavClick}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2.5" />
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => `block px-3 py-3 font-semibold rounded-xl transition-colors ${isActive ? 'text-primary bg-primary/10' : 'text-navy hover:bg-gray-50'}`}
                    onClick={handleNavClick}
                  >
                    {link.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile actions */}
          <div className="p-5 border-t border-gray-100 space-y-3">
            <a href="tel:0901234567" className="flex items-center gap-2 text-navy font-semibold">
              <FaPhoneAlt className="text-primary text-sm" />
              0901 234 567
            </a>
            <Link to="/dang-nhap" className="btn btn-outline w-full justify-center" onClick={handleNavClick} id="mobile-login-btn">
              Đăng nhập
            </Link>
            <Link to="/dang-ky" className="btn btn-primary w-full justify-center" onClick={handleNavClick} id="mobile-register-btn">
              Đăng ký học ngay
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
