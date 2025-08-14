import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / totalHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-secondary/20 z-50"
      initial={{ scaleX: 0 }}
      style={{ originX: 0 }}
    >
      <motion.div
        className="h-full bg-secondary"
        style={{ scaleX: scrollProgress / 100, originX: 0 }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
};

export default ScrollIndicator;