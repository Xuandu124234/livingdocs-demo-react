/**
 * Hook that loads dashboard statistics from the API.
 */
import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../services/ApiClient';

export interface DashboardStats {
  activeUsers: number;
  openIssues: number;
  deploysThisWeek: number;
  errorRate: number;
  p95LatencyMs: number;
}

export function useDashboardStats(): {
  stats: DashboardStats | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
} {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [nonce, setNonce] = useState<number>(0);

  const refresh = useCallback(() => {
    setNonce((value) => value + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiClient
      .get<DashboardStats>('/dashboard/stats')
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [nonce]);

  return { stats, loading, error, refresh };
}
