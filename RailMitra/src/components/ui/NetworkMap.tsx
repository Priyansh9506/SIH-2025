import React from 'react';
import { Train as TrainIcon, Circle, Square } from 'lucide-react';
import { Section, Train } from '../../types';
import { StatusBadge } from './StatusBadge';

interface NetworkMapProps {
  sections: Section[];
  trains: Train[];
}

export const NetworkMap: React.FC<NetworkMapProps> = ({ sections, trains }) => {
  const getTrainsInSection = (sectionName: string) => {
    return trains.filter(train => train.currentSection === sectionName);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 min-h-[400px] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38e07b" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Network Sections */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Circle className="h-5 w-5 text-railflow-primary" />
          Live Network Map
        </h3>

        {/* Main Railway Line */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-1 bg-gradient-to-r from-railflow-primary to-blue-500 flex-1 rounded-full relative">
            {/* Railway markers */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 transform -translate-y-1/2 w-2 h-6 bg-gray-600"
                style={{ left: `${i * 10 + 5}%` }}
              />
            ))}
          </div>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sections.map((section, index) => {
            const sectionTrains = getTrainsInSection(section.name);
            return (
              <div
                key={section.id}
                className="relative group"
              >
                {/* Section Node */}
                <div className="bg-gray-800 rounded-lg p-4 border-2 border-gray-700 hover:border-railflow-primary transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <Square className={`h-6 w-6 ${
                      section.status === 'active' ? 'text-green-500' :
                      section.status === 'maintenance' ? 'text-orange-500' :
                      section.status === 'blocked' ? 'text-red-500' :
                      'text-gray-500'
                    }`} />
                    <StatusBadge status={section.status} />
                  </div>
                  
                  <h4 className="text-white font-medium text-sm mb-1">{section.name}</h4>
                  <p className="text-xs text-gray-400">Capacity: {section.capacity}</p>
                  
                  {/* Trains in section */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {sectionTrains.map((train) => (
                      <div
                        key={train.id}
                        className="flex items-center gap-1 bg-railflow-primary/20 text-railflow-primary px-1.5 py-0.5 rounded text-xs"
                        title={`${train.number} - ${train.destination}`}
                      >
                        <TrainIcon className="h-3 w-3" />
                        <span>{train.number}</span>
                      </div>
                    ))}
                    {sectionTrains.length === 0 && (
                      <span className="text-xs text-gray-500">Empty</span>
                    )}
                  </div>
                </div>

                {/* Connection Lines */}
                {index < sections.length - 1 && (
                  <div className="absolute top-1/2 -right-2 w-4 h-0.5 bg-railflow-primary/50 transform -translate-y-1/2 hidden lg:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Maintenance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Idle</span>
          </div>
        </div>
      </div>
    </div>
  );
};
