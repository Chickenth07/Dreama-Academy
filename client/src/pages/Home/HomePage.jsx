import HeroSection from '../../components/sections/HeroSection';
import StatsSection from '../../components/sections/StatsSection';
import CoursesSection from '../../components/sections/CoursesSection';
import WhyUsSection from '../../components/sections/WhyUsSection';
import TeachersSection from '../../components/sections/TeachersSection';
import TestimonialsSection from '../../components/sections/TestimonialsSection';
import BlogSection from '../../components/sections/BlogSection';
import ContactSection from '../../components/sections/ContactSection';

const HomePage = () => {
  return (
    <>
      <title>Dreama Academy – Trung tâm luyện thi IELTS hàng đầu Hà Nội</title>
      <meta name="description" content="Dreama Academy – Luyện thi IELTS thực chiến, cam kết đầu ra 7.0+. Hơn 10,000 học viên đã thành công." />
      <HeroSection />
      <StatsSection />
      <CoursesSection />
      <WhyUsSection />
      <TeachersSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
