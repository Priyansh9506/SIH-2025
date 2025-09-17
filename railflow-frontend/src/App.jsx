import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import { Header } from './components/ui/Header';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { SectionControl } from './pages/SectionControl';
import { Analytics } from './pages/Analytics';
import { Optimization } from './pages/Optimization';
import { Simulation } from './pages/Simulation';
import { FloatingActionButton } from './components/ui/FloatingActionButton';

function App() {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Router>
      <div className="relative flex size-full min-h-screen flex-col bg-gray-950 text-gray-100 font-inter">
        <div className="layout-container flex h-full grow flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sections" element={<SectionControl />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/optimization" element={<Optimization />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <FloatingActionButton />
        </div>
      </div>
    </Router>
  );
}

export default App;
