import React, { useState } from 'react';
import { Brain, Zap, TrendingUp, Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card, StatCard } from '../components/ui/Card';
import { GlowingCard } from '../components/ui/GlowingCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { CustomLineChart } from '../components/charts/LineChart';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const Optimization: React.FC = () => {
  const { sections, trains } = useStore();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationStatus, setOptimizationStatus] = useState<'idle' | 'running' | 'completed'>('idle');

  const handleStartOptimization = () => {
    setIsOptimizing(true);
    setOptimizationStatus('running');
    
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizationStatus('completed');
    }, 3000);
  };

  const optimizationData = [
    { name: '00:00', value: 65 },
    { name: '04:00', value: 45 },
    { name: '08:00', value: 85 },
    { name: '12:00', value: 92 },
    { name: '16:00', value: 88 },
    { name: '20:00', value: 75 },
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Route Optimization',
      description: 'Redirect Train T002 through Section C to reduce congestion',
      impact: 'High',
      savings: '12 minutes',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Schedule Adjustment',
      description: 'Delay departure of Train T005 by 3 minutes to optimize flow',
      impact: 'Medium',
      savings: '8 minutes',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Maintenance Window',
      description: 'Schedule Section F maintenance during low traffic period',
      impact: 'Low',
      savings: '5 minutes',
      status: 'applied'
    }
  ];

  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 bg-gray-950 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl flex items-center gap-3">
            <Brain className="h-10 w-10 text-railflow-primary" />
            AI Optimization Engine
          </h1>
          <p className="mt-2 text-gray-400">
            Intelligent traffic flow optimization and predictive recommendations.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Control Panel */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Optimization Control</h2>
            <GlowingCard glowColor="purple" intensity="medium">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/20">
                    <Zap className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">AI Engine Status</h3>
                    <p className="text-gray-400">Real-time traffic optimization</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <StatusBadge 
                    status={optimizationStatus === 'running' ? 'active' : optimizationStatus === 'completed' ? 'on-time' : 'idle'} 
                    text={optimizationStatus === 'running' ? 'Optimizing' : optimizationStatus === 'completed' ? 'Completed' : 'Ready'}
                    pulse={optimizationStatus === 'running'}
                  />
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleStartOptimization}
                      disabled={isOptimizing}
                      className="flex items-center gap-2 bg-railflow-primary hover:bg-railflow-secondary disabled:opacity-50 text-railflow-dark font-medium py-2 px-4 rounded transition-colors"
                    >
                      {isOptimizing ? (
                        <>
                          <LoadingSpinner size="sm" color="text-railflow-dark" />
                          Optimizing...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Start Optimization
                        </>
                      )}
                    </button>
                    
                    <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors">
                      <Settings className="h-4 w-4" />
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            </GlowingCard>
          </section>

          {/* Performance Metrics */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Efficiency Gain"
                value="23.5%"
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                change={{ value: 5.2, type: 'increase' }}
              />
              <StatCard
                title="Time Saved"
                value="47 min"
                icon={<Zap className="h-5 w-5 text-blue-500" />}
                change={{ value: 12, type: 'increase' }}
              />
              <StatCard
                title="Fuel Efficiency"
                value="18.3%"
                icon={<Brain className="h-5 w-5 text-purple-500" />}
                change={{ value: 3.1, type: 'increase' }}
              />
              <StatCard
                title="Recommendations"
                value={recommendations.filter(r => r.status === 'pending').length}
                icon={<Settings className="h-5 w-5 text-orange-500" />}
              />
            </div>
          </section>

          {/* Optimization Chart */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Traffic Flow Optimization</h2>
            <GlowingCard glowColor="blue" intensity="medium">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Hourly Efficiency</h3>
                <StatusBadge status="active" text="Live Data" pulse />
              </div>
              <CustomLineChart 
                data={optimizationData}
                color="#3b82f6"
                height={300}
              />
            </GlowingCard>
          </section>

          {/* AI Recommendations */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">AI Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <GlowingCard 
                  key={rec.id}
                  glowColor={rec.status === 'applied' ? 'green' : 'orange'}
                  intensity="low"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{rec.title}</h3>
                        <StatusBadge 
                          status={rec.status === 'applied' ? 'on-time' : 'warning'}
                          text={rec.status === 'applied' ? 'Applied' : 'Pending'}
                        />
                      </div>
                      <p className="text-gray-300 mb-3">{rec.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">Impact: <span className="text-white">{rec.impact}</span></span>
                        <span className="text-gray-400">Time Savings: <span className="text-railflow-primary">{rec.savings}</span></span>
                      </div>
                    </div>
                    
                    {rec.status === 'pending' && (
                      <div className="flex gap-2">
                        <button className="bg-railflow-primary hover:bg-railflow-secondary text-railflow-dark font-medium py-2 px-4 rounded transition-colors">
                          Apply
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors">
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                </GlowingCard>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
