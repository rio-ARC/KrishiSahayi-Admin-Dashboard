// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'officer' | 'admin';
  avatar?: string;
  department: string;
  phone?: string;
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

// Farmer Types
export interface Farmer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  village: string;
  district: string;
  state: string;
  landSize?: number; // in acres
  crops: string[];
  registrationDate: Date;
  profileImage?: string;
}

// Query Types
export interface Query {
  id: string;
  farmerId: string;
  farmer: Farmer;
  title: string;
  description: string;
  category: string;
  crop: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  assignedOfficer?: User;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  tags: string[];
  attachments: QueryAttachment[];
  voiceNote?: VoiceNote;
  aiAnalysis?: AIAnalysis;
}

export interface QueryAttachment {
  id: string;
  type: 'image' | 'document' | 'video';
  url: string;
  filename: string;
  uploadedAt: Date;
}

export interface VoiceNote {
  id: string;
  url: string;
  duration: number;
  transcription: string;
  transcribedAt: Date;
}

export interface AIAnalysis {
  confidence: number;
  suggestion: string;
  recommendedActions: string[];
  similarCases: Query[];
  generatedAt: Date;
}

// Appointment Types
export interface Appointment {
  id: string;
  farmerId: string;
  farmer: Farmer;
  officerId: string;
  officer: User;
  queryId?: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  type: 'field_visit' | 'office_meeting' | 'phone_call' | 'video_call';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Types
export interface AnalyticsData {
  totalQueries: number;
  resolvedQueries: number;
  averageResponseTime: number;
  farmerSatisfaction: number;
  queriesByCrop: CropAnalytics[];
  queriesByStatus: StatusAnalytics[];
  performanceMetrics: PerformanceMetrics;
  timeSeriesData: TimeSeriesData[];
}

export interface CropAnalytics {
  crop: string;
  count: number;
  percentage: number;
}

export interface StatusAnalytics {
  status: string;
  count: number;
  percentage: number;
}

export interface PerformanceMetrics {
  aiAccuracy: number;
  humanAccuracy: number;
  responseTime: number;
  resolutionRate: number;
}

export interface TimeSeriesData {
  date: string;
  queries: number;
  resolved: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'query_assigned' | 'appointment_reminder' | 'system_alert' | 'farmer_response';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

// Chat/Message Types
export interface Message {
  id: string;
  queryId: string;
  senderId: string;
  sender: User | Farmer;
  content: string;
  type: 'text' | 'image' | 'file' | 'voice';
  timestamp: Date;
  read: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: string;
  url: string;
  filename: string;
}

// Filter and Search Types
export interface QueryFilters {
  crop?: string;
  status?: string;
  priority?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  assignedTo?: string;
  farmerName?: string;
}

export interface AppointmentFilters {
  date?: Date;
  status?: string;
  type?: string;
  farmerName?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface QueryForm {
  title: string;
  description: string;
  category: string;
  crop: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
}

export interface AppointmentForm {
  farmerId: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: 'field_visit' | 'office_meeting' | 'phone_call' | 'video_call';
}

// Theme Types
export type Theme = 'light' | 'dark';

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;