import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthState, LoginCredentials } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    if (token && userData) {
      setAuthState({
        user: JSON.parse(userData),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response: any = await authAPI.login(credentials.email, credentials.password);
      const { user, token } = response.data;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(user));
      setAuthState({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error: any) {
      const message = error?.message || 'Login failed';
      setAuthState({ user: null, isAuthenticated: false, isLoading: false, error: message });
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setAuthState({ user: null, isAuthenticated: false, isLoading: false, error: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};