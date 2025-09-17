import React from 'react';
import { Shield } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-railflow-dark flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative">
            <Shield className="h-20 w-20 text-railflow-primary animate-pulse-glow" />
            <div className="absolute inset-0 h-20 w-20 text-railflow-primary/30 animate-ping">
              <Shield className="h-full w-full" />
            </div>
          </div>
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white animate-fade-in">RailFlow</h1>
          <p className="text-railflow-text animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Initializing Train Traffic Control System...
          </p>
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <LoadingSpinner size="lg" />
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-railflow-primary to-blue-500 rounded-full animate-pulse" 
                 style={{ width: '70%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
