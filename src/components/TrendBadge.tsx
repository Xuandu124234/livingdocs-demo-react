/**
 * TrendBadge renders a small badge showing the direction of a metric.
 */
export interface TrendBadgeProps {
  direction: 'up' | 'down' | 'flat';
  label?: string;
  size?: 'small' | 'medium' | 'large';
}

export function TrendBadge({ direction, label, size = 'medium' }: TrendBadgeProps) {
  return (
    <span
      className={`trend-badge trend-badge--${direction} trend-badge--${size}`}
      title={label ?? direction}
    >
      {label ?? direction}
    </span>
  );
}
