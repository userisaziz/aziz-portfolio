import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  animate?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  as: Component = 'span',
  animate = false
}) => {
  const baseClasses = cn('gradient-text', className);

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{
          duration: 3,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      >
        <Component>{children}</Component>
      </motion.div>
    );
  }

  return <Component className={baseClasses}>{children}</Component>;
};

export default GradientText;