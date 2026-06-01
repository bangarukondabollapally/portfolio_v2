// File: src/lib/utils.ts

/**
 * Merges class names dynamically.
 * A lightweight, zero-dependency alternative to clsx/tailwind-merge.
 */
export function cn(...classes: (string | undefined | null | boolean | { [key: string]: any })[]): string {
  const result: string[] = [];

  for (const c of classes) {
    if (!c) continue;

    if (typeof c === 'string') {
      result.push(c);
    } else if (typeof c === 'object') {
      for (const [key, value] of Object.entries(c)) {
        if (value) {
          result.push(key);
        }
      }
    }
  }

  return result.join(' ');
}
