import React, { useState } from 'react';
import { Menu, Train, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { SearchBar } from './SearchBar';

export const Header: React.FC = () => {
  const { setSidebarOpen, sidebarOpen, user } = useStore();
  const location = useLocation();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="relative flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-800 px-6 py-4 md:px-10 bg-gray-950">
      {/* Logo Section */}
      <div className="flex items-center gap-4 text-white min-w-0">
        <img src="/train-logo.svg" alt="RailMitra Logo" className="h-8 w-8 flex-shrink-0" />
        <h2 className="text-white text-xl font-bold tracking-tight">RailMitra</h2>
      </div>
      
      {/* Navigation Section */}
      <nav className="hidden lg:flex items-center gap-6 mx-8">
        <Link 
          to="/dashboard"
          className={`text-sm font-medium transition-colors whitespace-nowrap ${
            isActive('/dashboard') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Control Center
        </Link>
        <Link 
          to="/sections"
          className={`text-sm font-medium transition-colors whitespace-nowrap ${
            isActive('/sections') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Railway Network
        </Link>
        <Link 
          to="/analytics"
          className={`text-sm font-medium transition-colors whitespace-nowrap ${
            isActive('/analytics') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Performance Analytics
        </Link>
        <Link 
          to="/optimization"
          className={`text-sm font-medium transition-colors whitespace-nowrap ${
            isActive('/optimization') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Smart Optimization
        </Link>
        <Link 
          to="/simulation"
          className={`text-sm font-medium transition-colors whitespace-nowrap ${
            isActive('/simulation') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Traffic Simulation
        </Link>
      </nav>
      
      {/* Search and User Section */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="hidden md:block w-64">
          <SearchBar 
            placeholder="Search trains, sections..."
            className="w-full"
          />
        </div>
        
        <button 
          className="md:hidden text-white flex-shrink-0"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <Search className="h-6 w-6" />
        </button>
        
        <button 
          className="lg:hidden text-white flex-shrink-0"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gray-600 flex items-center justify-center flex-shrink-0">
          {user?.avatar ? (
            <img src={user.avatar} alt="User" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-white text-sm font-medium">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </span>
          )}
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="absolute top-full left-0 right-0 bg-gray-950 border-b border-gray-800 px-6 py-4 md:hidden">
          <SearchBar 
            placeholder="Search trains, sections..."
            className="w-full"
          />
        </div>
      )}
    </header>
  );
};
