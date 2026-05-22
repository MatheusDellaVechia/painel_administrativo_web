import apiClient from './api';
import type { LoginCredentials, LoginResponse, RegisterData, User } from '../types/user.types';
import { tokenStorage } from '../utils/tokenStorage';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
    
    // Store token
    if (response.data.token) {
      tokenStorage.setToken(response.data.token);
    }
    
    return response.data;
  },

  async register(data: RegisterData): Promise<User> {
    const response = await apiClient.post<User>('/api/auth/register', data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/api/auth/me');
    return response.data;
  },

  logout(): void {
    tokenStorage.removeToken();
    window.location.href = '/login';
  },

  isAuthenticated(): boolean {
    return tokenStorage.hasToken();
  },
};
