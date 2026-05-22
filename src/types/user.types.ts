export const UserRole = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  VIEWER: 'VIEWER',
  REGULAR_USER: 'REGULAR_USER',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  role: UserRole | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface UpdateUserRoleData {
  role: UserRole;
}

export interface UpdateUserActiveData {
  isActive: boolean;
}
