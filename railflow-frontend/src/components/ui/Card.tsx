import React from 'react';
import { clsx } from 'clsx';
import { AnimatedCounter } from './AnimatedCounter';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className,
  padding = 'md',
  hover = false
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={clsx(
      'rounded-lg border border-gray-800 bg-gray-900/80 backdrop-blur-sm transition-all duration-300',
      hover && 'hover:border-railflow-primary/50 hover:shadow-lg hover:shadow-railflow-primary/10 hover:scale-[1.02]',
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
  animated?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  unit,
  change,
  icon,
  animated = true,
  className 
}) => {
  const numericValue = typeof value === 'string' ? parseInt(value) || 0 : value;

  return (
    <Card hover className={clsx('flex flex-col gap-3 relative overflow-hidden', className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-railflow-primary/5 to-transparent opacity-50" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-base font-medium text-gray-300">{title}</p>
          {icon && (
            <div className="p-2 rounded-lg bg-railflow-primary/20">
              {icon}
            </div>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-white">
            {animated && typeof value === 'number' ? (
              <AnimatedCounter value={numericValue} />
            ) : (
              value
            )}
            {unit && <span className="text-lg text-gray-400 ml-1">{unit}</span>}
          </div>
          {change && (
            <div className={clsx(
              'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full',
              change.type === 'increase' 
                ? 'text-green-400 bg-green-500/20' 
                : 'text-red-400 bg-red-500/20'
            )}>
              <span className="text-lg">{change.type === 'increase' ? '↗' : '↘'}</span>
              <span>{Math.abs(change.value)}%</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
