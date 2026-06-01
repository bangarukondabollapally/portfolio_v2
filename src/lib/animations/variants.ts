// File: src/lib/animations/variants.ts
import { springs } from './springs';

export const variants = {
  // Stagger Container
  staggerContainer: (staggerChildren = 0.08, delayChildren = 0) => ({
    initial: {},
    animate: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }),

  // Text Reveal (Slides up from behind a clipping overflow-hidden mask)
  maskReveal: {
    initial: { y: '101%' },
    animate: {
      y: '0%',
      transition: springs.cinematic,
    },
    exit: {
      y: '101%',
      transition: springs.snappy,
    }
  },

  // Secondary Content Entrance (Standard Fade Up)
  fadeUp: {
    initial: { opacity: 0, y: 28 },
    animate: (customDelay?: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...springs.gentle,
        ...(customDelay !== undefined ? { delay: customDelay } : {}),
      },
    }),
  },

  // Image and Visual Card Entrance
  scaleIn: {
    initial: { opacity: 0, scale: 0.92 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: springs.cinematic,
    },
  },

  // Subtle Separator or Decorative Entrance
  fadeIn: {
    initial: { opacity: 0 },
    animate: (customDelay?: number) => ({
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        ...(customDelay !== undefined ? { delay: customDelay } : {}),
      },
    }),
  },

  // Directional Split Columns
  slideInLeft: {
    initial: { opacity: 0, x: -32 },
    animate: {
      opacity: 1,
      x: 0,
      transition: springs.gentle,
    },
  },

  slideInRight: {
    initial: { opacity: 0, x: 32 },
    animate: {
      opacity: 1,
      x: 0,
      transition: springs.gentle,
    },
  },

  // Single Line Hero Text Reveal
  lineReveal: {
    initial: { y: '100%', opacity: 0 },
    animate: {
      y: '0%',
      opacity: 1,
      transition: springs.cinematic,
    },
  },
};
