import React, { useState } from 'react';
import { Plus, Settings, Bell, HelpCircle, X } from 'lucide-react';
import { clsx } from 'clsx';

export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Settings, label: 'Settings', color: 'text-gray-400 hover:text-white' },
    { icon: Bell, label: 'Notifications', color: 'text-yellow-400 hover:text-yellow-300' },
    { icon: HelpCircle, label: 'Help', color: 'text-blue-400 hover:text-blue-300' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={clsx(
        'flex flex-col gap-3 mb-4 transition-all duration-300',
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}>
        {actions.map((action, index) => (
          <button
            key={action.label}
            className={clsx(
              'flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-full shadow-lg transition-all duration-200 group',
              action.color
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <action.icon className="h-5 w-5" />
            <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'w-14 h-14 bg-railflow-primary hover:bg-railflow-secondary rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group',
          'hover:shadow-railflow-primary/30 hover:shadow-xl',
          isOpen && 'rotate-45'
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-railflow-dark" />
        ) : (
          <Plus className="h-6 w-6 text-railflow-dark" />
        )}
      </button>
    </div>
  );
};
