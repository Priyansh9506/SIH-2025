import React from 'react';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: 'active' | 'idle' | 'maintenance' | 'blocked' | 'on-time' | 'delayed' | 'warning';
  text?: string;
  pulse?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  text, 
  pulse = false,
  className 
}) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
      case 'on-time':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'delayed':
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'maintenance':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'blocked':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'idle':
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      getStatusStyles(status),
      pulse && 'animate-pulse',
      className
    )}>
      <span className={clsx(
        'w-2 h-2 rounded-full mr-1.5',
        status === 'active' || status === 'on-time' ? 'bg-green-400' :
        status === 'delayed' || status === 'warning' ? 'bg-yellow-400' :
        status === 'maintenance' ? 'bg-orange-400' :
        status === 'blocked' ? 'bg-red-400' : 'bg-gray-400'
      )} />
      {text || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
