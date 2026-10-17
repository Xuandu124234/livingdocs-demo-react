/**
 * Format a date as a human-readable string.
 *
 * @see formatRelative
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
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
