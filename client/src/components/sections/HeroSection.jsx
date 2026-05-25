import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    badge: '🏆 Top 1 Hà Nội',
    title: 'Chinh phục IELTS',
    highlight: '7.0+',
    subtitle: 'cùng Dreama Academy',
    description: 'Lộ trình học thực chiến, giảng viên IELTS 8.5+, cam kết đầu ra. Hơn 10,000 học viên đã thành công.',
    cta: { label: 'Đăng ký học ngay', to: '/dang-ky' },
    ctaSecondary: { label: 'Xem khóa học', to: '/khoa-hoc' },
    highlights: ['Cam kết đạt điểm mục tiêu', 'Giảng viên IELTS 9.0', 'Lộ trình cá nhân hóa'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&h=500&fit=crop',
    gradient: 'from-navy-900 via-navy-800 to-navy-700',
  },
  {
    id: 2,
    badge: '✨ Mới nhất 2025',
    title: 'IELTS Elite 1-1',
    highlight: 'Học 1-1',
    subtitle: 'cá nhân hóa hoàn toàn',
    description: 'Trải nghiệm học tập đỉnh cao với chương trình được thiết kế riêng cho bạn. Cam kết 7.0+ trong 3 tháng.',
    cta: { label: 'Tìm hiểu ngay', to: '/khoa-hoc/ielts-elite' },
    ctaSecondary: { label: 'Tư vấn miễn phí', to: '/lien-he' },
    highlights: ['Học 1-1 với chuyên gia', 'Lịch học linh hoạt', 'Feedback tức thì'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&h=500&fit=crop',
    gradient: 'from-[#1a0533] via-[#2d0a5c] to-[#1a1553]',
  },
  {
    id: 3,
    badge: '💻 Online & Offline',
    title: 'Học mọi lúc',
    highlight: 'mọi nơi',
    subtitle: 'với IELTS Online',
    description: 'Hệ thống học online tiên tiến nhất. Hơn 5,000 học viên online đang theo học với chất lượng như offline.',
    cta: { label: 'Học thử miễn phí', to: '/khoa-hoc/ielts-online' },
    ctaSecondary: { label: 'Xem demo', to: '#' },
    highlights: ['Video bài giảng HD', 'Tương tác trực tiếp', 'Tài liệu không giới hạn'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&h=500&fit=crop',
    gradient: 'from-[#051A53] via-[#0a2a7a] to-[#051A53]',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoplay]);

  const slide = slides[current];

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative circles */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        </motion.div>
      </AnimatePresence>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="text-white"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-sm font-semibold">{slide.badge}</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-none mb-4 text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-white">{slide.title}</span>
                <div><span className="text-gradient">{slide.highlight}</span></div>
                <div className="text-3xl md:text-4xl font-medium text-white/80 mt-2">
                  {slide.subtitle}
                </div>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg text-white/75 max-w-lg mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {slide.description}
              </motion.p>

              {/* Highlights */}
              <motion.div
                className="flex flex-wrap gap-3 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {slide.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <FaCheckCircle className="text-primary text-sm flex-shrink-0" />
                    <span className="text-sm font-medium text-white/90">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link to={slide.cta.to} id={`hero-cta-primary-${current}`} className="btn btn-primary btn-lg group">
                  {slide.cta.label}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to={slide.ctaSecondary.to} id={`hero-cta-secondary-${current}`} className="btn btn-ghost btn-lg">
                  {slide.ctaSecondary.label}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -40 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="relative">
                {/* Main image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl animate-hero-float">
                  <img
                    src={slide.image}
                    alt="Dreama Academy"
                    className="w-full h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                </div>

                {/* Floating cards */}
                <motion.div
                  className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-lg">🎯</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tỷ lệ đạt mục tiêu</p>
                    <p className="font-bold text-navy text-sm">96.8%</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-lg p-4"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {[1,2,3,4,5].map(i => <span key={i} className="text-gold text-sm">⭐</span>)}
                  </div>
                  <p className="text-xs text-gray-500">Đánh giá học viên</p>
                  <p className="font-bold text-navy text-sm">4.9/5.0</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              id={`hero-slide-dot-${i}`}
              className={`transition-all duration-500 rounded-full ${i === current ? 'w-8 h-3 bg-primary' : 'w-3 h-3 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs font-medium">Cuộn xuống</span>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-1 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
