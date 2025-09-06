import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { AnimationVariants } from '@/types';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  staggerChildren?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
  staggerChildren = 0.1,
  direction = 'up',
  distance = 30
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  const getVariants = (): AnimationVariants => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren,
          type: 'spring',
          stiffness: 100
        }
      }
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { ...baseVariants.hidden, y: distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case 'down':
        return {
          hidden: { ...baseVariants.hidden, y: -distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case 'left':
        return {
          hidden: { ...baseVariants.hidden, x: distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case 'right':
        return {
          hidden: { ...baseVariants.hidden, x: -distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial=\"hidden\"
      animate={inView ? \"visible\" : \"hidden\"}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;