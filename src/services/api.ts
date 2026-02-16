import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1',
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || error);
    }
);

export const authAPI = {
    login: (email: string, password: string) => api.post('/auth/login', { email, password }),
    register: (data: { name: string; email: string; password: string; role: string; phone?: string; district?: string }) =>
        api.post('/auth/register', data)
};

export const adminAPI = {
    getIssues: (params?: { page?: number; limit?: number; status?: string; category?: string; priority?: string; sort?: string }) =>
        api.get('/admin/issues', { params }),
    getIssueById: (id: string) => api.get(`/admin/issues/${id}`),
    updateStatus: (id: string, status: string) => api.patch(`/admin/issues/${id}/status`, { status }),
    respond: (id: string, adminResponse: string) => api.patch(`/admin/issues/${id}/respond`, { adminResponse }),
    getAnalyticsSummary: () => api.get('/admin/analytics/summary'),
    getAnalyticsTrends: () => api.get('/admin/analytics/trends')
};

export const farmerAPI = {
    createIssue: (farmerId: string, data: { title: string; description: string; category: string; priority: string; location?: string }) =>
        api.post(`/farmer/${farmerId}/issues`, data),
    getIssues: (farmerId: string, params?: { page?: number; limit?: number; status?: string }) =>
        api.get(`/farmer/${farmerId}/issues`, { params }),
    getIssueById: (farmerId: string, id: string) => api.get(`/farmer/${farmerId}/issues/${id}`)
};

export default api;
