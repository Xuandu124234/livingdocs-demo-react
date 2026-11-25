import React from 'react';
import { StatCard, StatItem } from '../components/StatCard';

/**
 * DashboardPage displays key metrics using StatItem objects.
 *
 * @see StatItem
 * @see StatCard
 */
export function DashboardPage() {
  const stats: StatItem[] = [
    { label: 'Users', value: 1242, trend: 'up', delta: 8 },
    { label: 'Revenue', value: 8421, trend: 'up', delta: 3, suffix: ' USD' },
    { label: 'Errors', value: 3, trend: 'down', delta: -12 },
    { label: 'p95 latency', value: 240, trend: 'down', delta: -5, suffix: ' ms' },
  ];

  return (
    <div className="dashboard">
      {stats.map((s) => <StatCard key={s.label} {...s} />)}
    </div>
  );
}
