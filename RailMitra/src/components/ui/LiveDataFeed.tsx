import React, { useEffect, useState } from 'react';
import { Activity, Zap, Wifi } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface LiveDataPoint {
  timestamp: string;
  value: number;
  label: string;
}

export const LiveDataFeed: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<LiveDataPoint[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDataPoint: LiveDataPoint = {
        timestamp: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 100) + 50,
        label: 'Network Load'
      };
      
      setDataPoints(prev => [newDataPoint, ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-railflow-primary" />
          <h3 className="text-white font-medium">Live Data Feed</h3>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className={`h-4 w-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
          <span className={`text-xs ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {dataPoints.map((point, index) => (
          <div
            key={`${point.timestamp}-${index}`}
            className="flex items-center justify-between p-2 bg-gray-800 rounded animate-fade-in"
          >
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-300">{point.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <AnimatedCounter 
                value={point.value} 
                className="text-sm font-mono text-railflow-primary"
              />
              <span className="text-xs text-gray-500">{point.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
