import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import type { LoginCredentials } from '../types';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data as LoginCredentials);
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-auto">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/Krishipic.png')` }}
      />
      <div className="fixed inset-0 bg-black/30" />

      <div className="relative z-10 w-full max-w-[780px] px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden">

          {/* Header */}
          <div className="text-center px-6 sm:px-12 lg:px-20 pt-10 sm:pt-14 pb-6 sm:pb-10">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-wide">
              Government of India
            </h2>
            <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mt-2 sm:mt-4 leading-tight">
              KrishiSahayi Agri Officer Portal
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-2 sm:mt-4">
              Secure Login for Authorized Officers
            </p>
          </div>

          {/* Welcome banner */}
          <div className="mx-6 sm:mx-12 lg:mx-20 mb-8 sm:mb-14 bg-green-50 border-l-4 border-green-500 rounded-r-lg px-5 sm:px-8 py-5 sm:py-7 text-center">
            <p className="text-gray-900 font-semibold text-sm sm:text-base mb-2">
              👋 Welcome, Agricultural Officer!
            </p>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              The <strong className="text-green-700">KrishiSahayi Admin</strong> platform is your dedicated tool for efficiently managing and resolving queries from farmers. Let's get you started on making a difference.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 sm:px-12 lg:px-20">
            <div className="mb-8 sm:mb-12">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3 text-center">
                Officer Email / Employee Code
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`block w-full px-4 sm:px-6 py-4 sm:py-5 border rounded-lg text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-all ${errors.email ? 'border-red-400' : 'border-gray-300 hover:border-gray-400'
                  }`}
                placeholder="Enter Officer Email"
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-500 font-medium text-center">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-10 sm:mb-14">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-3 text-center">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`block w-full px-4 sm:px-6 py-4 sm:py-5 pr-12 sm:pr-14 border rounded-lg text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 transition-all ${errors.password ? 'border-red-400' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  placeholder="Enter Password"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-red-500 font-medium text-center">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || authLoading}
              className="w-full py-4 sm:py-5 rounded-lg text-base sm:text-lg font-bold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-lg shadow-green-600/25 hover:shadow-green-700/35 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting || authLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Other login options */}
          <div className="px-6 sm:px-12 lg:px-20 pt-8 sm:pt-14 pb-2 sm:pb-4">
            <p className="text-center text-sm font-bold text-gray-800 mb-5 sm:mb-7">Other Login Options</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <button className="py-3.5 sm:py-4 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all duration-200">
                Login with Mobile OTP
              </button>
              <button className="py-3.5 sm:py-4 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all duration-200">
                Login with Aadhaar
              </button>
              <button className="py-3.5 sm:py-4 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all duration-200">
                Login with DSC
              </button>
              <button className="py-3.5 sm:py-4 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all duration-200">
                SSO / Govt. ID
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-center py-6 sm:py-10">
            <button className="text-green-600 text-sm font-bold hover:text-green-700 hover:underline transition-colors">
              Forgot Password?
            </button>
          </div>

          {/* Security warning footer */}
          <div className="bg-amber-50 border-t border-amber-200 px-6 sm:px-12 lg:px-20 py-5 sm:py-7">
            <div className="flex items-start gap-3 justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed text-center">
                This is a Government of India portal. Unauthorized access is punishable under the IT Act, 2000.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center mt-5 sm:mt-7 text-xs sm:text-sm text-white/80 font-medium drop-shadow-lg">
          © 2024 KrishiSahayi — Ministry of Agriculture & Farmers Welfare
        </p>
      </div>
    </div>
  );
};

export default Login;