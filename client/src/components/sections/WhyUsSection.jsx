import { motion } from 'framer-motion';

const features = [
  {
    icon: '🎯',
    title: 'Cam kết đầu ra',
    description: 'Học cho đến khi đạt điểm mục tiêu. Hoàn tiền 100% nếu không đạt cam kết sau khóa học.',
    color: 'from-red-50 to-orange-50',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    delay: 0,
  },
  {
    icon: '👨‍🏫',
    title: 'Giảng viên IELTS 8.5+',
    description: '100% giảng viên đạt IELTS 8.5+, được đào tạo bài bản và có kinh nghiệm giảng dạy trên 5 năm.',
    color: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    delay: 0.1,
  },
  {
    icon: '📋',
    title: 'Lộ trình cá nhân hóa',
    description: 'Mỗi học viên được xây dựng lộ trình học tập riêng dựa trên trình độ đầu vào và mục tiêu.',
    color: 'from-green-50 to-emerald-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    delay: 0.2,
  },
  {
    icon: '📊',
    title: 'Theo dõi tiến độ học',
    description: 'Hệ thống theo dõi tiến độ học tập theo thời gian thực. Giảng viên và phụ huynh có thể xem trực tiếp.',
    color: 'from-purple-50 to-pink-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    delay: 0.3,
  },
  {
    icon: '🧪',
    title: 'Mock Test định kỳ',
    description: 'Thi thử hàng tuần với đề thi thật từ Cambridge, British Council, IDP. Feedback chi tiết từng câu.',
    color: 'from-yellow-50 to-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    delay: 0.4,
  },
  {
    icon: '📱',
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ hỗ trợ học viên 24/7 qua app, fanpage và hotline. Chưa hiểu bài có thể hỏi ngay.',
    color: 'from-cyan-50 to-sky-50',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    delay: 0.5,
  },
];

const WhyUsSection = () => {
  return (
    <section id="why-us-section" className="section bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-navy/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/10 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-navy font-semibold text-sm">⭐ Đặc quyền học viên</span>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Tại sao chọn{' '}
            <span className="text-gradient">Dreama Academy?</span>
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Chúng tôi không chỉ dạy IELTS – chúng tôi cam kết đồng hành cùng bạn đến khi chạm đến mục tiêu.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} border border-white group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
              id={`why-us-card-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className={`font-display font-bold text-lg text-navy mb-3 ${feature.iconColor} group-hover:text-primary transition-colors`}>
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          className="mt-16 bg-hero rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl" />
          </div>
          <div className="relative z-10">
            <p className="text-primary font-semibold mb-3">🎁 Ưu đãi đặc biệt</p>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Nhận tư vấn lộ trình IELTS <span className="text-gradient">MIỄN PHÍ</span>
            </h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Đặt lịch tư vấn ngay hôm nay. Chuyên gia IELTS sẽ phân tích trình độ và đưa ra lộ trình phù hợp nhất cho bạn.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:0901234567" id="why-us-phone-btn" className="btn btn-primary btn-lg">
                📞 Gọi ngay: 0901 234 567
              </a>
              <a href="/lien-he" id="why-us-contact-btn" className="btn btn-ghost btn-lg">
                Đặt lịch tư vấn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
