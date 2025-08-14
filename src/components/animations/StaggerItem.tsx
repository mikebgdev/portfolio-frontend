import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const StaggerItem = ({ 
  children, 
  className = '',
  direction = 'up'
}: StaggerItemProps) => {
  const directionOffset = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 }
  };

  const item = {
    hidden: { 
      opacity: 0, 
      ...directionOffset[direction]
    },
    show: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={item}
    >
      {children}
    </motion.div>
  );
};

export default StaggerItem;