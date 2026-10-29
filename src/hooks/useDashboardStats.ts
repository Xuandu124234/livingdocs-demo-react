/**
 * Hook that loads dashboard statistics from the API.
 */
import { useEffect, useState } from 'react';
import { apiClient } from '../services/ApiClient';

export interface DashboardStats {
  activeUsers: number;
  openIssues: number;
  deploysThisWeek: number;
}

export function useDashboardStats(): { stats: DashboardStats | null; loading: boolean; error: Error | null } {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
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
  }, []);

  return { stats, loading, error };
}
