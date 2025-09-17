import React from 'react';
import { Train, Users, Activity, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card, StatCard } from '../components/ui/Card';
import { AlertsTable } from '../components/ui/AlertsTable';
import { NotificationsList } from '../components/ui/NotificationsList';
import { CustomLineChart } from '../components/charts/LineChart';
import { CustomBarChart } from '../components/charts/BarChart';
import { ProgressBar } from '../components/charts/ProgressBar';
import { TrainCard } from '../components/ui/TrainCard';
import { NetworkMap } from '../components/ui/NetworkMap';
import { LiveDataFeed } from '../components/ui/LiveDataFeed';
import { GlowingCard } from '../components/ui/GlowingCard';
import { StatusBadge } from '../components/ui/StatusBadge';

export const Dashboard: React.FC = () => {
  const { 
    kpis, 
    alerts, 
    notifications, 
    sections,
    trains,
    resolveAlert, 
    markNotificationRead 
  } = useStore();

  // Mock data for charts
  const punctualityData = [
    { name: 'Mon', value: 92 },
    { name: 'Tue', value: 95 },
    { name: 'Wed', value: 88 },
    { name: 'Thu', value: 96 },
    { name: 'Fri', value: 94 },
    { name: 'Sat', value: 97 },
    { name: 'Sun', value: 95 },
  ];

  const delayData = [
    { name: 'Mon', value: 18 },
    { name: 'Tue', value: 12 },
    { name: 'Wed', value: 22 },
    { name: 'Thu', value: 8 },
    { name: 'Fri', value: 15 },
    { name: 'Sat', value: 6 },
    { name: 'Sun', value: 10 },
  ];

  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 bg-gray-950 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-gray-400">
            Real-time summaries of network status and key performance indicators.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Network Status */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Network Status</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Trains"
                value={kpis.totalTrains}
                icon={<Train className="h-5 w-5 text-railflow-primary" />}
                change={{ value: 3, type: 'increase' }}
              />
              <StatCard
                title="Active Sections"
                value={kpis.activeSections}
                icon={<Activity className="h-5 w-5 text-green-500" />}
                change={{ value: 2, type: 'increase' }}
              />
              <StatCard
                title="Idle Sections"
                value={kpis.idleSections}
                icon={<Clock className="h-5 w-5 text-gray-500" />}
              />
              <StatCard
                title="System Health"
                value="98.5%"
                icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
                change={{ value: 0.5, type: 'increase' }}
              />
            </div>
          </section>

          {/* Key Performance Indicators */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Key Performance Indicators (KPIs)
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {/* Punctuality Chart */}
              <GlowingCard glowColor="green" intensity="medium" className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-medium text-gray-300">Punctuality</p>
                    <p className="text-3xl font-bold text-white">{kpis.punctuality}%</p>
                  </div>
                  <StatusBadge status="on-time" text="+2%" />
                </div>
                <CustomLineChart 
                  data={punctualityData} 
                  color="#38e07b"
                  height={192}
                />
              </GlowingCard>

              {/* Average Delay Chart */}
              <GlowingCard glowColor="orange" intensity="medium" className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-medium text-gray-300">Average Delay</p>
                    <p className="text-3xl font-bold text-white">{kpis.averageDelay} min</p>
                  </div>
                  <StatusBadge status="warning" text="-5%" />
                </div>
                <CustomBarChart 
                  data={delayData} 
                  color="#f59e0b"
                  height={192}
                />
              </GlowingCard>

              {/* Throughput Progress Bars */}
              <GlowingCard glowColor="blue" intensity="medium" className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-medium text-gray-300">Throughput</p>
                    <p className="text-3xl font-bold text-white">{kpis.throughput} trains/hr</p>
                  </div>
                  <StatusBadge status="active" text="+10%" />
                </div>
                <div className="grid gap-2 h-48 overflow-y-auto">
                  {sections.map((section) => (
                    <ProgressBar
                      key={section.id}
                      label={section.name}
                      value={section.throughput}
                      maxValue={100}
                      color="#38e07b"
                    />
                  ))}
                </div>
              </GlowingCard>
            </div>
          </section>

          {/* Live Network Map */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="h-6 w-6 text-railflow-primary" />
              Live Network Overview
            </h2>
            <NetworkMap sections={sections} trains={trains} />
          </section>

          {/* Active Trains & Live Data */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Train className="h-6 w-6 text-railflow-primary" />
                  Active Trains
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trains.slice(0, 4).map((train) => (
                    <TrainCard key={train.id} train={train} />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Live Data</h2>
                <LiveDataFeed />
              </div>
            </div>
          </section>

          {/* Critical Alerts */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              Critical Alerts
            </h2>
            <AlertsTable 
              alerts={alerts.filter(alert => !alert.resolved)} 
              onResolveAlert={resolveAlert}
            />
          </section>

          {/* Notifications & Alerts History */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Notifications &amp; Alerts History
            </h2>
            <NotificationsList 
              notifications={notifications.slice(0, 4)} 
              onMarkRead={markNotificationRead}
            />
          </section>
        </div>
      </div>
    </main>
  );
};
