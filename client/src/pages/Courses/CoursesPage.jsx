import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaClock, FaFire, FaTag, FaSearch, FaFilter } from 'react-icons/fa';
import { courseAPI } from '../../services/api';

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';

const MODES = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Offline', value: 'offline' },
  { label: 'Online', value: 'online' },
];

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    courseAPI.getAll()
      .then((res) => setCourses(res.data || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter((c) => {
    const matchMode = filter === 'all' || c.mode === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchMode && matchSearch;
  });

  return (
    <>
      <title>Khóa học – Dreama Academy</title>

      {/* Page hero */}
      <section className="bg-hero pt-32 pb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-4">
              <span className="font-semibold text-sm">📚 Tất cả khóa học</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Các chương trình học tại{' '}
              <span className="text-gradient">Dreama Academy</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Chọn khóa học phù hợp với trình độ và mục tiêu của bạn. Cam kết đầu ra rõ ràng cho từng khóa học.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky top-[72px] z-30 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                id="courses-search-input"
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-9 py-2.5"
              />
            </div>
            {/* Mode filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400 text-sm" />
              {MODES.map((m) => (
                <button
                  key={m.value}
                  id={`courses-filter-${m.value}`}
                  onClick={() => setFilter(m.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === m.value ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary hover:bg-gray-200'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-sm text-text-muted whitespace-nowrap">{filtered.length} khóa học</p>
          </div>
        </div>
      </section>

      {/* Courses grid */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="font-display font-bold text-navy text-xl mb-2">Không tìm thấy khóa học</h3>
              <p className="text-text-secondary">Hãy thử từ khóa khác hoặc bỏ bộ lọc.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course, i) => (
                <motion.div
                  key={course.id}
                  id={`course-item-${course.id}`}
                  className="card-hover group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="relative overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {course.isPopular && <span className="badge bg-primary text-white"><FaFire className="text-xs mr-1" />Hot</span>}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`badge text-white ${course.mode === 'online' ? 'bg-blue-500' : 'bg-navy'}`}>
                        {course.mode === 'online' ? '💻 Online' : '🏫 Offline'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-primary">{course.level}</span>
                      <span className="text-xs text-text-muted">• {course.duration}</span>
                    </div>
                    <h3 className="font-display font-bold text-navy text-lg mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-xs text-primary font-semibold mb-3">{course.subtitle}</p>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">{course.description}</p>
                    <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-gold" />
                        <span className="font-semibold text-navy">{course.rating}</span>
                        <span>({course.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaUsers className="text-blue-400" />
                        <span>{course.students.toLocaleString('vi-VN')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold text-primary">{formatPrice(course.salePrice || course.price)}</p>
                        {course.salePrice && <p className="text-xs text-text-muted line-through">{formatPrice(course.price)}</p>}
                      </div>
                      <Link to={`/khoa-hoc/${course.slug}`} id={`courses-page-detail-btn-${course.id}`} className="btn btn-primary btn-sm">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CoursesPage;
