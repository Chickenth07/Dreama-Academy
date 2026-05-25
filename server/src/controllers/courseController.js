import Course from '../models/Course.js';

// GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    const { mode, category, featured, popular, limit } = req.query;
    const filter = { isActive: true };

    if (mode) filter.mode = mode;
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (popular === 'true') filter.isPopular = true;

    let query = Course.find(filter).sort({ createdAt: -1 });
    if (limit) query = query.limit(parseInt(limit));

    const courses = await query;
    res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/courses/featured
export const getFeatured = async (_req, res) => {
  try {
    const courses = await Course.find({ isFeatured: true, isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/courses/popular
export const getPopular = async (_req, res) => {
  try {
    const courses = await Course.find({ isPopular: true, isActive: true }).sort({ students: -1 });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/courses/:id  (id có thể là MongoDB _id hoặc slug)
export const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    let course;

    // Kiểm tra nếu là ObjectId hợp lệ thì query bằng _id, ngược lại dùng slug
    const isObjectId = /^[a-f\d]{24}$/i.test(id);
    if (isObjectId) {
      course = await Course.findById(id);
    } else {
      course = await Course.findOne({ slug: id, isActive: true });
    }

    if (!course) {
      return res.status(404).json({ success: false, message: 'Khóa học không tồn tại' });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
