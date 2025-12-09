import type { Farmer, Query, Appointment, AnalyticsData, Notification, User } from '../types';

// Mock Officer (Current User)
const mockOfficer: User = {
  id: '1',
  email: 'officer@krishisathi.com',
  name: 'Rajesh Kumar',
  role: 'officer',
  department: 'Agriculture Extension',
  phone: '+91 9876543210',
};

// Mock Farmers Data
export const mockFarmers: Farmer[] = [
  {
    id: '1',
    name: 'Ram Prasad',
    phone: '+91 9876543210',
    email: 'ram.prasad@email.com',
    village: 'Biharipur',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    landSize: 2.5,
    crops: ['Tomato', 'Rice', 'Wheat'],
    registrationDate: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Sita Devi',
    phone: '+91 9876543211',
    email: 'sita.devi@email.com',
    village: 'Gorakhpur',
    district: 'Gorakhpur',
    state: 'Uttar Pradesh',
    landSize: 3.2,
    crops: ['Wheat', 'Sugarcane', 'Potato'],
    registrationDate: new Date('2023-03-20'),
  },
  {
    id: '3',
    name: 'Mohan Singh',
    phone: '+91 9876543212',
    village: 'Lucknow',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    landSize: 1.8,
    crops: ['Rice', 'Maize', 'Vegetables'],
    registrationDate: new Date('2023-05-10'),
  },
  {
    id: '4',
    name: 'Priya Sharma',
    phone: '+91 9876543213',
    email: 'priya.sharma@email.com',
    village: 'Kanpur',
    district: 'Kanpur',
    state: 'Uttar Pradesh',
    landSize: 4.1,
    crops: ['Cotton', 'Soybean', 'Chickpea'],
    registrationDate: new Date('2023-07-05'),
  },
  {
    id: '5',
    name: 'Rajesh Kumar',
    phone: '+91 9876543214',
    village: 'Allahabad',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    landSize: 2.9,
    crops: ['Tomato', 'Onion', 'Cauliflower'],
    registrationDate: new Date('2023-09-12'),
  },
];

