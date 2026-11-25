/**
 * Format a date as a human-readable string.
 *
 * @see formatRelative
 * @see formatTime
 */
export function formatDate(date: Date | string): string {
  const value = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(value.getTime())) {
    return 'Invalid date';
  }
  return value.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date relative to now (e.g. "2 hours ago").
 *
 * @see formatDate
 */
export function formatRelative(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `${diffMin} minutes ago`;
  return `${Math.floor(diffMin / 60)} hours ago`;
}

/**
 * Format the time of day of a date (e.g. "14:05").
 *
 * @see formatDate
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
