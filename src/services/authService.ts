// src/services/authService.ts
import api from './api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  flag: boolean;
  token?: string;
  message?: string;
}

export interface RegisterResponse {
  flag: boolean;
  message?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  exp?: number;
}

// Register new user
export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/register', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Login user
export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', data);
    
    if (response.data.flag && response.data.token) {
      // Save token to localStorage
      localStorage.setItem('auth_token', response.data.token);
      
      // Decode and save user data
      const user = decodeToken(response.data.token);
      if (user) {
        localStorage.setItem('user_data', JSON.stringify(user));
      }
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('auth_token');
  if (!token) return false;
  
  // Check if token is expired
  try {
    const user = decodeToken(token);
    if (!user || !user.exp) return false;
    
    // Check expiration
    const exp = user.exp * 1000; // Convert to milliseconds
    return Date.now() < exp;
  } catch {
    return false;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user_data');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Get auth token
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Decode JWT token
const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const decoded = JSON.parse(jsonPayload);
    
    // Map backend claims to user object
    // The claim names come from your .NET JWT configuration
    const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const fullname = decoded['Fullname'];
    const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || 
                   decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    
    return {
      id: parseInt(userId),
      name: fullname,
      email: email,
      exp: decoded.exp
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};