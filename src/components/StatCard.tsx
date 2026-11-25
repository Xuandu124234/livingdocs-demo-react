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
  delta?: number;
  suffix?: string;
  tooltip?: string;
}

export function StatCard({ label, value, trend, delta, suffix, tooltip }: StatItem) {
  const display = suffix ? `${value}${suffix}` : String(value);
  return (
    <div className="stat-card" title={tooltip}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{display}</span>
      {trend && <span className={`stat-trend-${trend}`} />}
      {delta !== undefined && (
        <span className={`stat-delta stat-delta--${delta >= 0 ? 'up' : 'down'}`}>
          {delta >= 0 ? '+' : ''}
          {delta}%
        </span>
      )}
    </div>
  );
}
