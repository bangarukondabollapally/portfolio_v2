// File: src/lib/animations/utils.ts

/**
 * Calculates a progressive animation delay.
 * Useful for list elements, grid cascades, or marquee staggers.
 */
export function getStaggerDelay(index: number, baseStagger = 0.08, baseDelay = 0): number {
  return baseDelay + index * baseStagger;
}
