import React from 'react';
import { clsx } from 'clsx';
import { Alert } from '../../types';
import { Card } from './Card';

interface AlertsTableProps {
  alerts: Alert[];
  onResolveAlert?: (alertId: string) => void;
}

export const AlertsTable: React.FC<AlertsTableProps> = ({ alerts, onResolveAlert }) => {
  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-900/50 text-red-400 ring-red-500/20';
      case 'medium':
        return 'bg-yellow-900/50 text-yellow-400 ring-yellow-500/20';
      case 'low':
        return 'bg-blue-900/50 text-blue-400 ring-blue-500/20';
      default:
        return 'bg-gray-900/50 text-gray-400 ring-gray-500/20';
    }
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-950/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Alert ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Timestamp
              </th>
              {onResolveAlert && (
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {alerts.map((alert) => (
              <tr key={alert.id} className={clsx(alert.resolved && 'opacity-50')}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                  {alert.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span className={clsx(
                    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                    getSeverityColor(alert.severity)
                  )}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {alert.section}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {alert.description}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {alert.timestamp}
                </td>
                {onResolveAlert && (
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {!alert.resolved && (
                      <button
                        onClick={() => onResolveAlert(alert.id)}
                        className="text-railflow-primary hover:text-railflow-secondary font-medium"
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
