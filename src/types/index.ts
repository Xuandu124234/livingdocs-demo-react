/**
 * Shared domain types for the dashboard.
 */

/**
 * A single metric rendered as a card.
 */
export interface Metric {
  label: string;
  value: number;
  trend?: 'up' | 'down';
  delta?: number;
}

/**
 * The payload returned by the dashboard statistics endpoint.
 */
export interface DashboardStats {
  activeUsers: number;
  openIssues: number;
  deploysThisWeek: number;
  errorRate: number;
}

/**
 * The severity of a monitoring alert.
 */
export type AlertSeverity = 'info' | 'warning' | 'critical';

/**
 * The severity of a notification.
 */
export type NotificationSeverity = 'info' | 'warning' | 'critical';
