import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock, FaEye } from 'react-icons/fa';
import { blogAPI } from '../../services/api';

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogAPI.getLatest(3)
      .then((res) => setBlogs(res.data || []))
      .catch(() => setBlogs([]));
  }, []);

  return (
    <section id="blog-section" className="section bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold text-sm">📰 Blog & Tài liệu</span>
            </motion.div>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Kiến thức & Kinh nghiệm{' '}
              <span className="text-gradient">IELTS</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/blog" id="view-all-blogs-btn" className="btn btn-outline group">
              Xem tất cả
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <motion.article
              key={blog.id}
              id={`blog-card-${blog.id}`}
              className="card-hover group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="badge bg-primary text-white">{blog.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                  <span className="flex items-center gap-1">
                    <FaClock className="text-primary" />
                    {blog.readTime} phút đọc
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye className="text-blue-400" />
                    {blog.views.toLocaleString('vi-VN')}
                  </span>
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-navy text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>
                <p className="text-sm text-text-secondary line-clamp-3 mb-4">{blog.excerpt}</p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-navy">{blog.author.name}</span>
                  </div>
                  <Link
                    to={`/blog/${blog.slug}`}
                    id={`blog-read-btn-${blog.id}`}
                    className="text-xs font-semibold text-primary hover:text-primary-700 flex items-center gap-1 group/link"
                  >
                    Đọc thêm
                    <FaArrowRight className="text-xs group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
