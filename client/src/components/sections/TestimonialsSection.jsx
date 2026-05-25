import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import { userAPI } from '../../services/api';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    userAPI.getTestimonials()
      .then((res) => setTestimonials(res.data || []))
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <section id="testimonials-section" className="section bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy/3 rounded-full blur-3xl translate-x-1/2" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold text-sm">💬 Học viên nói gì</span>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Câu chuyện thành công từ{' '}
            <span className="text-gradient">học viên</span>
          </motion.h2>
        </div>

        {/* Swiper testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div id={`testimonial-card-${t.id}`} className="card p-6 h-full">
                  {/* Quote icon */}
                  <FaQuoteLeft className="text-primary/20 text-4xl mb-4" />

                  {/* Content */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-4">
                    "{t.content}"
                  </p>

                  {/* Score badge */}
                  <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-orange-50">
                    <div className="text-center">
                      <p className="text-xs text-text-muted">Mục tiêu</p>
                      <p className="font-bold text-navy text-sm">{t.targetScore}</p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="text-center">
                      <p className="text-xs text-text-muted">Đạt được</p>
                      <p className="font-bold text-primary text-2xl">IELTS {t.score}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="badge bg-green-100 text-green-700 text-xs">✅ Vượt mục tiêu</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < t.rating ? 'text-gold text-sm' : 'text-gray-200 text-sm'} />
                    ))}
                  </div>

                  {/* User info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-navy text-sm">{t.name}</p>
                      <p className="text-xs text-text-muted">{t.university}</p>
                    </div>
                    <span className="badge-primary text-xs">{t.course}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
