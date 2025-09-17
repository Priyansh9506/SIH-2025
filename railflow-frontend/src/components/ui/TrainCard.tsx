import React from 'react';
import { Train as TrainIcon, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Train } from '../../types';
import { StatusBadge } from './StatusBadge';
import { GlowingCard } from './GlowingCard';

interface TrainCardProps {
  train: Train;
  onClick?: () => void;
}

export const TrainCard: React.FC<TrainCardProps> = ({ train, onClick }) => {
  const getGlowColor = (status: Train['status']) => {
    switch (status) {
      case 'on-time': return 'green';
      case 'delayed': return 'orange';
      case 'maintenance': return 'red';
      default: return 'blue';
    }
  };

  return (
    <GlowingCard 
      glowColor={getGlowColor(train.status)}
      intensity="medium"
      className="cursor-pointer hover:shadow-2xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-railflow-primary/20">
            <TrainIcon className="h-6 w-6 text-railflow-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{train.number}</h3>
            <p className="text-sm text-gray-400">Train ID: {train.id}</p>
          </div>
        </div>
        <StatusBadge status={train.status} pulse={train.status === 'delayed'} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-300">
          <MapPin className="h-4 w-4 text-railflow-primary" />
          <span className="text-sm">Current: {train.currentSection}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300">
          <TrainIcon className="h-4 w-4 text-railflow-primary" />
          <span className="text-sm">Destination: {train.destination}</span>
        </div>

        {train.delay && (
          <div className="flex items-center gap-2 text-orange-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Delayed by {train.delay} minutes</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Last Updated: 2 min ago</span>
          <button className="text-xs text-railflow-primary hover:text-railflow-secondary">
            View Details
          </button>
        </div>
      </div>
    </GlowingCard>
  );
};
