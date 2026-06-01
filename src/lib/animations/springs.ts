// File: src/lib/animations/springs.ts

export const springs = {
  gentle: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 100,
    mass: 1,
  },
  snappy: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 200,
    mass: 1,
  },
  cinematic: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 80,
    mass: 1,
  },
  magnetic: {
    type: 'spring' as const,
    damping: 12,
    stiffness: 150,
    mass: 0.5,
  },
  slow: {
    type: 'spring' as const,
    damping: 30,
    stiffness: 60,
    mass: 1.5,
  }
};
