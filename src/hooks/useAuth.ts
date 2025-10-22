// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  isAuthenticated, 
  getCurrentUser, 
  login as loginService, 
  register as registerService,
  logout as logoutService 
} from '../services/authService';
import type { User } from '../types/user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    setIsLoading(true);
    const auth = isAuthenticated();
    setAuthenticated(auth);
    
    if (auth) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    } else {
      setUser(null);
    }
    
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });
      
      if (response.flag) {
        checkAuth();
        return { success: true, message: 'Login successful' };
      }
      
      return { success: false, message: response.message || 'Login failed' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await registerService({ name, email, password });
      
      return { 
        success: response.flag, 
        message: response.message || (response.flag ? 'Registration successful' : 'Registration failed')
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setAuthenticated(false);
    navigate('/');
  };

  return {
    user,
    authenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
  };
};