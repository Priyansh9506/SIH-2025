import React from 'react';
import { clsx } from 'clsx';

interface GlowingCardProps {
  children: React.ReactNode;
  glowColor?: 'purple' | 'green' | 'blue' | 'orange' | 'red' | 'gray';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  onClick?: () => void;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({ 
  children, 
  glowColor = 'green',
  intensity = 'medium',
  className,
  onClick 
}) => {
  const glowStyles = {
    green: {
      low: 'shadow-green-500/10 border-green-500/20',
      medium: 'shadow-green-500/20 border-green-500/30 shadow-lg',
      high: 'shadow-green-500/30 border-green-500/40 shadow-xl'
    },
    blue: {
      low: 'shadow-blue-500/10 border-blue-500/20',
      medium: 'shadow-blue-500/20 border-blue-500/30 shadow-lg',
      high: 'shadow-blue-500/30 border-blue-500/40 shadow-xl'
    },
    purple: {
      low: 'shadow-purple-500/10 border-purple-500/20',
      medium: 'shadow-purple-500/20 border-purple-500/30 shadow-lg',
      high: 'shadow-purple-500/30 border-purple-500/40 shadow-xl'
    },
    orange: {
      low: 'shadow-orange-500/10 border-orange-500/20',
      medium: 'shadow-orange-500/20 border-orange-500/30 shadow-lg',
      high: 'shadow-orange-500/30 border-orange-500/40 shadow-xl'
    },
    red: {
      low: 'shadow-red-500/10 border-red-500/20',
      medium: 'shadow-red-500/20 border-red-500/30 shadow-lg',
      high: 'shadow-red-500/30 border-red-500/40 shadow-xl'
    },
    gray: {
      low: 'shadow-gray-500/10 border-gray-500/20',
      medium: 'shadow-gray-500/20 border-gray-500/30 shadow-lg',
      high: 'shadow-gray-500/30 border-gray-500/40 shadow-xl'
    }
  };

  return (
    <div 
      className={clsx(
        'rounded-lg border bg-gray-900/50 backdrop-blur-sm p-6 transition-all duration-300 hover:scale-[1.02]',
        glowStyles[glowColor][intensity],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
