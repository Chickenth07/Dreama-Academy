import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/Home/HomePage';
import CoursesPage from '../pages/Courses/CoursesPage';
import CourseDetail from '../pages/Courses/CourseDetail';
import AboutPage from '../pages/About/AboutPage';
import BlogPage from '../pages/Blog/BlogPage';
import BlogDetail from '../pages/Blog/BlogDetail';
import ContactPage from '../pages/Contact/ContactPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/khoa-hoc" element={<CoursesPage />} />
          <Route path="/khoa-hoc/:slug" element={<CourseDetail />} />
          <Route path="/ve-chung-toi" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/lien-he" element={<ContactPage />} />
        </Route>
        {/* Auth routes (no layout) */}
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
