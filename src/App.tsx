import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Reports = lazy(() => import('./pages/Reports'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Suspense fallback={<Loading size="lg" text="Loading..." />}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Suspense>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: { background: '#363636', color: '#fff' },
                  success: { duration: 3000, iconTheme: { primary: '#10b981', secondary: '#fff' } },
                  error: { duration: 5000, iconTheme: { primary: '#ef4444', secondary: '#fff' } },
                }}
              />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
