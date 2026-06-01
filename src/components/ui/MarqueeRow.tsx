// File: src/components/ui/MarqueeRow.tsx
'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';

interface MarqueeRowProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export default function MarqueeRow({
  items,
  direction = 'left',
  speed = 'medium',
  className = '',
}: MarqueeRowProps) {
  const prefersReduced = useReducedMotion();

  // Seamless infinite loop requires exact array duplication
  const duplicatedItems = [...items, ...items];

  // If prefers reduced motion, pause movement entirely to prevent vestibulopathic discomfort
  const animationClass = prefersReduced
    ? ''
    : `marquee-inner direction-${direction} speed-${speed}`;

  return (
    <div className={`w-full overflow-hidden select-none ${className}`}>
      <div className={animationClass}>
        {duplicatedItems.map((item, index) => (
          <div key={`${item}-${index}`} className="inline-flex items-center">
            {/* Spaced item text */}
            <span className="font-display text-[clamp(28px,4.5vw,56px)] font-extralight tracking-wide text-[var(--text-primary)]">
              {item}
            </span>
            {/* Amber dot separator */}
            <span className="text-[var(--accent)] font-bold text-[clamp(24px,4.5vw,48px)] px-12" aria-hidden="true">
              ·
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
