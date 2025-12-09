import React, { useState, useEffect } from 'react';
import {
  Home,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  Plus,
  Calendar,
  List,
  MessageSquare,
  Paperclip,
  Send,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockQueries, mockAppointments } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import Loading from '../components/Loading';
import type { Query, Appointment } from '../types';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'queries' | 'appointments'>('queries');
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [queries, setQueries] = useState<Query[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);


  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setQueries(mockQueries);
        setAppointments(mockAppointments);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loading size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 px-4 md:px-6 py-4" role="banner">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Home"
            >
              <Home className="h-5 w-5 md:h-6 md:w-6 text-gray-600 dark:text-gray-300" aria-hidden="true" />
            </button>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <label htmlFor="dashboard-search" className="sr-only">Search by Farmer Name, Crop, Query ID</label>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
              <input
                id="dashboard-search"
                type="text"
                placeholder="Search by Farmer Name, Crop, Query ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                aria-describedby="search-help"
              />
              <span id="search-help" className="sr-only">Search through farmer queries and appointments</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />

            <button className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="h-5 w-5 md:h-6 md:w-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">3</span>
              </span>
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <label htmlFor="mobile-search" className="sr-only">Search farmers and queries</label>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            <input
              id="mobile-search"
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              aria-describedby="mobile-search-help"
            />
            <span id="mobile-search-help" className="sr-only">Search through farmer queries and appointments</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left Sidebar - Navigation */}
        <aside className="w-full md:w-1/5 bg-white dark:bg-gray-800 border-r border-gray-200 flex flex-col md:min-h-0" role="navigation" aria-label="Main navigation">
          <nav className="flex-1 px-4 py-6 space-y-2">
            <button
              onClick={() => setActiveTab('queries')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                activeTab === 'queries'
                  ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-r-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              aria-current={activeTab === 'queries' ? 'page' : undefined}
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Pending Queries</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                activeTab === 'appointments'
                  ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-r-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              aria-current={activeTab === 'appointments' ? 'page' : undefined}
            >
              <Calendar className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">My Appointments</span>
            </button>

            <button
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="View farmer records"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Farmer Records</span>
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="View reports and analytics"
            >
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Reports & Analytics</span>
            </button>

            <button
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Open settings"
            >
              <Settings className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Settings</span>
            </button>
          </nav>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Logout from your account"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Center Panel - Dynamic Content */}
        <main className="w-full md:w-2/5 bg-white dark:bg-gray-800 border-r border-gray-200 flex flex-col md:min-h-0">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-600 px-4 md:px-6 py-4">
            <div className="flex space-x-4 md:space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('queries')}
                className={`pb-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'queries'
                    ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Pending Queries ({queries.filter(q => q.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`pb-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'appointments'
                    ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                My Appointments ({appointments.length})
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {activeTab === 'queries' && (
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex space-x-4 mb-6">
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Filter by Crop</option>
                    <option>Tomato</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Filter by Date</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Unassigned</option>
                    <option>All</option>
                  </select>
                </div>

                {/* Query Cards */}
                {queries.map((query) => (
                  <div
                    key={query.id}
                    onClick={() => setSelectedQuery(query)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedQuery(query);
                      }
                    }}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      selectedQuery?.id === query.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for query: ${query.title} from ${query.farmer.name}`}
                    aria-selected={selectedQuery?.id === query.id}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1 sm:mb-0">{query.farmer.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {query.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{query.title}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex flex-wrap gap-2">
                        {query.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800">
                          View Details
                        </button>
                        <button className="text-xs text-green-600 dark:text-green-400 hover:text-green-800">
                          Assign to Self
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-4">
                {/* View Toggle */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">My Appointments</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setViewMode('calendar')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        viewMode === 'calendar'
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Calendar
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        viewMode === 'list'
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <List className="h-4 w-4 inline mr-1" />
                      List
                    </button>
                    <button className="px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 flex items-center">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Appointment
                    </button>
                  </div>
                </div>

                {/* Appointments List */}
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1 sm:mb-0">{appointment.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full self-start ${
                        appointment.status === 'scheduled'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{appointment.farmer.name}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {appointment.date.toLocaleDateString()} at {appointment.startTime}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Right Panel - Contextual Details */}
        <aside className="w-full md:w-7/20 bg-white dark:bg-gray-800 flex flex-col md:min-h-0">
          {selectedQuery ? (
            <div className="flex-1 overflow-y-auto">
              {/* Query Header */}
              <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-600">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-0">
                    Query #{selectedQuery.id}
                  </h2>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 text-sm self-start sm:self-auto">
                    View Full Profile
                  </button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p><strong>Farmer:</strong> {selectedQuery.farmer.name}</p>
                  <p><strong>Village:</strong> {selectedQuery.farmer.village}</p>
                </div>
              </div>

              {/* Farmer's Original Query */}
              <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-600">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Farmer's Original Query</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{selectedQuery.description}</p>

                {/* AI Analysis */}
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    AI Model Suggestion (Confidence: 85%)
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Based on the symptoms described, this appears to be a case of tomato leaf curl virus.
                    Recommend immediate isolation of affected plants and application of neem oil spray.
                  </p>
                </div>
              </div>

              {/* Response & Action */}
              <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-600">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Response & Action</h3>

                {/* Conversation History */}
                <div className="space-y-3 mb-4">
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">You</p>
                      <p className="text-sm text-gray-700">
                        I've reviewed your tomato plants. This looks like a viral infection.
                        Please isolate the affected plants immediately.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>

                {/* Response Input */}
                <div className="space-y-3">
                  <textarea
                    placeholder="Type your response..."
                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 flex items-center">
                      <Send className="h-4 w-4 mr-1" />
                      Send Response
                    </button>
                  </div>
                </div>
              </div>

              {/* Resolution Controls */}
              <div className="p-4 md:p-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Resolution Controls</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option>Awaiting Info</option>
                      <option>Appointment Scheduled</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark as Resolved
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a Query
                </h3>
                <p className="text-gray-500">
                  Choose a query from the list to view details and respond
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;