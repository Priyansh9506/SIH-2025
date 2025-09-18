import React, { useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { Play, Pause, RotateCcw, Settings, Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card, StatCard } from '../components/ui/Card';
import { GlowingCard } from '../components/ui/GlowingCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { CustomLineChart } from '../components/charts/LineChart';
import { CustomBarChart } from '../components/charts/BarChart';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

interface Scenario {
  id: string;
  name: string;
  description: string;
  type: 'peak_hour' | 'maintenance' | 'emergency' | 'weather' | 'custom';
  duration: number;
  status: 'ready' | 'running' | 'completed' | 'paused';
}

export const Simulation: React.FC = () => {
  usePageTitle('Traffic Simulation');
  const { sections, trains } = useStore();
  const [selectedScenario, setSelectedScenario] = useState<string>('peak_hour');
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const scenarios: Scenario[] = [
    {
      id: 'peak_hour',
      name: 'Peak Hour Rush',
      description: 'Simulate high traffic volume during morning rush hour',
      type: 'peak_hour',
      duration: 180,
      status: 'ready'
    },
    {
      id: 'maintenance',
      name: 'Scheduled Maintenance',
      description: 'Test network performance with Section C under maintenance',
      type: 'maintenance',
      duration: 120,
      status: 'ready'
    },
    {
      id: 'emergency',
      name: 'Emergency Response',
      description: 'Simulate emergency stop and rerouting procedures',
      type: 'emergency',
      duration: 60,
      status: 'ready'
    },
    {
      id: 'weather',
      name: 'Severe Weather',
      description: 'Test operations under adverse weather conditions',
      type: 'weather',
      duration: 240,
      status: 'ready'
    }
  ];

  const handleStartSimulation = () => {
    setSimulationStatus('running');
    setCurrentTime(0);
  };

  const handlePauseSimulation = () => {
    setSimulationStatus('paused');
  };

  const handleResetSimulation = () => {
    setSimulationStatus('idle');
    setCurrentTime(0);
  };

  const simulationData = [
    { name: '0min', throughput: 45, delay: 2, efficiency: 92 },
    { name: '30min', throughput: 62, delay: 5, efficiency: 88 },
    { name: '60min', throughput: 78, delay: 8, efficiency: 85 },
    { name: '90min', throughput: 85, delay: 12, efficiency: 82 },
    { name: '120min', throughput: 72, delay: 15, efficiency: 78 },
    { name: '150min', throughput: 58, delay: 10, efficiency: 85 },
  ];

  const getScenarioIcon = (type: string) => {
    switch (type) {
      case 'peak_hour':
        return <TrendingUp className="h-5 w-5 text-orange-500" />;
      case 'maintenance':
        return <Settings className="h-5 w-5 text-blue-500" />;
      case 'emergency':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'weather':
        return <Zap className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 bg-gray-950 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl flex items-center gap-3">
            <Play className="h-10 w-10 text-railflow-primary" />
            Scenario Analysis & Simulation
          </h1>
          <p className="mt-2 text-gray-400">
            Test and analyze different operational scenarios to optimize network performance.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Simulation Control Panel */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Simulation Control</h2>
            <GlowingCard glowColor="blue" intensity="medium">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <Play className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Simulation Engine</h3>
                    <p className="text-gray-400">Real-time scenario modeling</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <StatusBadge 
                    status={simulationStatus === 'running' ? 'active' : simulationStatus === 'paused' ? 'warning' : 'idle'} 
                    text={simulationStatus === 'running' ? 'Running' : simulationStatus === 'paused' ? 'Paused' : 'Ready'}
                    pulse={simulationStatus === 'running'}
                  />
                  
                  <div className="flex gap-2">
                    {simulationStatus === 'idle' ? (
                      <button
                        onClick={handleStartSimulation}
                        className="flex items-center gap-2 bg-railflow-primary hover:bg-railflow-secondary text-railflow-dark font-medium py-2 px-4 rounded transition-colors"
                      >
                        <Play className="h-4 w-4" />
                        Start Simulation
                      </button>
                    ) : simulationStatus === 'running' ? (
                      <button
                        onClick={handlePauseSimulation}
                        className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition-colors"
                      >
                        <Pause className="h-4 w-4" />
                        Pause
                      </button>
                    ) : (
                      <button
                        onClick={handleStartSimulation}
                        className="flex items-center gap-2 bg-railflow-primary hover:bg-railflow-secondary text-railflow-dark font-medium py-2 px-4 rounded transition-colors"
                      >
                        <Play className="h-4 w-4" />
                        Resume
                      </button>
                    )}
                    
                    <button
                      onClick={handleResetSimulation}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulation Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-white">{currentTime} / {scenarios.find(s => s.id === selectedScenario)?.duration || 0} minutes</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-railflow-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / (scenarios.find(s => s.id === selectedScenario)?.duration || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Speed Control */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Speed:</span>
                <div className="flex gap-2">
                  {[0.5, 1, 2, 4].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setSimulationSpeed(speed)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        simulationSpeed === speed
                          ? 'bg-railflow-primary text-railflow-dark'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </GlowingCard>
          </section>

          {/* Scenario Selection */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Available Scenarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {scenarios.map((scenario) => (
                <GlowingCard
                  key={scenario.id}
                  glowColor={selectedScenario === scenario.id ? 'green' : 'gray'}
                  intensity={selectedScenario === scenario.id ? 'medium' : 'low'}
                  onClick={() => setSelectedScenario(scenario.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    {getScenarioIcon(scenario.type)}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{scenario.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">{scenario.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Duration: {scenario.duration}min</span>
                        {selectedScenario === scenario.id && (
                          <StatusBadge status="active" text="Selected" />
                        )}
                      </div>
                    </div>
                  </div>
                </GlowingCard>
              ))}
            </div>
          </section>

          {/* Real-time Metrics */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Real-time Metrics</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Throughput"
                value="78"
                unit="trains/hr"
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                change={{ value: 12, type: 'increase' }}
              />
              <StatCard
                title="Average Delay"
                value="8.5"
                unit="minutes"
                icon={<Clock className="h-5 w-5 text-orange-500" />}
                change={{ value: 2.3, type: 'increase' }}
              />
              <StatCard
                title="Network Efficiency"
                value="85%"
                icon={<Zap className="h-5 w-5 text-blue-500" />}
                change={{ value: 3, type: 'decrease' }}
              />
              <StatCard
                title="Incidents"
                value="2"
                icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
                change={{ value: 1, type: 'increase' }}
              />
            </div>
          </section>

          {/* Simulation Results */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Simulation Results</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlowingCard glowColor="purple" intensity="medium">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Over Time</h3>
                <CustomLineChart 
                  data={simulationData.map(d => ({ name: d.name, value: d.efficiency }))}
                  color="#8b5cf6"
                  height={250}
                />
              </GlowingCard>

              <GlowingCard glowColor="orange" intensity="medium">
                <h3 className="text-lg font-semibold text-white mb-4">Throughput Analysis</h3>
                <CustomBarChart 
                  data={simulationData.map(d => ({ name: d.name, value: d.throughput }))}
                  color="#f59e0b"
                  height={250}
                />
              </GlowingCard>
            </div>
          </section>

          {/* Analysis Summary */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Analysis Summary</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <GlowingCard glowColor="green" intensity="low">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">92%</div>
                  <div className="text-sm text-gray-400">Peak Efficiency</div>
                </div>
              </GlowingCard>

              <GlowingCard glowColor="red" intensity="low">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">15min</div>
                  <div className="text-sm text-gray-400">Max Delay</div>
                </div>
              </GlowingCard>

              <GlowingCard glowColor="blue" intensity="low">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">85</div>
                  <div className="text-sm text-gray-400">Peak Throughput</div>
                </div>
              </GlowingCard>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
