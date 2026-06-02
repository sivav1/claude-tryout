/**
 * Format a number as a compact string: 1_400_000 → '1.4M', 8200 → '8.2K'
 */
export function compactNumber(value: number): string {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
  if (value >= 1_000)     return (value / 1_000).toFixed(1) + 'K';
  return String(value);
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a random hex colour (useful for dynamic chart datasets).
 */
export function randomHexColor(): string {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}
