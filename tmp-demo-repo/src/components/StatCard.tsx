import React from 'react';

/**
 * StatCard component renders a single statistic card on the dashboard.
 *
 * @see StatItem
 * @example
 *   <StatCard label="Users" value={42} />
 */
export interface StatItem {
  label: string;
  value: number;
  trend?: 'up' | 'down';
}

export function StatCard({ label, value, trend }: StatItem) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {trend && <span className={`stat-trend-${trend}`} />}
    </div>
  );
}
