/**
 * Service that delivers dashboard notifications.
 */
import { apiClient } from './ApiClient';

export type NotificationSeverity = 'info' | 'warning' | 'critical';

export interface Notification {
  id: string;
  severity: NotificationSeverity;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationFilter {
  severity?: NotificationSeverity;
  unreadOnly?: boolean;
}

/**
 * NotificationService reads and mutates the notifications of a workspace.
 */
export class NotificationService {
  private basePath = '/notifications';

  /**
   * List the notifications that match the given filter.
   */
  async list(filter: NotificationFilter = {}): Promise<Notification[]> {
    const params: Record<string, string> = {};
    if (filter.severity) {
      params.severity = filter.severity;
    }
    if (filter.unreadOnly) {
      params.unreadOnly = 'true';
    }
    return apiClient.get<Notification[]>(this.basePath, params);
  }

  /**
   * Mark one notification as read.
   */
  async markAsRead(id: string): Promise<Notification> {
    return apiClient.post<Notification>(`${this.basePath}/${id}/read`, {});
  }

  /**
   * Mark every notification as read.
   */
  async markAllAsRead(): Promise<number> {
    const result = await apiClient.post<{ updated: number }>(
      `${this.basePath}/read-all`,
      {},
    );
    return result.updated;
  }
}

export const notificationService = new NotificationService();
