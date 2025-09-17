import React from 'react';
import { useStore } from '../store/useStore';
import { Card, StatCard } from '../components/ui/Card';
import { CustomLineChart } from '../components/charts/LineChart';
import { CustomBarChart } from '../components/charts/BarChart';
import { ProgressBar } from '../components/charts/ProgressBar';
import { TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react';

export const Analytics: React.FC = () => {
  const { kpis, sections, trains } = useStore();

  // Mock analytics data
  const performanceData = [
    { name: 'Jan', value: 88 },
    { name: 'Feb', value: 92 },
    { name: 'Mar', value: 85 },
    { name: 'Apr', value: 94 },
    { name: 'May', value: 96 },
    { name: 'Jun', value: 91 },
    { name: 'Jul', value: 95 },
  ];

  const trafficData = [
    { name: '00:00', value: 45 },
    { name: '04:00', value: 23 },
    { name: '08:00', value: 89 },
    { name: '12:00', value: 76 },
    { name: '16:00', value: 92 },
    { name: '20:00', value: 67 },
  ];

  const delayAnalysis = [
    { name: 'Weather', value: 35 },
    { name: 'Maintenance', value: 28 },
    { name: 'Signal Issues', value: 22 },
    { name: 'Traffic', value: 15 },
  ];

  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 bg-gray-950 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Reporting & Analytics
          </h1>
          <p className="mt-2 text-gray-400">
            Comprehensive analysis of system performance and operational metrics.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Key Metrics */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Key Performance Metrics</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="System Efficiency"
                value="94.2%"
                change={{ value: 2.1, type: 'increase' }}
              />
              <StatCard
                title="On-Time Performance"
                value={`${kpis.punctuality}%`}
                change={{ value: 1.8, type: 'increase' }}
              />
              <StatCard
                title="Average Speed"
                value="68 km/h"
                change={{ value: 3.2, type: 'increase' }}
              />
              <StatCard
                title="Energy Efficiency"
                value="87%"
                change={{ value: 0.5, type: 'decrease' }}
              />
            </div>
          </section>

          {/* Performance Trends */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Performance Trends</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-railflow-primary" />
                  <h3 className="text-lg font-semibold text-white">Monthly Performance</h3>
                </div>
                <CustomLineChart 
                  data={performanceData}
                  color="#38e07b"
                  height={300}
                />
              </Card>

              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-railflow-primary" />
                  <h3 className="text-lg font-semibold text-white">Daily Traffic Pattern</h3>
                </div>
                <CustomBarChart 
                  data={trafficData}
                  color="#15803d"
                  height={300}
                />
              </Card>
            </div>
          </section>

          {/* Delay Analysis */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Delay Analysis</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="h-5 w-5 text-railflow-primary" />
                  <h3 className="text-lg font-semibold text-white">Delay Causes</h3>
                </div>
                <CustomBarChart 
                  data={delayAnalysis}
                  color="#dc2626"
                  height={300}
                />
              </Card>

              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-white">Section Performance</h3>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {sections.map((section) => (
                    <div key={section.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{section.name}</span>
                        <span className="text-white font-medium">{section.throughput}%</span>
                      </div>
                      <ProgressBar
                        label=""
                        value={section.throughput}
                        maxValue={100}
                        color={section.throughput > 80 ? '#38e07b' : section.throughput > 50 ? '#eab308' : '#dc2626'}
                        className="grid-cols-1"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* Operational Reports */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Operational Reports</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Daily Report</h3>
                <p className="text-gray-400 mb-4">Comprehensive daily operations summary</p>
                <button className="w-full bg-railflow-primary hover:bg-railflow-secondary text-railflow-dark font-medium py-2 px-4 rounded transition-colors">
                  Generate Report
                </button>
              </Card>

              <Card className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Weekly Analysis</h3>
                <p className="text-gray-400 mb-4">Weekly performance and trend analysis</p>
                <button className="w-full bg-railflow-primary hover:bg-railflow-secondary text-railflow-dark font-medium py-2 px-4 rounded transition-colors">
                  Generate Report
                </button>
              </Card>

              <Card className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Custom Report</h3>
                <p className="text-gray-400 mb-4">Create custom reports with specific metrics</p>
                <button className="w-full bg-railflow-primary hover:bg-railflow-secondary text-railflow-dark font-medium py-2 px-4 rounded transition-colors">
                  Create Report
                </button>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
