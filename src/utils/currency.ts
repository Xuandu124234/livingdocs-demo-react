/**
 * Format a number as a currency string.
 *
 * @see formatPercent
 * @see formatCompactCurrency
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

/**
 * Format a large currency amount in a compact form (e.g. "$1.2M").
 *
 * @see formatCurrency
 */
export function formatCompactCurrency(value: number, currency = 'USD'): string {
  const symbol = currency === 'USD' ? '$' : '';
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${symbol}${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${symbol}${(value / 1_000).toFixed(1)}K`;
  return formatCurrency(value, currency);
}
