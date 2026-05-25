import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaEye, FaSearch } from 'react-icons/fa';
import { blogAPI } from '../../services/api';

const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    blogAPI.getAll()
      .then((res) => setBlogs(res.data || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(blogs.map(b => b.category))];
  const filtered = blogs.filter(b => {
    const matchCat = category === 'all' || b.category === category;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <title>Blog – Dreama Academy</title>

      {/* Hero */}
      <section className="bg-hero pt-32 pb-16 text-white relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Blog & Tài liệu <span className="text-gradient">IELTS</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Kiến thức, kinh nghiệm và tips học IELTS từ chuyên gia Dreama Academy.
            </p>
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="blog-search-input"
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white text-navy pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-white border-b border-gray-100 sticky top-[72px] z-30">
        <div className="container-custom py-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`blog-category-${cat}`}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${category === cat ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary hover:bg-gray-200'}`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog grid */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-5 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((blog, i) => (
                <motion.article
                  key={blog.id}
                  id={`blog-page-card-${blog.id}`}
                  className="card-hover group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="relative overflow-hidden">
                    <img src={blog.thumbnail} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="badge bg-primary text-white">{blog.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                      <span className="flex items-center gap-1"><FaClock className="text-primary" />{blog.readTime} phút đọc</span>
                      <span className="flex items-center gap-1"><FaEye className="text-blue-400" />{blog.views.toLocaleString('vi-VN')}</span>
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                    <h2 className="font-display font-bold text-navy text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h2>
                    <p className="text-sm text-text-secondary line-clamp-3 mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <img src={blog.author.avatar} alt={blog.author.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-xs font-semibold text-navy">{blog.author.name}</span>
                      </div>
                      <Link to={`/blog/${blog.slug}`} id={`blog-page-read-${blog.id}`} className="text-xs font-semibold text-primary hover:underline">
                        Đọc thêm →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
