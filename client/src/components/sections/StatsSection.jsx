import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Học viên đã tốt nghiệp', value: 10000, suffix: '+', icon: '🎓', color: 'text-primary' },
  { label: 'Tỷ lệ đạt mục tiêu', value: 96.8, suffix: '%', icon: '🎯', color: 'text-green-500' },
  { label: 'Giảng viên chuyên nghiệp', value: 50, suffix: '+', icon: '👨‍🏫', color: 'text-blue-500' },
  { label: 'Năm kinh nghiệm', value: 8, suffix: '+', icon: '⭐', color: 'text-gold' },
  { label: 'Cơ sở tại Hà Nội', value: 5, suffix: '', icon: '📍', color: 'text-purple-500' },
];

const useCountUp = (target, duration = 2000, start = false, isDecimal = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      setCount(isDecimal ? +(eased * target).toFixed(1) : Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, isDecimal]);

  return count;
};

const StatCard = ({ stat, delay, inView }) => {
  const count = useCountUp(stat.value, 2000, inView, !Number.isInteger(stat.value));

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="text-4xl mb-3">{stat.icon}</div>
      <div className={`text-4xl md:text-5xl font-display font-bold mb-2 ${stat.color}`}>
        {count}{stat.suffix}
      </div>
      <p className="text-sm md:text-base text-text-secondary font-medium">{stat.label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary-gradient" />
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-navy/5 blur-3xl" />

      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} delay={i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
