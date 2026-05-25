import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ==================== USER SCHEMA ====================
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // không trả về password khi query
    },
    phone: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: '',
    },
    interestedCourse: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash password trước khi save
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method kiểm tra password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);

// ==================== TESTIMONIAL SCHEMA ====================
const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, default: '' },
    score: { type: String, required: true },
    targetScore: { type: String, required: true },
    course: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    university: { type: String, default: '' },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// ==================== TEACHER SCHEMA ====================
const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    score: { type: String, required: true },
    avatar: { type: String, default: '' },
    experience: { type: String, default: '' },
    specialties: [{ type: String }],
    courses: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    rating: { type: Number, default: 5.0 },
    bio: { type: String, default: '' },
    social: {
      facebook: { type: String, default: '' },
      linkedin: { type: String, default: '' },
    },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

const Teacher = mongoose.model('Teacher', teacherSchema);

// ==================== CONTACT SCHEMA ====================
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    course: { type: String, default: '' },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'enrolled', 'closed'],
      default: 'pending',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true, versionKey: false }
);

const Contact = mongoose.model('Contact', contactSchema);

// ==================== SEED DATA ====================
export const seedTestimonials = [
  { name: 'Nguyễn Thị Bích Ngọc', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', score: '7.5', targetScore: '6.5', course: 'IELTS Intensive', content: 'Mình đã học tại Dreama Academy và đạt được 7.5 IELTS sau 3 tháng học cấp tốc. Giảng viên rất tận tâm, phương pháp giảng dạy hiệu quả và sát với đề thi thực tế.', rating: 5, university: 'Đại học Ngoại thương' },
  { name: 'Trần Văn Nam', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', score: '8.0', targetScore: '7.0', course: 'IELTS Elite 1-1', content: 'Chương trình học 1-1 của Dreama Academy thực sự đặc biệt. Được thiết kế riêng cho mình, giảng viên rất giỏi và nhiệt tình. Mình đã vượt mục tiêu và đạt 8.0!', rating: 5, university: 'Scholarship to UK' },
  { name: 'Lê Thị Mai Anh', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', score: '6.5', targetScore: '6.0', course: 'IELTS Foundation', content: 'Từ mức 0 tiếng Anh, sau 6 tháng tại Dreama Academy mình đã đạt 6.5 IELTS. Phương pháp dạy rất dễ hiểu, giảng viên luôn sẵn sàng hỗ trợ bất kỳ lúc nào.', rating: 5, university: 'Đại học Bách khoa HN' },
  { name: 'Phạm Hữu Đức', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', score: '7.0', targetScore: '6.5', course: 'IELTS Online', content: 'Học online tại Dreama Academy rất tiện lợi cho người đi làm như mình. Chất lượng học không thua kém offline, hệ thống học liệu phong phú và có thể review lại bất cứ lúc nào.', rating: 4, university: 'FPT Software' },
  { name: 'Vũ Thị Hương Giang', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face', score: '6.0', targetScore: '5.5', course: 'Tiếng Anh Mất Gốc Online', content: 'Mình không biết gì về tiếng Anh khi đăng ký học. Sau 6 tháng, mình đã có thể giao tiếp tự tin và đạt IELTS 6.0. Cảm ơn Dreama Academy rất nhiều!', rating: 5, university: 'Học viên tự do' },
  { name: 'Ngô Thanh Tùng', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', score: '7.5', targetScore: '7.0', course: 'Tiếng Anh Doanh nghiệp', content: 'Khóa Business English đã thay đổi sự nghiệp của mình. Từ khi học xong, mình tự tin hơn trong các cuộc họp quốc tế và thăng chức trong 3 tháng.', rating: 5, university: 'Vingroup' },
];

export const seedTeachers = [
  { name: 'Ms. Nguyễn Thị Lan', title: 'IELTS Examiner & Senior Instructor', score: 'IELTS 8.5', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face', experience: '10+ năm', specialties: ['IELTS Writing', 'IELTS Reading', 'Academic English'], courses: 3, students: 2500, rating: 4.95, bio: 'Ms. Lan có hơn 10 năm kinh nghiệm giảng dạy IELTS với nhiều học viên đạt band 7.0+ mỗi khóa.', social: { facebook: '#', linkedin: '#' }, order: 1 },
  { name: 'Mr. Trần Minh Tuấn', title: 'Band 9 IELTS Expert', score: 'IELTS 9.0', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', experience: '8+ năm', specialties: ['IELTS Speaking', 'IELTS Listening', 'Pronunciation'], courses: 2, students: 1800, rating: 4.98, bio: 'Mr. Tuấn là một trong số ít giảng viên đạt band 9.0 IELTS tại Việt Nam, chuyên gia về kỹ năng Speaking.', social: { facebook: '#', linkedin: '#' }, order: 2 },
  { name: 'Dr. Lê Văn Hùng', title: 'PhD in Applied Linguistics', score: 'IELTS 9.0', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', experience: '15+ năm', specialties: ['IELTS Elite', 'Academic Writing', 'Research Skills'], courses: 1, students: 600, rating: 5.0, bio: 'Tiến sĩ ngôn ngữ học ứng dụng với hơn 15 năm giảng dạy tại các trường đại học quốc tế.', social: { facebook: '#', linkedin: '#' }, order: 3 },
  { name: 'Ms. Phạm Thu Hà', title: 'Online Education Specialist', score: 'IELTS 8.0', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', experience: '7+ năm', specialties: ['IELTS Online', 'E-Learning', 'Curriculum Design'], courses: 2, students: 5200, rating: 4.85, bio: 'Ms. Hà chuyên về giảng dạy online với phương pháp sáng tạo, giúp hàng ngàn học viên học hiệu quả từ xa.', social: { facebook: '#', linkedin: '#' }, order: 4 },
];

export { User, Testimonial, Teacher, Contact };
export default User;
