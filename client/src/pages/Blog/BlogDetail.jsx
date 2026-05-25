import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaEye, FaArrowLeft } from 'react-icons/fa';
import { blogAPI } from '../../services/api';

const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' });

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    blogAPI.getById(slug)
      .then((res) => setBlog(res.data))
      .catch(() => navigate('/blog', { replace: true }));
  }, [slug]);

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <>
      <title>{blog.title} – Dreama Academy Blog</title>

      {/* Hero */}
      <section className="bg-hero pt-28 pb-16 text-white">
        <div className="container-custom max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-5">
            <Link to="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white">Blog</Link>
            <span>/</span>
            <span className="text-white truncate max-w-xs">{blog.title}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge bg-primary text-white mb-5 inline-block">{blog.category}</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-5 leading-tight">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <img src={blog.author.avatar} alt={blog.author.name} className="w-8 h-8 rounded-full" />
                <span className="text-white font-medium">{blog.author.name}</span>
              </div>
              <span className="flex items-center gap-1"><FaClock />{blog.readTime} phút đọc</span>
              <span className="flex items-center gap-1"><FaEye />{blog.views.toLocaleString('vi-VN')} lượt xem</span>
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <img src={blog.thumbnail} alt={blog.title} className="w-full rounded-3xl mb-10 shadow-lg" />
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-text-secondary font-medium mb-6">{blog.excerpt}</p>
            <p className="text-text-secondary leading-loose">{blog.content}</p>
            <p className="text-text-secondary leading-loose mt-4">
              Hãy tiếp tục luyện tập và đừng ngại liên hệ với Dreama Academy để được hỗ trợ thêm nhé!
            </p>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
            {blog.tags.map((tag) => (
              <span key={tag} className="badge badge-navy">{tag}</span>
            ))}
          </div>
          <button
            onClick={() => navigate(-1)}
            id="blog-back-btn"
            className="btn bg-gray-100 text-navy hover:bg-gray-200 mt-8"
          >
            <FaArrowLeft />
            Quay lại Blog
          </button>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
