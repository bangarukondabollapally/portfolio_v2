// File: src/components/layout/CustomCursor.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'interactive' | 'link' | 'magnetic' | 'none'>('default');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outline ring position with spring-lag (stiffness 200, damping 24)
  const ringX = useSpring(cursorX, { damping: 24, stiffness: 200 });
  const ringY = useSpring(cursorY, { damping: 24, stiffness: 200 });

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || prefersReduced) {
      return;
    }

    // Hide native cursor by adding visual class to body
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Watch active elements dynamically to adapt state
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, [data-cursor]');
      
      if (interactive) {
        const cursorType = interactive.getAttribute('data-cursor');
        if (cursorType === 'none') {
          setCursorState('none');
        } else if (cursorType === 'magnetic') {
          setCursorState('magnetic');
        } else if (cursorType === 'link' || interactive.tagName === 'A') {
          setCursorState('link');
        } else {
          setCursorState('interactive');
        }
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible, prefersReduced]);

  if (!mounted || prefersReduced) return null;

  // Configuration mapping based on state
  let ringSize = 0;
  let ringColor = 'var(--text-tertiary)';
  let ringOpacity = 0;
  let dotSize = 6;

  if (isVisible && cursorState !== 'none') {
    switch (cursorState) {
      case 'default':
        ringSize = 8;
        ringColor = 'var(--text-tertiary)';
        ringOpacity = 0.4;
        dotSize = 6;
        break;
      case 'interactive':
        ringSize = 42;
        ringColor = 'var(--text-primary)';
        ringOpacity = 0.8;
        dotSize = 4;
        break;
      case 'link':
        ringSize = 42;
        ringColor = 'var(--accent)';
        ringOpacity = 1.0;
        dotSize = 4;
        break;
      case 'magnetic':
        ringSize = 48;
        ringColor = 'var(--accent)';
        ringOpacity = 0.6;
        dotSize = 4;
        break;
      default:
        break;
    }
  }

  return (
    <>
      {/* Direct Dot - Direct position updates (zero spring lag) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-[var(--text-primary)] pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: dotSize,
          height: dotSize,
          opacity: isVisible && cursorState !== 'none' ? 1 : 0,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />

      {/* Lagged Ring - Smooth spring-interpolated track */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: ringColor,
          opacity: ringOpacity,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 200,
        }}
      />
    </>
  );
}
