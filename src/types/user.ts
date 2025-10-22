// src/types/user.ts

export interface User {
  id: number;
  name: string;
  email: string;
  exp?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  flag: boolean;
  token?: string;
  message?: string;
}