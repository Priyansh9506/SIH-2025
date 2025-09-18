import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  maxValue = 100,
  color = '#38e07b',
  className
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className={clsx('grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2', className)}>
      <p className="text-xs font-medium text-gray-400">{label}</p>
      <div className="h-2 w-full rounded-full bg-gray-700">
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};
