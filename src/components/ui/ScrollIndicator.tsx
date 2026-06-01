// File: src/components/ui/ScrollIndicator.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface ScrollIndicatorProps {
  hideAfter?: number;
}

export default function ScrollIndicator({ hideAfter = 100 }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > hideAfter) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideAfter]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none"
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 80,
            delay: 1.05,
          }}
        >
          {/* Subtle pulsating text */}
          <motion.span
            className="font-micro-print text-[10px] text-[var(--text-secondary)] tracking-[0.2em] uppercase"
            animate={prefersReduced ? { opacity: 0.8 } : { opacity: [1, 0.4, 1] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}
          >
            Scroll Down
          </motion.span>

          {/* Animated vertical track */}
          <div className="w-[1px] h-8 bg-[var(--border)] overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 bg-[var(--accent)]"
              animate={prefersReduced ? { y: 0 } : { y: ['-100%', '200%'] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
