import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const FadeInWhenVisible = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = 'up',
  className = ''
}: FadeInWhenVisibleProps) => {
  // Reduced animations for mobile to prevent overflow
  const directionOffset = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 15 },
    right: { y: 0, x: -15 }
  };

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;