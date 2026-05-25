import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-hero flex items-center justify-center text-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-9xl font-display font-bold text-gradient mb-4">404</p>
        <h1 className="text-3xl font-display font-bold mb-4">Trang không tồn tại</h1>
        <p className="text-white/60 mb-8 max-w-md">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" id="not-found-home-btn" className="btn btn-primary btn-lg">← Về trang chủ</Link>
          <Link to="/khoa-hoc" id="not-found-courses-btn" className="btn btn-ghost btn-lg">Xem khóa học</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
