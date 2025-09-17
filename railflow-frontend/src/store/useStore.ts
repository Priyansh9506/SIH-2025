import { create } from 'zustand';
import { Train, Section, Alert, KPI, User, Notification } from '../types';

interface AppState {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  
  // Dashboard data
  kpis: KPI;
  trains: Train[];
  sections: Section[];
  alerts: Alert[];
  notifications: Notification[];
  
  // UI state
  sidebarOpen: boolean;
  currentPage: string;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  updateKPIs: (kpis: Partial<KPI>) => void;
  addAlert: (alert: Alert) => void;
  resolveAlert: (alertId: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (notificationId: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setCurrentPage: (page: string) => void;
  updateTrainStatus: (trainId: string, status: Train['status']) => void;
  updateSectionStatus: (sectionId: string, status: Section['status']) => void;
}

// Mock data
const mockKPIs: KPI = {
  punctuality: 95,
  averageDelay: 15,
  throughput: 12,
  totalTrains: 125,
  activeSections: 85,
  idleSections: 40,
};

const mockTrains: Train[] = [
  { id: '1', number: 'T001', status: 'on-time', currentSection: 'Section A', destination: 'Mumbai Central' },
  { id: '2', number: 'T002', status: 'delayed', currentSection: 'Section B', destination: 'Delhi Junction', delay: 15 },
  { id: '3', number: 'T003', status: 'active', currentSection: 'Section C', destination: 'Bangalore City' },
];

const mockSections: Section[] = [
  { id: '1', name: 'Section A', status: 'active', trains: [], capacity: 10, throughput: 80 },
  { id: '2', name: 'Section B', status: 'active', trains: [], capacity: 8, throughput: 20 },
  { id: '3', name: 'Section C', status: 'active', trains: [], capacity: 12, throughput: 70 },
  { id: '4', name: 'Section D', status: 'active', trains: [], capacity: 10, throughput: 80 },
  { id: '5', name: 'Section E', status: 'active', trains: [], capacity: 15, throughput: 100 },
  { id: '6', name: 'Section F', status: 'idle', trains: [], capacity: 6, throughput: 20 },
  { id: '7', name: 'Section G', status: 'active', trains: [], capacity: 14, throughput: 100 },
];

const mockAlerts: Alert[] = [
  {
    id: 'A123',
    severity: 'high',
    section: 'Section B',
    description: 'Signal malfunction detected',
    timestamp: '2024-01-15 14:30',
    resolved: false,
  },
  {
    id: 'B456',
    severity: 'medium',
    section: 'Section D',
    description: 'Train delay due to maintenance',
    timestamp: '2024-01-15 15:15',
    resolved: false,
  },
  {
    id: 'C789',
    severity: 'low',
    section: 'Section F',
    description: 'Track obstruction reported',
    timestamp: '2024-01-15 16:00',
    resolved: false,
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'High Severity Alert',
    message: 'Signal malfunction detected at Section B. Immediate action required.',
    timestamp: '2024-01-15 14:30',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Medium Severity Warning',
    message: 'Train #582 delayed by 15 minutes at Section D due to unscheduled maintenance.',
    timestamp: '2024-01-15 15:15',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Low Severity Notification',
    message: 'Minor track obstruction reported near Section F. No immediate impact on traffic.',
    timestamp: '2024-01-15 16:00',
    read: false,
  },
  {
    id: '4',
    type: 'success',
    title: 'System Notification',
    message: 'AI re-routing algorithm successfully optimized traffic flow, reducing potential delays by 12%.',
    timestamp: '2024-01-15 18:00',
    read: false,
  },
];

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  kpis: mockKPIs,
  trains: mockTrains,
  sections: mockSections,
  alerts: mockAlerts,
  notifications: mockNotifications,
  sidebarOpen: false,
  currentPage: 'dashboard',
  
  // Actions
  setUser: (user) => set({ user }),
  
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  
  login: (username: string, password: string) => {
    // Mock authentication
    if (username && password) {
      const mockUser = {
        id: '1',
        username: username,
        email: `${username}@railflow.com`,
        role: 'admin' as const,
      };
      set({ 
        isAuthenticated: true, 
        user: mockUser
      });
    }
  },
  
  logout: () => set({ isAuthenticated: false, user: null }),
  
  updateKPIs: (kpis) => set((state) => ({ 
    kpis: { ...state.kpis, ...kpis } 
  })),
  
  addAlert: (alert) => set((state) => ({
    alerts: [...state.alerts, alert]
  })),
  
  resolveAlert: (alertId) => set((state) => ({
    alerts: state.alerts.map(alert =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    )
  })),
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification]
  })),
  
  markNotificationRead: (notificationId) => set((state) => ({
    notifications: state.notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    )
  })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  updateTrainStatus: (trainId, status) => set((state) => ({
    trains: state.trains.map(train =>
      train.id === trainId ? { ...train, status } : train
    )
  })),
  
  updateSectionStatus: (sectionId, status) => set((state) => ({
    sections: state.sections.map(section =>
      section.id === sectionId ? { ...section, status } : section
    )
  })),
}));
