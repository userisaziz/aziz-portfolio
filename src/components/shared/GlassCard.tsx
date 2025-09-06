import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  onClick?: () => void;
  as?: 'div' | 'section' | 'article' | 'aside';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md',
  rounded = 'xl',
  onClick,
  as: Component = 'div'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl'
  };

  const baseClasses = cn(
    'glass-card',
    paddingClasses[padding],
    roundedClasses[rounded],
    hover && 'hover:shadow-elevated transition-all duration-300',
    onClick && 'cursor-pointer',
    className
  );

  if (onClick) {
    return (
      <motion.div
        className={baseClasses}
        onClick={onClick}
        whileHover={hover ? { scale: 1.02 } : undefined}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Component className={baseClasses}>
      {children}
    </Component>
  );
};

export default GlassCard;