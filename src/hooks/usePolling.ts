/**
 * Hook that polls the given endpoint every `intervalMs` milliseconds.
 */
import { useEffect, useState } from 'react';

export interface PollResult<T> {
  data: T | null;
  error: Error | null;
  polling: boolean;
  lastUpdatedAt: Date | null;
}

/**
 * usePolling repeatedly fetches data on a fixed interval. The interval
 * is cleared as soon as the component unmounts, so no request is left
 * running in the background.
 */
export function usePolling<T>(
  fetcher: () => Promise<T>,
  intervalMs = 30000,
): PollResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [polling, setPolling] = useState<boolean>(true);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const result = await fetcher();
        if (!cancelled) {
          setData(result);
          setError(null);
          setLastUpdatedAt(new Date());
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      }
    };
    void tick();
    const timer = setInterval(tick, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(timer);
      setPolling(false);
    };
  }, [intervalMs]);

  return { data, error, polling, lastUpdatedAt };
}
