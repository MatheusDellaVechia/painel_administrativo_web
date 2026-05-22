import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosAdapter } from 'axios';
import { tokenStorage } from '../utils/tokenStorage';
import type { ApiError } from '../types/api.types';
import { mockApi } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || true; // true para usar mock por padrão

// Mock adapter - intercepta requisições ANTES de serem enviadas
const mockAdapter: AxiosAdapter = async (config) => {
  console.log(`🎭 Mock API: ${config.method?.toUpperCase()} ${config.url}`);
  
  const url = config.url?.replace(API_BASE_URL, '') || config.url;
  const method = config.method?.toUpperCase();
  
  // Parse config.data if it's a string (JSON)
  let data = config.data;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      // Keep as string if not JSON
    }
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    // Auth endpoints
    if (url === '/api/auth/login' && method === 'POST') {
      const { email, password } = data;
      const result = mockApi.login(email, password);
      return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
    }
    
    if (url === '/api/auth/register' && method === 'POST') {
      const result = mockApi.register(data);
      return Promise.resolve({ data: result, status: 201, statusText: 'Created', config, headers: {} });
    }
    
    if (url === '/api/auth/me' && method === 'GET') {
      const token = tokenStorage.getToken() || '';
      const result = mockApi.getCurrentUser(token);
      return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
    }
    
    // Users endpoints
    if (url?.startsWith('/api/users') && method === 'GET') {
      if (url.match(/\/api\/users\/\d+$/)) {
        const id = parseInt(url.split('/').pop() || '0');
        const result = mockApi.getUsers({ page: 1, limit: 100 }).data.find(u => u.id === id);
        if (!result) throw new Error('Usuário não encontrado');
        return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
      }
      
      const params = config.params || {};
      const filters: any = {
        page: parseInt(params.page || '1'),
        limit: parseInt(params.limit || '10'),
      };
      
      if (params.isActive !== undefined && params.isActive !== null) {
        filters.isActive = params.isActive === 'true' || params.isActive === true;
      }
      
      if (params.search) {
        filters.search = params.search;
      }
      
      const result = mockApi.getUsers(filters);
      return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
    }
    
    if (url?.match(/\/api\/users\/\d+\/activate/) && method === 'PUT') {
      const id = parseInt(url.split('/')[3]);
      const { isActive } = data;
      const result = mockApi.activateUser(id, isActive);
      return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
    }
    
    if (url?.match(/\/api\/users\/\d+\/role/) && method === 'PUT') {
      const id = parseInt(url.split('/')[3]);
      const { role } = data;
      const result = mockApi.updateUserRole(id, role);
      return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
    }
    
    // Dashboard endpoints
    if (url === '/api/dashboard/stats' && method === 'GET') {
      const result = mockApi.getDashboardStats();
      return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
    }
    
    // Orders endpoints
    if (url?.startsWith('/api/orders') && method === 'GET') {
      if (url.match(/\/api\/orders\/\d+\/history$/)) {
        const id = parseInt(url.split('/')[3]);
        const result = mockApi.getOrderHistory(id);
        return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
      }
      
      if (url.match(/\/api\/orders\/\d+\/attachments$/)) {
        const id = parseInt(url.split('/')[3]);
        const result = mockApi.getOrderAttachments(id);
        return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
      }
      
      if (url.match(/\/api\/orders\/\d+$/)) {
        const id = parseInt(url.split('/').pop() || '0');
        const result = mockApi.getOrderById(id);
        return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
      }
      
      const params = config.params || {};
      const result = mockApi.getOrders(params);
      return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
    }
    
    if (url?.match(/\/api\/orders\/\d+\/status/) && method === 'PUT') {
      const id = parseInt(url.split('/')[3]);
      const result = mockApi.updateOrderStatus(id, data);
      return Promise.resolve({ data: result, status: 200, statusText: 'OK', config, headers: {} });
    }
    
    if (url?.match(/\/api\/orders\/\d+\/attachments/) && method === 'POST') {
      const id = parseInt(url.split('/')[3]);
      const formData = data;
      const file = formData?.get ? formData.get('file') : null;
      const result = mockApi.uploadFile(id, file);
      return Promise.resolve({ data: result, status: 201, statusText: 'Created', config, headers: {} });
    }
    
    throw new Error(`Mock endpoint não implementado: ${method} ${url}`);
  } catch (error: any) {
    return Promise.reject({
      config,
      response: {
        status: error.status || 400,
        statusText: error.message || 'Bad Request',
        data: { message: error.message },
        headers: {},
        config,
      },
      message: error.message,
      isAxiosError: true,
    });
  }
};

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Usa adapter mock se USE_MOCK estiver ativo
  adapter: USE_MOCK ? mockAdapter : undefined,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const apiError: ApiError = {
        message: error.response.data?.message || 'Ocorreu um erro',
        statusCode: error.response.status,
        errors: error.response.data?.errors,
      };

      if (error.response.status === 401) {
        tokenStorage.removeToken();
        window.location.href = '/login';
      }

      return Promise.reject(apiError);
    } else if (error.request) {
      const networkError: ApiError = {
        message: 'Usando dados mock (backend não disponível)',
      };
      return Promise.reject(networkError);
    } else {
      const unknownError: ApiError = {
        message: 'Erro desconhecido',
      };
      return Promise.reject(unknownError);
    }
  }
);

export default apiClient;