// Mock Queries Data
export const mockQueries: Query[] = [
  {
    id: '1',
    farmerId: '1',
    farmer: mockFarmers[0],
    title: 'Tomato leaves turning yellow and curling',
    description: 'My tomato plants are showing yellowing of leaves with curling edges. The problem started 2 weeks ago and is spreading to other plants. I have tried watering more but it doesn\'t seem to help.',
    category: 'Pest Management',
    crop: 'Tomato',
    priority: 'high',
    status: 'pending',
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    tags: ['Tomato', 'Yellowing', 'Curling', 'Pest'],
    attachments: [
      {
        id: 'att1',
        type: 'image',
        url: '/images/tomato-leaves.jpg',
        filename: 'tomato-leaves-affected.jpg',
        uploadedAt: new Date('2024-01-15T10:30:00'),
      }
    ],
    aiAnalysis: {
      confidence: 85,
      suggestion: 'Based on the symptoms described, this appears to be a case of tomato leaf curl virus. Recommend immediate isolation of affected plants and application of neem oil spray.',
      recommendedActions: [
        'Isolate affected plants immediately',
        'Apply neem oil spray every 3 days',
        'Remove and destroy severely affected plants',
        'Use virus-free seeds for next planting'
      ],
      similarCases: [], // Will be populated after all queries are defined
      generatedAt: new Date('2024-01-15T10:35:00'),
    }
  },
  {
    id: '2',
    farmerId: '2',
    farmer: mockFarmers[1],
    title: 'Wheat crop showing orange rust spots',
    description: 'Rust spots appearing on wheat leaves. The spots are orange in color and spreading rapidly. Need immediate advice on treatment.',
    category: 'Disease Management',
    crop: 'Wheat',
    priority: 'urgent',
    status: 'assigned',
    assignedTo: '1',
    assignedOfficer: mockOfficer,
    createdAt: new Date('2024-01-14T14:20:00'),
    updatedAt: new Date('2024-01-14T16:45:00'),
    tags: ['Wheat', 'Rust', 'Disease', 'Orange spots'],
    attachments: [],
    aiAnalysis: {
      confidence: 92,
      suggestion: 'This is a clear case of wheat rust disease. Immediate fungicide application is recommended.',
      recommendedActions: [
        'Apply systemic fungicide immediately',
        'Ensure proper field drainage',
        'Remove infected plant debris',
        'Use resistant varieties for next season'
      ],
      similarCases: [],
      generatedAt: new Date('2024-01-14T14:25:00'),
    }
  },
  {
    id: '3',
    farmerId: '3',
    farmer: mockFarmers[2],
    title: 'Rice plants showing stunted growth',
    description: 'Rice seedlings are not growing properly. They appear stunted and yellowish. Soil test shows normal pH but plants are weak.',
    category: 'Nutrient Management',
    crop: 'Rice',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: '1',
    assignedOfficer: mockOfficer,
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-13T11:30:00'),
    tags: ['Rice', 'Stunted growth', 'Nutrient deficiency'],
    attachments: [],
  },
  {
    id: '4',
    farmerId: '4',
    farmer: mockFarmers[3],
    title: 'Cotton bollworm infestation',
    description: 'Cotton plants are being damaged by bollworms. I can see holes in the bolls and larvae feeding on them.',
    category: 'Pest Management',
    crop: 'Cotton',
    priority: 'high',
    status: 'resolved',
    assignedTo: '1',
    assignedOfficer: mockOfficer,
    createdAt: new Date('2024-01-10T08:00:00'),
    updatedAt: new Date('2024-01-12T15:20:00'),
    resolvedAt: new Date('2024-01-12T15:20:00'),
    tags: ['Cotton', 'Bollworm', 'Pest', 'Bolls'],
    attachments: [],
  },
  {
    id: '5',
    farmerId: '5',
    farmer: mockFarmers[4],
    title: 'Onion crop affected by fungal infection',
    description: 'Onion bulbs are rotting in the field. White fungal growth visible on the bulbs. The infection is spreading.',
    category: 'Disease Management',
    crop: 'Onion',
    priority: 'high',
    status: 'pending',
    createdAt: new Date('2024-01-16T07:45:00'),
    updatedAt: new Date('2024-01-16T07:45:00'),
    tags: ['Onion', 'Fungal infection', 'Rotting'],
    attachments: [],
  },
];

// Update similar cases after queries are defined
mockQueries[0].aiAnalysis!.similarCases = [mockQueries[1], mockQueries[3]];
mockQueries[1].aiAnalysis!.similarCases = [mockQueries[0], mockQueries[3]];

// Mock Appointments Data
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    farmerId: '1',
    farmer: mockFarmers[0],
    officerId: '1',
    officer: mockOfficer,
    title: 'Field visit for tomato crop inspection',
    description: 'Inspect tomato field and provide treatment recommendations for leaf curl virus',
    date: new Date('2024-01-20'),
    startTime: '10:00',
    endTime: '12:00',
    location: 'Biharipur Village Farm',
    status: 'scheduled',
    type: 'field_visit',
    createdAt: new Date('2024-01-15T11:00:00'),
    updatedAt: new Date('2024-01-15T11:00:00'),
  },
  {
    id: '2',
    farmerId: '2',
    farmer: mockFarmers[1],
    officerId: '1',
    officer: mockOfficer,
    title: 'Wheat rust disease follow-up',
    description: 'Check effectiveness of fungicide application and provide further recommendations',
    date: new Date('2024-01-18'),
    startTime: '14:00',
    endTime: '15:30',
    location: 'Gorakhpur Agricultural Office',
    status: 'confirmed',
    type: 'office_meeting',
    createdAt: new Date('2024-01-14T17:00:00'),
    updatedAt: new Date('2024-01-16T09:00:00'),
  },
  {
    id: '3',
    farmerId: '3',
    farmer: mockFarmers[2],
    officerId: '1',
    officer: mockOfficer,
    title: 'Rice nutrient deficiency consultation',
    description: 'Discuss soil testing results and nutrient management plan',
    date: new Date('2024-01-19'),
    startTime: '11:00',
    endTime: '12:00',
    location: 'Phone Consultation',
    status: 'completed',
    type: 'phone_call',
    createdAt: new Date('2024-01-13T12:00:00'),
    updatedAt: new Date('2024-01-19T12:00:00'),
  },
];

