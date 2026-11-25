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
  limit?: number;
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
    if (filter.limit) {
      params.limit = String(filter.limit);
    }
    return apiClient.get<Notification[]>(this.basePath, params);
  }

  /**
   * Read one notification by its id.
   */
  async get(id: string): Promise<Notification> {
    return apiClient.get<Notification>(`${this.basePath}/${id}`);
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

  /**
   * Delete one notification.
   */
  async remove(id: string): Promise<void> {
    await apiClient.delete<void>(`${this.basePath}/${id}`);
  }
}

export const notificationService = new NotificationService();
