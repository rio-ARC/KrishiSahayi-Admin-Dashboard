import React, { useState, useEffect } from 'react';
import {
  User,
  Search,
  MessageSquare,
  Paperclip,
  Send,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
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
      urgent: 'bg-red-50 text-red-800',
      high: 'bg-orange-50 text-orange-800',
      medium: 'bg-amber-50 text-amber-800',
      low: 'bg-emerald-50 text-emerald-800',
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-amber-50 text-amber-800',
      in_progress: 'bg-blue-50 text-blue-800',
      resolved: 'bg-green-50 text-green-800',
    };
    return colors[status] || colors.pending;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🌾</span>
            <h1 className="text-xl font-semibold text-gray-900">KrishiSahayi Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-700" />
              <span className="text-sm font-medium text-gray-700">Admin User</span>
              <button className="p-1">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden gap-4">
        <aside className="w-full md:w-48 bg-gray-50 border-r border-gray-200 flex flex-col md:min-h-0">
          <nav className="flex-1 px-4 py-6 space-y-1">
            <button
              onClick={() => { setStatusFilter(''); setCategoryFilter(''); }}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded text-left bg-gray-200 text-gray-900 font-medium text-sm"
            >
              <span>📋</span>
              <span>All Issues</span>
            </button>

            <button
              onClick={() => setStatusFilter('pending')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded text-left text-sm ${statusFilter === 'pending' ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <span>⏳</span>
              <span>Pending</span>
            </button>

            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded text-left text-sm ${statusFilter === 'in_progress' ? 'bg-gray-200 text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <span>⚙️</span>
              <span>In Progress</span>
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded text-left text-gray-700 hover:bg-gray-100 text-sm"
            >
              <span>📊</span>
              <span>Reports & Analytics</span>
            </button>
          </nav>

          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded text-left text-gray-700 hover:bg-gray-100 text-sm"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="w-full md:flex-1 bg-white border-r border-gray-200 flex flex-col md:min-h-0">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Issues ({issues.length})
              </h2>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-gray-700"
              >
                <option value="">All Categories</option>
                <option value="Pest Management">Pest Management</option>
                <option value="Disease Management">Disease Management</option>
                <option value="Nutrient Management">Nutrient Management</option>
                <option value="Soil & Water">Soil & Water</option>
                <option value="General Advisory">General Advisory</option>
              </select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-gray-900"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {issues.map((issue) => (
                <div
                  key={issue._id}
                  onClick={() => { setSelectedIssue(issue); setStatusUpdate(issue.status); }}
                  className={`p-4 border rounded cursor-pointer transition-colors ${selectedIssue?._id === issue._id
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedIssue(issue); setStatusUpdate(issue.status); } }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{getFarmerName(issue)}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{issue.title}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded ${getStatusColor(issue.status)}`}>
                      {issue.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                      {issue.category}
                    </span>
                  </div>
                </div>
              ))}
              {issues.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No issues found
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="w-full md:w-7/20 bg-white flex flex-col md:min-h-0">
          {selectedIssue ? (
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
                    Issue Details
                  </h2>
                  <span className={`px-2.5 py-1 text-xs rounded-md font-medium self-start ${getStatusColor(selectedIssue.status)}`}>
                    {selectedIssue.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><span className="font-semibold text-gray-900">Farmer:</span> {getFarmerName(selectedIssue)}</p>
                    <p><span className="font-semibold text-gray-900">District:</span> {getFarmerDistrict(selectedIssue)}</p>
                    {selectedIssue.location && <p><span className="font-semibold text-gray-900">Location:</span> {selectedIssue.location}</p>}
                  </div>
                </div>
              </div>

              <div className="p-6 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">{selectedIssue.title}</h3>
                <p className="text-sm text-gray-700 mb-5 leading-relaxed">{selectedIssue.description}</p>

                {selectedIssue.llmSummary && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-1">
                      <span>⚙️</span>
                      <span>AI Summary</span>
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedIssue.llmSummary}
                    </p>
                  </div>
                )}
              </div>

              {selectedIssue.adminResponse && (
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-600 mb-4">Admin Response</h3>
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedIssue.adminResponse}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Send Response</h3>
                <div className="space-y-4">
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type your response..."
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-gray-900 leading-relaxed"
                    rows={4}
                  />
                  <div className="flex items-center justify-between">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRespond(selectedIssue._id)}
                      className="px-5 py-2.5 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 flex items-center shadow-sm"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Response
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Update Status</h3>
                <div className="space-y-4">
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-gray-900"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button
                    onClick={() => handleStatusUpdate(selectedIssue._id, statusUpdate)}
                    className="w-full px-5 py-2.5 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 flex items-center justify-center shadow-sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select an Issue
                </h3>
                <p className="text-gray-500">
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