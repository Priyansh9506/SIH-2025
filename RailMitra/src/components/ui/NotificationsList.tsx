import React from 'react';
import { clsx } from 'clsx';
import { Notification } from '../../types';
import { Card } from './Card';
import { AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';

interface NotificationsListProps {
  notifications: Notification[];
  onMarkRead?: (notificationId: string) => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({ 
  notifications, 
  onMarkRead 
}) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-3 w-3" />;
      case 'warning':
        return <AlertCircle className="h-3 w-3" />;
      case 'success':
        return <CheckCircle className="h-3 w-3" />;
      case 'info':
      default:
        return <Info className="h-3 w-3" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return 'bg-red-500 text-red-400';
      case 'warning':
        return 'bg-yellow-500 text-yellow-400';
      case 'success':
        return 'bg-green-500 text-green-400';
      case 'info':
      default:
        return 'bg-blue-500 text-blue-400';
    }
  };

  return (
    <Card>
      <ul className="space-y-6">
        {notifications.map((notification, index) => (
          <li key={notification.id} className="relative pl-8">
            {index < notifications.length - 1 && (
              <div className="absolute left-0 top-1.5 h-full w-px bg-gray-700"></div>
            )}
            <div className={clsx(
              'absolute left-[-4px] top-1.5 h-3 w-3 rounded-full flex items-center justify-center',
              getNotificationColor(notification.type)
            )}>
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex items-center justify-between">
              <p className={clsx(
                'text-sm font-medium',
                getNotificationColor(notification.type).split(' ')[1]
              )}>
                {notification.title}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">{notification.timestamp}</p>
                {!notification.read && onMarkRead && (
                  <button
                    onClick={() => onMarkRead(notification.id)}
                    className="text-xs text-railflow-primary hover:text-railflow-secondary"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-300">{notification.message}</p>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-800 px-6 py-4 text-center mt-6 -mx-6 -mb-6">
        <a className="text-sm font-medium text-railflow-primary hover:text-railflow-secondary" href="#history">
          View All History
        </a>
      </div>
    </Card>
  );
};
