import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export default function ScrollReveal({
  children,
  id,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6
}: ScrollRevealProps) {
  const directions = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { x: 35, y: 0 },
    right: { x: -35, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialVariant = {
    opacity: 0,
    ...directions[direction]
  };

  return (
    <motion.div
      id={id}
      className={className}
      initial={initialVariant}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Beautiful exponential easeOut (easeOutExpo-like)
      }}
    >
      {children}
    </motion.div>
  );
}
