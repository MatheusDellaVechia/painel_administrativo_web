import apiClient from './api';
import type { Order, OrderFilters, UpdateOrderStatusData, StatusHistory } from '../types/order.types';
import type { PaginatedResponse } from '../types/api.types';

export const orderService = {
  async getOrders(filters: OrderFilters): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<PaginatedResponse<Order>>('/api/orders', {
      params: filters,
    });
    return response.data;
  },

  async getOrderById(id: number): Promise<Order> {
    const response = await apiClient.get<Order>(`/api/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(id: number, data: UpdateOrderStatusData): Promise<Order> {
    const response = await apiClient.put<Order>(`/api/orders/${id}/status`, data);
    return response.data;
  },

  async getOrderHistory(id: number): Promise<StatusHistory[]> {
    const response = await apiClient.get<StatusHistory[]>(`/api/orders/${id}/history`);
    return response.data;
  },
};
