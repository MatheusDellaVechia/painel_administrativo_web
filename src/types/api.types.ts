export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface DashboardStats {
  ordersByStatus: Record<string, number>;
  totalOrders: number;
  totalRevenue: number;
}
