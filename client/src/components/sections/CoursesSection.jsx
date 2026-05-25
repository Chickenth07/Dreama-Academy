import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaClock, FaArrowRight, FaFire, FaTag } from 'react-icons/fa';
import { courseAPI } from '../../services/api';

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';

const CourseCard = ({ course, index }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const discount = course.salePrice
    ? Math.round(((course.price - course.salePrice) / course.price) * 100)
    : null;

  return (
    <motion.div
      ref={ref}
      className="card-hover group"
      id={`course-card-${course.id}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {course.isPopular && (
            <span className="badge bg-primary text-white gap-1">
              <FaFire className="text-xs" /> Hot
            </span>
          )}
          {discount && (
            <span className="badge bg-green-500 text-white gap-1">
              <FaTag className="text-xs" /> -{discount}%
            </span>
          )}
        </div>

        {/* Mode badge */}
        <div className="absolute top-3 right-3">
          <span className={`badge text-white ${course.mode === 'online' ? 'bg-blue-500' : 'bg-navy'}`}>
            {course.mode === 'online' ? '💻 Online' : '🏫 Offline'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & Level */}
        <div className="flex items-center gap-2 mb-3">
          <span className="badge-primary">{course.level}</span>
          <span className="text-xs text-text-muted">• {course.duration}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-navy text-lg mb-1 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-primary font-semibold mb-3">{course.subtitle}</p>
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">{course.description}</p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
          />
          <div>
            <p className="text-xs font-semibold text-navy">{course.instructor.name}</p>
            <p className="text-xs text-text-muted">{course.instructor.title}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            <FaStar className="text-gold" />
            <span className="font-semibold text-navy">{course.rating}</span>
            <span>({course.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-blue-400" />
            <span>{course.students.toLocaleString('vi-VN')} học viên</span>
          </div>
          {course.lessons && (
            <div className="flex items-center gap-1">
              <FaClock className="text-green-400" />
              <span>{course.lessons} bài học</span>
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            {course.salePrice ? (
              <>
                <p className="text-xl font-bold text-primary">{formatPrice(course.salePrice)}</p>
                <p className="text-xs text-text-muted line-through">{formatPrice(course.price)}</p>
              </>
            ) : (
              <p className="text-xl font-bold text-primary">{formatPrice(course.price)}</p>
            )}
          </div>
          <Link
            to={`/khoa-hoc/${course.slug}`}
            id={`course-detail-btn-${course.id}`}
            className="btn btn-primary btn-sm group/btn"
          >
            Chi tiết
            <FaArrowRight className="text-xs group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const FILTERS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Offline', value: 'offline' },
  { label: 'Online', value: 'online' },
];

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await courseAPI.getAll();
        setCourses(res.data || []);
      } catch {
        // Fallback static data
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = filter === 'all' ? courses : courses.filter(c => c.mode === filter);

  return (
    <section id="courses-section" className="section bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold text-sm">📚 Chương trình học</span>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Các khóa học tại{' '}
            <span className="text-gradient">Dreama Academy</span>
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Lựa chọn khóa học phù hợp với trình độ và mục tiêu của bạn. Chúng tôi cam kết đồng hành cùng bạn đến khi đạt mục tiêu.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              id={`filter-tab-${f.value}`}
              onClick={() => setFilter(f.value)}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300
                ${filter === f.value
                  ? 'bg-primary text-white shadow-primary'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-0 overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        )}

        {/* View all */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/khoa-hoc" id="view-all-courses-btn" className="btn btn-outline btn-lg group">
            Xem tất cả khóa học
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;
