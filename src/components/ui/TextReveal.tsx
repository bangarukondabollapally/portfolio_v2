// File: src/components/ui/TextReveal.tsx
'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { variants } from '@/lib/animations/variants';

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export default function TextReveal({
  children,
  delay = 0,
  className = '',
  once = true,
  threshold = 0.15,
}: TextRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount: threshold }}
        transition={{ duration: 0.3, delay }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={`inline-block overflow-hidden ${className}`} style={{ verticalAlign: 'bottom' }}>
      <motion.span
        className="inline-block origin-bottom"
        variants={variants.maskReveal}
        initial="initial"
        whileInView="animate"
        viewport={{ once, amount: threshold }}
        transition={{ delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
