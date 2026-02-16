import React, { useState, useEffect } from 'react';
import { Download, TrendingUp, Clock, CheckCircle, BarChart3 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { adminAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import type { AnalyticsSummary, AnalyticsTrends } from '../types';
import Loading from '../components/Loading';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [trends, setTrends] = useState<AnalyticsTrends | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [summaryRes, trendsRes]: any[] = await Promise.all([
          adminAPI.getAnalyticsSummary(),
          adminAPI.getAnalyticsTrends()
        ]);
        setSummary(summaryRes.data);
        setTrends(trendsRes.data);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (isLoading || !summary || !trends) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loading size="lg" text="Loading analytics..." />
      </div>
    );
  }

  const trendsChartData = {
    labels: trends.trendsData.labels,
    datasets: [
      {
        label: trends.trendsData.datasets[0]?.label || 'New Issues',
        data: trends.trendsData.datasets[0]?.data || [],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: trends.trendsData.datasets[1]?.label || 'Resolved',
        data: trends.trendsData.datasets[1]?.data || [],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const statusChartData = {
    labels: summary.statusData.labels.map(l => l.replace('_', ' ')),
    datasets: [{
      data: summary.statusData.datasets[0]?.data || [],
      backgroundColor: COLORS.slice(0, summary.statusData.labels.length),
      borderWidth: 2,
      borderColor: '#ffffff',
    }]
  };

  const categoryChartData = {
    labels: summary.categoryData.labels,
    datasets: [{
      label: 'Issues',
      data: summary.categoryData.datasets[0]?.data || [],
      backgroundColor: COLORS.slice(0, summary.categoryData.labels.length).map(c => c + '99'),
      borderColor: COLORS.slice(0, summary.categoryData.labels.length),
      borderWidth: 1,
    }]
  };

  const resolvedCount = summary.statusData.datasets[0]?.data[summary.statusData.labels.indexOf('resolved')] || 0;
  const pendingCount = summary.statusData.datasets[0]?.data[summary.statusData.labels.indexOf('pending')] || 0;
  const inProgressCount = summary.statusData.datasets[0]?.data[summary.statusData.labels.indexOf('in_progress')] || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">KrishiSahayi issue tracking insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Issues</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{summary.totalCount}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{resolvedCount}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Resolution Time</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{trends.averageResolutionTimeHours}h</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingCount + inProgressCount}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Issue Trends</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Monthly issue submissions and resolutions</p>
          <div className="h-80">
            <Line
              data={trendsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: {
                  y: { beginAtZero: true, ticks: { stepSize: 1 } }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Issues by Status</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Distribution of issues by current status</p>
          <div className="h-80 flex items-center justify-center">
            <Doughnut
              data={statusChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Issues by Category</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Types of agricultural issues reported</p>
          <div className="h-80">
            <Bar
              data={categoryChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, ticks: { stepSize: 1 } }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Category Distribution</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Proportional breakdown of issue categories</p>
          <div className="h-80 flex items-center justify-center">
            <Pie
              data={{
                labels: summary.categoryData.labels,
                datasets: [{
                  data: summary.categoryData.datasets[0]?.data || [],
                  backgroundColor: COLORS.slice(0, summary.categoryData.labels.length),
                  borderWidth: 2,
                  borderColor: '#ffffff',
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;