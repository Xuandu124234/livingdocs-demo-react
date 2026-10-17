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
    { label: 'Users', value: 1242, trend: 'up' },
    { label: 'Revenue', value: 8421, trend: 'up' },
    { label: 'Errors', value: 3, trend: 'down' },
  ];

  return (
    <div className="dashboard">
      {stats.map((s) => <StatCard key={s.label} {...s} />)}
    </div>
  );
}
