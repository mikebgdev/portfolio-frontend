import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScaleOnHoverProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

const ScaleOnHover = ({ 
  children, 
  className = '',
  scale = 1.05,
  duration = 0.2
}: ScaleOnHoverProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale,
        transition: { duration }
      }}
      whileTap={{ scale: scale * 0.95 }}
    >
      {children}
    </motion.div>
  );
};

export default ScaleOnHover;