import React from 'react';
import { Menu, Shield, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { SearchBar } from './SearchBar';

export const Header: React.FC = () => {
  const { setSidebarOpen, sidebarOpen, user } = useStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-800 px-6 py-4 md:px-10 bg-gray-950">
      <div className="flex items-center gap-4 text-white">
        <Shield className="h-8 w-8 text-railflow-primary" />
        <h2 className="text-white text-xl font-bold tracking-tight">RailFlow</h2>
      </div>
      
      <div className="flex items-center gap-6 flex-1 max-w-2xl mx-8">
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/dashboard"
            className={`text-sm font-medium transition-colors ${
              isActive('/dashboard') ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/sections"
            className={`text-sm font-medium transition-colors ${
              isActive('/sections') ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Network View
          </Link>
          <Link 
            to="/analytics"
            className={`text-sm font-medium transition-colors ${
              isActive('/analytics') ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Analytics
          </Link>
          <Link 
            to="/optimization"
            className={`text-sm font-medium transition-colors ${
              isActive('/optimization') ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            AI Engine
          </Link>
          <Link 
            to="/simulation"
            className={`text-sm font-medium transition-colors ${
              isActive('/simulation') ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Simulation
          </Link>
        </nav>
        
        <div className="flex-1 max-w-md">
          <SearchBar 
            placeholder="Search trains, sections..."
            className="w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gray-600 flex items-center justify-center">
          {user?.avatar ? (
            <img src={user.avatar} alt="User" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-white text-sm font-medium">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
