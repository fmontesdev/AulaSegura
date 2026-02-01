import { Department } from './Department';

// Usuario del sistema
export interface User {
  userId: string;
  name: string;
  lastname: string;
  email: string;
  avatar: string;
  roles: string[];
  department?: Department;
  validFrom?: string;
  validTo?: string | null;
  createdAt?: string;
}

// Datos para actualizar un usuario
export interface UpdateUserData {
  name?: string;
  lastname?: string;
  email?: string;
  avatar?: string;
  validFrom?: string;
  validTo?: string | null;
}

// Respuesta de eliminación de usuario
export interface DeleteUserResponse {
  message: string;
}