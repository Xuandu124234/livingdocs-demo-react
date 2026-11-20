import React from 'react';

/**
 * TrendBadge renders a small badge showing the direction of a metric.
 */
export interface TrendBadgeProps {
  direction: 'up' | 'down' | 'flat';
  label?: string;
}

export function TrendBadge({ direction, label }: TrendBadgeProps) {
  return (
    <span className={`trend-badge trend-badge--${direction}`} title={label ?? direction}>
      {label ?? direction}
    </span>
  );
}
