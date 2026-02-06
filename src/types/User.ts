import { Department } from './Department';

// Enum de roles disponibles
export enum RoleName {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  JANITOR = 'janitor',
  SUPPORT_STAFF = 'support_staff',
}

// Enum de estados de usuario
export enum UserState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// Usuario del sistema
export interface User {
  userId: string;
  name: string;
  lastname: string;
  email: string;
  avatar: string;
  roles: RoleName[];
  validFrom?: string;
  validTo?: string | null;
  createdAt?: string;
  department?: Department;
}

// Metadata de paginación
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// Respuesta paginada de usuarios
export interface PaginatedUsers {
  data: User[];
  meta: Pagination;
}

// Filtros para obtener usuarios
export interface UsersFilters {
  page?: number;
  limit?: number;
  fullName?: string;
  email?: string;
  roles?: RoleName | RoleName[];
  departmentId?: number;
  state?: UserState;
  search?: string;
}

// Datos para crear un usuario
export interface CreateUserData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: RoleName[];
  avatar: string;
  validTo?: string | null;
  departmentId?: number;
}

// Datos para actualizar un usuario
export interface UpdateUserData {
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  avatar?: string;
  roles?: RoleName[];
  validFrom?: string;
  validTo?: string | null;
  departmentId?: number;
}

// Respuesta de eliminación de usuario
export interface DeleteUserResponse {
  message: string;
}
