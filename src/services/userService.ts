import apiClient from './api';
import type { User, UpdateUserRoleData, UpdateUserActiveData } from '../types/user.types';
import type { PaginatedResponse, PaginationParams } from '../types/api.types';

export interface UserFilters extends PaginationParams {
  isActive?: boolean;
  role?: string;
  search?: string;
}

export const userService = {
  async getUsers(filters: UserFilters): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<PaginatedResponse<User>>('/api/users', {
      params: filters,
    });
    return response.data;
  },

  async getUserById(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/api/users/${id}`);
    return response.data;
  },

  async activateUser(id: number, isActive: boolean): Promise<User> {
    const response = await apiClient.put<User>(`/api/users/${id}/activate`, {
      isActive,
    } as UpdateUserActiveData);
    return response.data;
  },

  async updateUserRole(id: number, data: UpdateUserRoleData): Promise<User> {
    const response = await apiClient.put<User>(`/api/users/${id}/role`, data);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/api/users/${id}`);
  },
};
