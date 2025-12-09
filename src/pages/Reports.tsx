import React, { useState } from 'react';
import {
  Download,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { mockAnalyticsData } from '../data/mockData';
import type { AnalyticsData } from '../types';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [analyticsData] = useState<AnalyticsData>(mockAnalyticsData);

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights into agricultural support activities</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Queries Solved</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.totalQueries}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12.5% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Response Time</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.averageResponseTime}h</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">-8.2% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Farmer Satisfaction</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.farmerSatisfaction}/5</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+5.1% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Farmers</p>
              <p className="text-3xl font-bold text-gray-900">247</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+15.3% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Query Volume Over Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Query Volume Over Time</h2>
            <p className="text-sm text-gray-600">Daily query submissions and resolutions</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="queries"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="New Queries"
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Resolved"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Queries by Crop Type */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Queries by Crop Type</h2>
            <p className="text-sm text-gray-600">Distribution of queries across different crops</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.queriesByCrop.map(item => ({
                    name: item.crop,
                    value: item.count,
                    percentage: item.percentage
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }: any) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.queriesByCrop.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Comparison and Issues Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Comparison */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">AI vs Human Performance</h2>
            <p className="text-sm text-gray-600">Accuracy comparison between AI suggestions and human responses</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'AI Accuracy', ai: analyticsData.performanceMetrics.aiAccuracy, human: 0 },
                { name: 'Human Accuracy', ai: 0, human: analyticsData.performanceMetrics.humanAccuracy },
                { name: 'Response Time', ai: analyticsData.performanceMetrics.responseTime, human: 4.5 },
                { name: 'Resolution Rate', ai: analyticsData.performanceMetrics.resolutionRate, human: 89.5 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="ai" fill="#22c55e" name="AI Performance" />
                <Bar dataKey="human" fill="#3b82f6" name="Human Performance" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Common Issues */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Most Common Issues</h2>
            <p className="text-sm text-gray-600">Top reported problems by frequency</p>
          </div>
          <div className="space-y-4">
            {[
              { issue: 'Leaf Curl Virus', crop: 'Tomato', count: 45, severity: 'High' },
              { issue: 'Rust Disease', crop: 'Wheat', count: 38, severity: 'High' },
              { issue: 'Stunted Growth', crop: 'Rice', count: 32, severity: 'Medium' },
              { issue: 'Bollworm Infestation', crop: 'Cotton', count: 25, severity: 'High' },
              { issue: 'Fungal Infection', crop: 'Onion', count: 18, severity: 'Medium' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.issue}</h3>
                  <p className="text-sm text-gray-600">{item.crop} • {item.count} cases</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.severity === 'High'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.severity}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Detailed Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{analyticsData.performanceMetrics.aiAccuracy}%</div>
            <div className="text-sm text-gray-600">AI Suggestion Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{analyticsData.performanceMetrics.humanAccuracy}%</div>
            <div className="text-sm text-gray-600">Human Response Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{analyticsData.performanceMetrics.resolutionRate}%</div>
            <div className="text-sm text-gray-600">Overall Resolution Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;