import { motion } from 'framer-motion';
import ContactSection from '../../components/sections/ContactSection';

const milestones = [
  { year: '2016', title: 'Thành lập Dreama Academy', desc: 'Ra đời với sứ mệnh mang lại cơ hội IELTS cho mọi học viên Việt Nam.' },
  { year: '2018', title: 'Mở rộng lên 3 cơ sở', desc: 'Sau 2 năm, mở thêm 2 cơ sở tại Hà Nội với hơn 500 học viên.' },
  { year: '2020', title: 'Ra mắt nền tảng Online', desc: 'Đầu tư hệ thống học online với công nghệ AI hỗ trợ học tập.' },
  { year: '2022', title: 'Đạt 5,000 học viên', desc: 'Cột mốc 5,000 học viên thành công với tỷ lệ đạt 95%.' },
  { year: '2024', title: '10,000+ học viên', desc: 'Top 1 trung tâm IELTS tại Hà Nội với hơn 10,000 học viên tin tưởng.' },
];

const values = [
  { icon: '🎯', title: 'Cam kết đầu ra', desc: 'Chúng tôi không chỉ dạy – chúng tôi cam kết kết quả.' },
  { icon: '💡', title: 'Đổi mới sáng tạo', desc: 'Liên tục cập nhật phương pháp giảng dạy và công nghệ.' },
  { icon: '❤️', title: 'Tận tâm với học viên', desc: 'Mỗi học viên là một hành trình đặc biệt.' },
  { icon: '🌟', title: 'Chất lượng vượt trội', desc: 'Giảng viên IELTS 8.5+, tài liệu học cập nhật liên tục.' },
];

const AboutPage = () => {
  return (
    <>
      <title>Về chúng tôi – Dreama Academy</title>

      {/* Hero */}
      <section className="bg-hero pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-5">
              <span className="font-semibold text-sm">🏫 Về chúng tôi</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-5">
              Câu chuyện <span className="text-gradient">Dreama Academy</span>
            </h1>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Từ một lớp học nhỏ 20 học viên năm 2016, Dreama Academy đã trở thành trung tâm IELTS hàng đầu Hà Nội với hơn 10,000 học viên thành công.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section id="ve-chung-toi" className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-5">
                <span className="text-primary font-semibold text-sm">🎯 Sứ mệnh</span>
              </div>
              <h2 className="section-title mb-5">
                Biến ước mơ IELTS thành{' '}
                <span className="text-gradient">hiện thực</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                Dreama Academy ra đời với một niềm tin đơn giản: mọi người đều có thể chinh phục IELTS nếu có phương pháp đúng và sự đồng hành tận tâm.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Chúng tôi không chỉ dạy ngôn ngữ – chúng tôi xây dựng sự tự tin, mở ra cơ hội và đồng hành cùng học viên trên từng bước tiến.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: '10,000+', l: 'Học viên tin tưởng' },
                  { v: '96.8%', l: 'Tỷ lệ đạt mục tiêu' },
                  { v: '50+', l: 'Giảng viên chuyên nghiệp' },
                  { v: '8+', l: 'Năm kinh nghiệm' },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center p-4 rounded-2xl bg-gray-50">
                    <p className="text-3xl font-display font-bold text-gradient">{v}</p>
                    <p className="text-sm text-text-secondary">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=500&fit=crop"
                alt="Dreama Academy"
                className="rounded-3xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Giá trị cốt lõi</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="text-center p-6 bg-white rounded-2xl shadow-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display font-bold text-navy mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="co-so" className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="section-title">Hành trình phát triển</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className={`p-6 rounded-2xl bg-gray-50 hover:shadow-card transition-shadow ${i % 2 !== 0 ? '' : ''}`}>
                      <span className="text-primary font-bold text-2xl font-display">{m.year}</span>
                      <h3 className="font-display font-bold text-navy text-xl mt-1 mb-2">{m.title}</h3>
                      <p className="text-text-secondary text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-primary text-white items-center justify-center font-bold flex-shrink-0 relative z-10 shadow-primary">
                    {i + 1}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
};

export default AboutPage;
