import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { useStore } from '../store/useStore';
import { Card, StatCard } from '../components/ui/Card';
import { Train, MapPin, Activity, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

export const SectionControl: React.FC = () => {
  usePageTitle('Railway Network');
  
  const { sections, trains, updateSectionStatus } = useStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 text-green-100';
      case 'idle':
        return 'bg-gray-500 text-gray-100';
      case 'maintenance':
        return 'bg-yellow-500 text-yellow-100';
      case 'blocked':
        return 'bg-red-500 text-red-100';
      default:
        return 'bg-gray-500 text-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="h-4 w-4" />;
      case 'idle':
        return <MapPin className="h-4 w-4" />;
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 bg-gray-950 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Section View & Control
          </h1>
          <p className="mt-2 text-gray-400">
            Monitor and control individual track sections in real-time.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Section Overview */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Section Overview</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Sections"
                value={sections.length}
              />
              <StatCard
                title="Active Sections"
                value={sections.filter(s => s.status === 'active').length}
              />
              <StatCard
                title="Idle Sections"
                value={sections.filter(s => s.status === 'idle').length}
              />
              <StatCard
                title="Under Maintenance"
                value={sections.filter(s => s.status === 'maintenance').length}
              />
            </div>
          </section>

          {/* Section Grid */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Section Status</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => (
                <Card key={section.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{section.name}</h3>
                    <div className={clsx(
                      'flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
                      getStatusColor(section.status)
                    )}>
                      {getStatusIcon(section.status)}
                      {section.status.charAt(0).toUpperCase() + section.status.slice(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Capacity</p>
                      <p className="text-xl font-bold text-white">{section.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Throughput</p>
                      <p className="text-xl font-bold text-white">{section.throughput}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Current Trains</p>
                    <div className="flex flex-wrap gap-2">
                      {trains
                        .filter(train => train.currentSection === section.name)
                        .map(train => (
                          <div
                            key={train.id}
                            className="flex items-center gap-1 bg-railflow-primary/20 text-railflow-primary px-2 py-1 rounded text-xs"
                          >
                            <Train className="h-3 w-3" />
                            {train.number}
                          </div>
                        ))}
                      {trains.filter(train => train.currentSection === section.name).length === 0 && (
                        <span className="text-gray-500 text-sm">No trains</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateSectionStatus(section.id, 'active')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => updateSectionStatus(section.id, 'maintenance')}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                    >
                      Maintenance
                    </button>
                    <button
                      onClick={() => updateSectionStatus(section.id, 'blocked')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                    >
                      Block
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Network Map Placeholder */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Network Map</h2>
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Interactive Network Map</p>
                <p className="text-gray-500 text-sm">Visual representation of all sections and train positions</p>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
};
