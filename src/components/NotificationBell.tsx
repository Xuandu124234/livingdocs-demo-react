import React, { useEffect, useState } from 'react';
import {
  Notification,
  NotificationSeverity,
  notificationService,
} from '../services/NotificationService';

/**
 * NotificationBell shows the unread notifications of the workspace.
 */
export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [severity, setSeverity] = useState<NotificationSeverity | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    notificationService
      .list({ unreadOnly: true, severity })
      .then((data) => {
        if (!cancelled) setNotifications(data);
      })
      .catch(() => {
        if (!cancelled) setNotifications([]);
      });
    return () => {
      cancelled = true;
    };
  }, [severity]);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="notification-bell">
      <span className="notification-count">{unread}</span>
      <button
        type="button"
        onClick={() => setSeverity(severity === 'critical' ? undefined : 'critical')}
      >
        {severity ?? 'all'}
      </button>
    </div>
  );
}
