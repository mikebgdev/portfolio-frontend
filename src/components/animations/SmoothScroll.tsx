import { motion } from 'framer-motion';

interface SmoothScrollProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

const SmoothScroll = ({ to, children, className = '', offset = 80 }: SmoothScrollProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const target = document.querySelector(to);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.a
      href={to}
      className={className}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

export default SmoothScroll;