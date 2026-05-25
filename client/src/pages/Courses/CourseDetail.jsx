import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaClock, FaCheckCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { courseAPI } from '../../services/api';

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ';

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseAPI.getById(slug)
      .then((res) => setCourse(res.data))
      .catch(() => navigate('/khoa-hoc', { replace: true }))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-secondary">Đang tải...</p>
      </div>
    </div>
  );

  if (!course) return null;

  const discount = course.salePrice
    ? Math.round(((course.price - course.salePrice) / course.price) * 100)
    : null;

  return (
    <>
      <title>{course.title} – Dreama Academy</title>

      {/* Hero */}
      <section className="bg-hero pt-28 pb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link to="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <Link to="/khoa-hoc" className="hover:text-white">Khóa học</Link>
            <span>/</span>
            <span className="text-white">{course.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex gap-2 mb-4">
                {course.tags.map((tag) => (
                  <span key={tag} className="badge bg-primary/30 text-primary-200 border border-primary/30">{tag}</span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">{course.title}</h1>
              <p className="text-xl text-primary mb-5">{course.subtitle}</p>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">{course.fullDescription}</p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <FaStar className="text-gold" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-white/50">({course.reviewCount} đánh giá)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-blue-300" />
                  <span>{course.students.toLocaleString('vi-VN')} học viên</span>
                </div>
                {course.lessons && (
                  <div className="flex items-center gap-2">
                    <FaClock className="text-green-300" />
                    <span>{course.lessons} bài học</span>
                  </div>
                )}
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mt-6 bg-white/10 rounded-2xl p-4">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="w-12 h-12 rounded-full border-2 border-primary" />
                <div>
                  <p className="font-semibold">{course.instructor.name}</p>
                  <p className="text-white/60 text-sm">{course.instructor.title}</p>
                </div>
              </div>
            </motion.div>

            {/* Sticky purchase card on mobile will scroll */}
            <motion.div
              className="bg-white rounded-3xl p-6 text-navy shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img src={course.thumbnail} alt={course.title} className="w-full h-48 rounded-2xl object-cover mb-5" />
              <div className="mb-5">
                {course.salePrice ? (
                  <>
                    <p className="text-3xl font-bold text-primary">{formatPrice(course.salePrice)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-text-muted line-through text-sm">{formatPrice(course.price)}</p>
                      {discount && <span className="badge bg-green-100 text-green-700">Tiết kiệm {discount}%</span>}
                    </div>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-primary">{formatPrice(course.price)}</p>
                )}
              </div>
              <Link to="/dang-ky" id={`course-detail-enroll-btn`} className="btn btn-primary w-full btn-lg mb-3">
                Đăng ký học ngay
                <FaArrowRight />
              </Link>
              <Link to="/lien-he" id="course-detail-consult-btn" className="btn btn-outline w-full">
                Tư vấn miễn phí
              </Link>
              <div className="mt-4 space-y-2">
                {course.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back button */}
      <div className="container-custom py-6">
        <button
          onClick={() => navigate(-1)}
          id="course-detail-back-btn"
          className="btn bg-gray-100 text-navy hover:bg-gray-200 text-sm"
        >
          <FaArrowLeft />
          Quay lại
        </button>
      </div>
    </>
  );
};

export default CourseDetail;
