import { User, Testimonial, Teacher, Contact } from '../models/User.js';
import bcrypt from 'bcryptjs';

// GET /api/users/testimonials
export const getTestimonials = async (_req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/users/teachers
export const getTeachers = async (_req, res) => {
  try {
    const teachers = await Teacher.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/users/contact
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Họ tên, email và số điện thoại là bắt buộc',
      });
    }

    // Lưu vào MongoDB
    const contact = await Contact.create({ name, email, phone, course, message });
    console.log(`[Contact] New inquiry from ${name} (${phone}) - ${course || 'general'}`);

    res.json({
      success: true,
      message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.',
      data: { id: contact._id },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/users/register
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, course } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }

    // Kiểm tra email tồn tại
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email này đã được đăng ký' });
    }

    // Tạo user mới (password sẽ được hash tự động qua pre-save hook)
    const user = await User.create({
      name,
      email,
      phone,
      password,
      interestedCourse: course || '',
    });

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công! Chào mừng bạn đến với Dreama Academy.',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email đã tồn tại' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/users/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu' });
    }

    // Lấy user cùng với password (select: false nên phải thêm .select)
    const user = await User.findOne({ email, isActive: true }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }

    // Kiểm tra password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }

    // Trong production: tạo JWT token thực sự
    const token = Buffer.from(`${user._id}:${Date.now()}`).toString('base64');

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