// Mock Analytics Data
export const mockAnalyticsData: AnalyticsData = {
  totalQueries: 156,
  resolvedQueries: 142,
  averageResponseTime: 4.2, // hours
  farmerSatisfaction: 4.7, // out of 5
  queriesByCrop: [
    { crop: 'Tomato', count: 45, percentage: 28.8 },
    { crop: 'Wheat', count: 38, percentage: 24.4 },
    { crop: 'Rice', count: 32, percentage: 20.5 },
    { crop: 'Cotton', count: 25, percentage: 16.0 },
    { crop: 'Others', count: 16, percentage: 10.3 },
  ],
  queriesByStatus: [
    { status: 'Resolved', count: 142, percentage: 91.0 },
    { status: 'In Progress', count: 8, percentage: 5.1 },
    { status: 'Pending', count: 6, percentage: 3.8 },
  ],
  performanceMetrics: {
    aiAccuracy: 87.5,
    humanAccuracy: 94.2,
    responseTime: 3.8,
    resolutionRate: 91.0,
  },
  timeSeriesData: [
    { date: '2024-01-01', queries: 12, resolved: 11 },
    { date: '2024-01-02', queries: 8, resolved: 7 },
    { date: '2024-01-03', queries: 15, resolved: 14 },
    { date: '2024-01-04', queries: 10, resolved: 9 },
    { date: '2024-01-05', queries: 18, resolved: 16 },
    { date: '2024-01-06', queries: 14, resolved: 13 },
    { date: '2024-01-07', queries: 9, resolved: 8 },
    { date: '2024-01-08', queries: 16, resolved: 15 },
    { date: '2024-01-09', queries: 11, resolved: 10 },
    { date: '2024-01-10', queries: 13, resolved: 12 },
    { date: '2024-01-11', queries: 7, resolved: 6 },
    { date: '2024-01-12', queries: 19, resolved: 17 },
    { date: '2024-01-13', queries: 14, resolved: 13 },
  ],
};

// Mock Notifications Data
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'query_assigned',
    title: 'New Query Assigned',
    message: 'Tomato leaf curl virus case has been assigned to you',
    read: false,
    createdAt: new Date('2024-01-15T10:35:00'),
    actionUrl: '/dashboard?query=1',
  },
  {
    id: '2',
    type: 'appointment_reminder',
    title: 'Appointment Reminder',
    message: 'Field visit scheduled for tomorrow at 10:00 AM',
    read: false,
    createdAt: new Date('2024-01-15T09:00:00'),
    actionUrl: '/dashboard?tab=appointments',
  },
  {
    id: '3',
    type: 'system_alert',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM',
    read: true,
    createdAt: new Date('2024-01-14T16:00:00'),
  },
];

// Utility functions for data manipulation
export const getQueriesByStatus = (status: string) => {
  return mockQueries.filter(query => query.status === status);
};

export const getQueriesByCrop = (crop: string) => {
  return mockQueries.filter(query => query.crop === crop);
};

export const getQueriesByPriority = (priority: string) => {
  return mockQueries.filter(query => query.priority === priority);
};

export const getFarmerById = (id: string) => {
  return mockFarmers.find(farmer => farmer.id === id);
};

export const getQueryById = (id: string) => {
  return mockQueries.find(query => query.id === id);
};

export const getAppointmentById = (id: string) => {
  return mockAppointments.find(appointment => appointment.id === id);
};

export const getUnreadNotificationsCount = () => {
  return mockNotifications.filter(notification => !notification.read).length;
};