import { useEffect, useState } from 'react';

/**
 * Debounce a value so it only updates after the given delay.
 *
 * @param value    the value to debounce
 * @param delayMs  how long to wait before the value is published
 */
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
