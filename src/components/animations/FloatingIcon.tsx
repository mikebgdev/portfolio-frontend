import { ReactNode } from 'react';

interface FloatingIconProps {
  children: ReactNode;
  className?: string;
  useCSS?: boolean;
}

const FloatingIcon = ({ 
  children, 
  className = '',
  useCSS = false
}: FloatingIconProps) => {
  const combinedClassName = useCSS 
    ? `${className} float-bounce`.trim()
    : className;

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export default FloatingIcon;