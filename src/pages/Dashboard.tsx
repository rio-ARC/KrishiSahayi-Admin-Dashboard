import React, { useState, useEffect } from 'react';
import {
  Home,
  Users,
  BarChart3,
  LogOut,
  Search,
  Bell,
  User,
  Calendar,
  MessageSquare,
  Paperclip,
  Send,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import Loading from '../components/Loading';
import type { Issue } from '../types';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [responseText, setResponseText] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');

  const fetchIssues = async () => {
    setIsLoading(true);
    try {
      const params: any = {};
      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;
      const response: any = await adminAPI.getIssues(params);
      setIssues(response.data.issues);
    } catch (error) {
      console.error('Failed to load issues:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [statusFilter, categoryFilter]);

  const handleStatusUpdate = async (issueId: string, newStatus: string) => {
    try {
      await adminAPI.updateStatus(issueId, newStatus);
      fetchIssues();
      if (selectedIssue?._id === issueId) {
        setSelectedIssue(prev => prev ? { ...prev, status: newStatus as Issue['status'] } : null);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleRespond = async (issueId: string) => {
    if (!responseText.trim()) return;
    try {
      const response: any = await adminAPI.respond(issueId, responseText);
      setResponseText('');
      setSelectedIssue(response.data);
      fetchIssues();
    } catch (error) {
      console.error('Failed to send response:', error);
    }
  };

  const getFarmerName = (issue: Issue) => {
    if (typeof issue.farmerId === 'object' && issue.farmerId !== null) {
      return (issue.farmerId as any).name || 'Unknown';
    }
    return 'Unknown';
  };

  const getFarmerDistrict = (issue: Issue) => {
    if (typeof issue.farmerId === 'object' && issue.farmerId !== null) {
      return (issue.farmerId as any).district || '';
    }
    return '';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    return colors[status] || colors.pending;
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
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
              <Home className="h-5 w-5 md:h-6 md:w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">KrishiSahayi Dashboard</h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            <button className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="h-5 w-5 md:h-6 md:w-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">{issues.filter(i => i.status === 'pending').length}</span>
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
      </header>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <aside className="w-full md:w-1/5 bg-white dark:bg-gray-800 border-r border-gray-200 flex flex-col md:min-h-0">
          <nav className="flex-1 px-4 py-6 space-y-2">
            <button
              onClick={() => { setStatusFilter(''); setCategoryFilter(''); }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-r-2 border-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">All Issues</span>
            </button>

            <button
              onClick={() => setStatusFilter('pending')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${statusFilter === 'pending' ? 'bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Pending</span>
            </button>

            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${statusFilter === 'in_progress' ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <Users className="h-5 w-5" />
              <span className="font-medium">In Progress</span>
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Reports & Analytics</span>
            </button>
          </nav>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        <main className="w-full md:w-2/5 bg-white dark:bg-gray-800 border-r border-gray-200 flex flex-col md:min-h-0">
          <div className="border-b border-gray-200 dark:border-gray-600 px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Issues ({issues.length})
              </h2>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Categories</option>
                <option value="Pest Management">Pest Management</option>
                <option value="Disease Management">Disease Management</option>
                <option value="Nutrient Management">Nutrient Management</option>
                <option value="Soil & Water">Soil & Water</option>
                <option value="General Advisory">General Advisory</option>
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="space-y-4">
              {issues.map((issue) => (
                <div
                  key={issue._id}
                  onClick={() => { setSelectedIssue(issue); setStatusUpdate(issue.status); }}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${selectedIssue?._id === issue._id
                      ? 'border-green-500 bg-green-50 dark:bg-green-900'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedIssue(issue); setStatusUpdate(issue.status); } }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1 sm:mb-0">{getFarmerName(issue)}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{issue.title}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(issue.status)}`}>
                      {issue.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      {issue.category}
                    </span>
                  </div>
                </div>
              ))}
              {issues.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No issues found
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="w-full md:w-7/20 bg-white dark:bg-gray-800 flex flex-col md:min-h-0">
          {selectedIssue ? (
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-600">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-0">
                    Issue Details
                  </h2>
                  <span className={`px-2 py-1 text-xs rounded-full self-start ${getStatusColor(selectedIssue.status)}`}>
                    {selectedIssue.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p><strong>Farmer:</strong> {getFarmerName(selectedIssue)}</p>
                  <p><strong>District:</strong> {getFarmerDistrict(selectedIssue)}</p>
                  {selectedIssue.location && <p><strong>Location:</strong> {selectedIssue.location}</p>}
                </div>
              </div>

              <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-600">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">{selectedIssue.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{selectedIssue.description}</p>

                {selectedIssue.llmSummary && (
                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      AI Summary
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {selectedIssue.llmSummary}
                    </p>
                  </div>
                )}
              </div>

              {selectedIssue.adminResponse && (
                <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Admin Response</h3>
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{selectedIssue.adminResponse}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-600">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Send Response</h3>
                <div className="space-y-3">
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type your response..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRespond(selectedIssue._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 flex items-center"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Send Response
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Update Status</h3>
                <div className="space-y-3">
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button
                    onClick={() => handleStatusUpdate(selectedIssue._id, statusUpdate)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 flex items-center justify-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select an Issue
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose an issue from the list to view details and respond
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