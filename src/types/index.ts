export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'farmer';
  phone?: string;
  district?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Issue {
  _id: string;
  farmerId: User | string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location?: string;
  adminResponse?: string;
  llmSummary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  issues: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

export interface AnalyticsSummary {
  statusData: ChartData;
  categoryData: ChartData;
  totalCount: number;
}

export interface AnalyticsTrends {
  trendsData: ChartData;
  averageResolutionTimeHours: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type Theme = 'light' | 'dark';