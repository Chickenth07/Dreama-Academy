import mongoose from 'mongoose';

// ==================== BLOG SCHEMA ====================
const blogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    thumbnail: {
      type: String,
      default: '',
    },
    author: {
      name: { type: String, required: true },
      avatar: { type: String, default: '' },
      bio: { type: String, default: '' },
    },
    readTime: {
      type: Number,
      default: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes (chỉ index các field chưa có unique: true)
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ isFeatured: 1, publishedAt: -1 });
blogSchema.index({ category: 1 });

const Blog = mongoose.model('Blog', blogSchema);

// ==================== SEED DATA ====================
export const seedBlogs = [
  {
    slug: 'kinh-nghiem-on-thi-ielts-7-0',
    title: 'Kinh nghiệm ôn thi IELTS đạt 7.0 trong 3 tháng',
    excerpt: 'Chia sẻ lộ trình học tập chi tiết giúp bạn đạt band 7.0 IELTS chỉ trong 3 tháng với phương pháp học thông minh.',
    content: 'Nhiều học viên hỏi mình làm thế nào để đạt 7.0 IELTS trong 3 tháng. Sự thật là không có con đường tắt, nhưng có con đường thông minh. Đây là lộ trình mình đã dùng...\n\nTháng 1: Xây dựng nền tảng - Tập trung vào ngữ pháp cơ bản, từ vựng theo chủ đề và kỹ năng đọc.\n\nTháng 2: Luyện kỹ năng - Tập trung vào Listening và Reading với đề thi thật.\n\nTháng 3: Thực chiến - Làm đề thi đầy đủ, chữa bài và điều chỉnh chiến thuật.',
    category: 'Kinh nghiệm học',
    tags: ['IELTS', 'Tips', 'Band 7'],
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop',
    author: { name: 'Nguyễn Minh Châu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face', bio: 'Học viên đạt IELTS 7.5' },
    readTime: 8,
    views: 15420,
    likes: 892,
    isFeatured: true,
    publishedAt: new Date('2024-12-15'),
  },
  {
    slug: 'top-5-sai-lam-khi-hoc-ielts',
    title: 'Top 5 sai lầm thường gặp khi ôn thi IELTS',
    excerpt: 'Phân tích 5 sai lầm phổ biến nhất khiến học viên thất bại trong kỳ thi IELTS và cách khắc phục hiệu quả.',
    content: 'Sau nhiều năm giảng dạy IELTS, mình nhận ra có 5 sai lầm mà hầu hết học viên đều mắc phải...\n\n1. Học từ vựng không có ngữ cảnh\n2. Bỏ qua kỹ năng Listening\n3. Không luyện tập với đề thi thật\n4. Viết mà không có feedback\n5. Coi nhẹ kỹ năng Speaking',
    category: 'Tips & Tricks',
    tags: ['IELTS', 'Sai lầm', 'Tips'],
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
    author: { name: 'Ms. Nguyễn Thị Lan', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face', bio: 'Giảng viên IELTS 8.5' },
    readTime: 6,
    views: 23100,
    likes: 1205,
    isFeatured: true,
    publishedAt: new Date('2024-12-20'),
  },
  {
    slug: 'phan-biet-ielts-academic-general',
    title: 'Phân biệt IELTS Academic và IELTS General Training',
    excerpt: 'Hiểu rõ sự khác biệt giữa hai loại chứng chỉ IELTS để chọn đúng kỳ thi phù hợp với mục đích của bạn.',
    content: 'IELTS Academic và IELTS General Training đều có chung phần Listening và Speaking, nhưng phần Reading và Writing khác nhau hoàn toàn...\n\nIELTS Academic: Dành cho du học, học bổng, nghiên cứu sinh.\nIELTS General Training: Dành cho định cư, làm việc ở nước ngoài.',
    category: 'Kiến thức',
    tags: ['IELTS', 'Academic', 'General'],
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    author: { name: 'Mr. Trần Minh Tuấn', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', bio: 'Band 9 IELTS Examiner' },
    readTime: 10,
    views: 18750,
    likes: 743,
    isFeatured: false,
    publishedAt: new Date('2024-12-28'),
  },
  {
    slug: 'cach-luyen-speaking-ielts-tai-nha',
    title: 'Cách luyện Speaking IELTS hiệu quả tại nhà',
    excerpt: 'Những phương pháp luyện nói IELTS tại nhà hiệu quả mà không cần đến trung tâm, phù hợp cho người bận rộn.',
    content: 'Speaking IELTS không cần phải học ở trung tâm mới giỏi được. Dưới đây là các phương pháp luyện tập tại nhà hiệu quả nhất...\n\n1. Nói chuyện với chính mình về các chủ đề IELTS thường gặp\n2. Dùng app như ELSA, Duolingo để luyện phát âm\n3. Xem video YouTube của người bản ngữ và bắt chước\n4. Ghi âm và tự chấm điểm bản thân',
    category: 'Kỹ năng',
    tags: ['IELTS', 'Speaking', 'Tự học'],
    thumbnail: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=400&fit=crop',
    author: { name: 'Ms. Phạm Thu Hà', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', bio: 'Online Education Expert' },
    readTime: 12,
    views: 31200,
    likes: 1876,
    isFeatured: true,
    publishedAt: new Date('2025-01-05'),
  },
  {
    slug: 'tu-vung-ielts-topic-environment',
    title: 'Từ vựng IELTS chủ đề Environment – 50+ từ phải biết',
    excerpt: 'Tổng hợp 50+ từ vựng IELTS về chủ đề Environment với ví dụ sử dụng trong Writing và Speaking.',
    content: 'Chủ đề Environment (Môi trường) là một trong những chủ đề phổ biến nhất trong IELTS. Dưới đây là 50+ từ vựng bạn cần biết...\n\n🌿 Danh từ quan trọng:\n- Climate change (biến đổi khí hậu)\n- Carbon footprint (dấu chân carbon)\n- Renewable energy (năng lượng tái tạo)\n- Biodiversity (đa dạng sinh học)\n- Deforestation (phá rừng)',
    category: 'Từ vựng',
    tags: ['IELTS', 'Vocabulary', 'Environment'],
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop',
    author: { name: 'Dr. Lê Văn Hùng', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', bio: 'PhD in Education' },
    readTime: 15,
    views: 8940,
    likes: 425,
    isFeatured: false,
    publishedAt: new Date('2025-01-12'),
  },
  {
    slug: 'lich-thi-ielts-2025',
    title: 'Lịch thi IELTS 2025 tại Hà Nội và TP.HCM',
    excerpt: 'Cập nhật lịch thi IELTS 2025 mới nhất tại các trung tâm ở Hà Nội và TP.HCM, kèm hướng dẫn đăng ký thi.',
    content: 'Lịch thi IELTS 2025 đã được công bố chính thức. Dưới đây là thông tin chi tiết về các ngày thi tại Hà Nội và TP.HCM...\n\n📅 Hà Nội (IDP Education)\nTháng 1: 11/01, 18/01, 25/01\nTháng 2: 08/02, 15/02, 22/02\n\n📅 TP.HCM (British Council)\nTháng 1: 10/01, 17/01, 24/01\nTháng 2: 07/02, 14/02, 21/02',
    category: 'Thông tin',
    tags: ['IELTS', 'Lịch thi', '2025'],
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    author: { name: 'Admin', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face', bio: 'Dreama Academy' },
    readTime: 5,
    views: 42800,
    likes: 2103,
    isFeatured: true,
    publishedAt: new Date('2025-01-20'),
  },
];

export default Blog;
