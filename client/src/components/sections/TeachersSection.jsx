import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { userAPI } from '../../services/api';

const TeachersSection = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userAPI.getTeachers()
      .then((res) => setTeachers(res.data || []))
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="teachers-section" className="section bg-navy-900 text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-semibold text-sm">👨‍🏫 Đội ngũ giảng viên</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Chuyên gia IELTS hàng đầu{' '}
            <span className="text-gradient">Dreama Academy</span>
          </motion.h2>
          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            100% giảng viên đạt IELTS 8.5+, được đào tạo tại các trường đại học danh tiếng trong và ngoài nước.
          </motion.p>
        </div>

        {/* Swiper */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-6 animate-pulse">
                <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4" />
                <div className="h-4 bg-white/20 rounded w-3/4 mx-auto mb-2" />
                <div className="h-3 bg-white/20 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {teachers.map((teacher) => (
                <SwiperSlide key={teacher.id}>
                  <div
                    id={`teacher-card-${teacher.id}`}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Avatar */}
                    <div className="relative w-24 h-24 mx-auto mb-5">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-full h-full rounded-full object-cover border-4 border-primary/40 group-hover:border-primary transition-colors duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary rounded-full px-2 py-0.5 text-white text-xs font-bold shadow-primary">
                        {teacher.score.split(' ')[1]}
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="font-display font-bold text-white text-lg mb-1">{teacher.name}</h3>
                    <p className="text-primary text-sm font-semibold mb-2">{teacher.title}</p>
                    <p className="text-white/50 text-xs mb-4">{teacher.experience} kinh nghiệm</p>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <FaStar key={j} className={j < Math.floor(teacher.rating) ? 'text-gold text-sm' : 'text-white/20 text-sm'} />
                      ))}
                      <span className="text-white/70 text-xs ml-1">{teacher.rating}</span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                      {teacher.specialties.slice(0, 2).map((s) => (
                        <span key={s} className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10 text-center">
                      <div>
                        <p className="text-white font-bold">{teacher.students.toLocaleString('vi-VN')}+</p>
                        <p className="text-white/50 text-xs">học viên</p>
                      </div>
                      <div>
                        <p className="text-white font-bold">{teacher.courses}</p>
                        <p className="text-white/50 text-xs">khóa học</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TeachersSection;
