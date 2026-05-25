import Blog from '../models/Blog.js';

// GET /api/blogs
export const getAllBlogs = async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    const filter = { isPublished: true };

    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;

    let query = Blog.find(filter).sort({ publishedAt: -1 });
    if (limit) query = query.limit(parseInt(limit));

    const blogs = await query;
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/blogs/latest
export const getLatest = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(limit);
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/blogs/:id  (id hoặc slug)
export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let blog;

    const isObjectId = /^[a-f\d]{24}$/i.test(id);
    if (isObjectId) {
      blog = await Blog.findById(id);
    } else {
      blog = await Blog.findOne({ slug: id, isPublished: true });
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Bài viết không tồn tại' });
    }

    // Tăng lượt xem
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
