// File: src/components/ui/SectionLabel.tsx
'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionLabelProps {
  label: string;
  withDot?: boolean;
  className?: string;
}

export default function SectionLabel({
  label,
  withDot = false,
  className = '',
}: SectionLabelProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-2 select-none ${className}`}
    >
      {withDot && (
        <motion.span
          initial={prefersReduced ? { scale: 1 } : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 200,
            delay: 0.1,
          }}
          className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
        />
      )}
      <span className="font-technical-meta text-[11px] font-medium tracking-[0.2em] text-[var(--text-secondary)] uppercase">
        ({label})
      </span>
    </motion.div>
  );
}
