// File: src/components/ui/MagneticButton.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { springs } from '@/lib/animations/springs';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  magnetStrength?: number;
  magnetRadius?: number;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  magnetStrength = 0.4,
  magnetRadius = 80,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  // Motion values for physical coordinates translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics config
  const springX = useSpring(x, springs.magnetic);
  const springY = useSpring(y, springs.magnetic);

  useEffect(() => {
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      // Distance from mouse to button center
      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < magnetRadius) {
        // Attract toward mouse coordinates
        x.set(distanceX * magnetStrength);
        y.set(distanceY * magnetStrength);
        if (!isHovered) setIsHovered(true);
      } else {
        // Snap back to resting position
        x.set(0);
        y.set(0);
        if (isHovered) setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isHovered, magnetRadius, magnetStrength, x, y, prefersReduced]);

  const buttonStyle = {
    x: prefersReduced ? 0 : springX,
    y: prefersReduced ? 0 : springY,
  };

  const commonClassNames = `
    inline-flex items-center justify-center 
    px-8 py-4 
    border border-[var(--border)] 
    bg-transparent text-[var(--text-primary)] 
    font-technical-meta text-[13px] font-bold tracking-[0.05em] uppercase 
    transition-colors duration-300
    hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)]
    focus:outline-none focus-visible:outline-none
    ${className}
  `.trim();

  // Set sharp layout corners
  const inlineStyle = { borderRadius: 0 };

  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick as any}
        className={commonClassNames}
        style={{ ...buttonStyle, ...inlineStyle }}
        whileTap={prefersReduced ? {} : { scale: 0.97 }}
        transition={springs.snappy}
        data-cursor="magnetic"
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={commonClassNames}
      style={{ ...buttonStyle, ...inlineStyle }}
      whileTap={prefersReduced ? {} : { scale: 0.97 }}
      transition={springs.snappy}
      data-cursor="magnetic"
    >
      {children}
    </motion.button>
  );
}
