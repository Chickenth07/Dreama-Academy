import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from '../ui/Notification';
import { useApp } from '../../context/AppContext';

const Layout = () => {
  const { notification } = useApp();
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1" role="main">
        <Outlet />
      </main>
      <Footer />
      {notification && <Notification notification={notification} />}
    </div>
  );
};

export default Layout;
