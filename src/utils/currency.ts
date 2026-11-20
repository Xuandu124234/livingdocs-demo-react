/**
 * Format a number as a currency string.
 *
 * @see formatPercent
 */
export function formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

/**
 * Format a ratio (0..1) as a percentage string.
 *
 * @see formatCurrency
 */
export function formatPercent(ratio: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'percent' }).format(ratio);
}

/**
 * Clamp a number into the given inclusive range.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
