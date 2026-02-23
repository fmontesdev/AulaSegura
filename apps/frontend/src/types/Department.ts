/**
 * Tipos para la entidad Department (Departamentos)
 */

import { Subject } from './Subject';
import { User } from './User';
import { Pagination } from './Pagination';

// Departamento simplificado (para usar en usuarios y asignaturas)
export interface DepartmentBasic {
  departmentId: number;
  name: string;
  isActive: boolean;
}

// Departamento completo (para la página de departamentos)
export interface Department extends DepartmentBasic {
  subjects: Subject[];
  teachers: User[];
}

// Respuesta paginada de departamentos
export interface DepartmentsResponse {
  data: Department[];
  meta: Pagination;
}

// Parámetros para obtener departamentos con filtros
export interface GetDepartmentsParams {
  page?: number;
  limit?: number;
  filters?: string[];
}

// DTO para crear departamento
export interface CreateDepartmentDto {
  name: string;
  isActive?: boolean;
}

// DTO para actualizar departamento
export interface UpdateDepartmentDto {
  name?: string;
  isActive?: boolean;
}