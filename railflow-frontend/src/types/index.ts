export interface Train {
  id: string;
  number: string;
  status: 'active' | 'delayed' | 'on-time' | 'maintenance';
  currentSection: string;
  destination: string;
  delay?: number;
}

export interface Section {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'maintenance' | 'blocked';
  trains: Train[];
  capacity: number;
  throughput: number;
}

export interface Alert {
  id: string;
  severity: 'high' | 'medium' | 'low';
  section: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

export interface KPI {
  punctuality: number;
  averageDelay: number;
  throughput: number;
  totalTrains: number;
  activeSections: number;
  idleSections: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  avatar?: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
