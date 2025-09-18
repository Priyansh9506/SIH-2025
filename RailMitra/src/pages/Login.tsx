import React, { useState, useEffect } from 'react';
import { Train, User, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { usePageTitle } from '../hooks/usePageTitle';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setAuthenticated } = useStore();
  
  usePageTitle('Login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would call an API
    if (username && password) {
      const mockUser = {
        id: '1',
        username: username,
        email: `${username}@railmitra.com`,
        role: 'admin' as const,
      };
      
      setUser(mockUser);
      setAuthenticated(true);
    }
  };

  return (
    <div className="min-h-screen bg-railflow-dark flex flex-col font-spline">
      <header className="flex items-center justify-between whitespace-nowrap px-10 py-5">
        <div className="flex items-center gap-3 text-white">
          <img src="/train-logo.svg" alt="RailMitra Logo" className="h-8 w-8" />
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
            RailMitra
          </h2>
        </div>
      </header>
      
      <div className="flex flex-1 items-center justify-center py-10 px-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-railflow-card p-10 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Welcome to RailMitra</h2>
            <p className="mt-2 text-sm text-railflow-text">
              Sign in to access the Smart Railway Management System
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-railflow-text" />
              <input
                className="w-full rounded-md border-0 bg-railflow-input py-4 pl-12 pr-4 text-white placeholder:text-railflow-text focus:outline-none focus:ring-2 focus:ring-railflow-primary focus:ring-opacity-50"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-railflow-text" />
              <input
                className="w-full rounded-md border-0 bg-railflow-input py-4 pl-12 pr-4 text-white placeholder:text-railflow-text focus:outline-none focus:ring-2 focus:ring-railflow-primary focus:ring-opacity-50"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div>
              <button
                className="flex w-full cursor-pointer items-center justify-center rounded-md bg-railflow-primary py-4 px-4 text-base font-bold text-railflow-dark transition-colors duration-300 hover:bg-railflow-secondary focus:outline-none focus:ring-2 focus:ring-railflow-primary focus:ring-opacity-50"
                type="submit"
              >
                <span className="truncate">Login</span>
              </button>
            </div>
            
            <div className="text-center">
              <a
                className="text-sm font-medium text-railflow-text hover:text-railflow-primary hover:underline"
                href="#forgot"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
