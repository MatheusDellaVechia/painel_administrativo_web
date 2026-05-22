import apiClient from './api';
import type { DashboardStats } from '../types/api.types';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/api/dashboard/stats');
    return response.data;
  },
};
