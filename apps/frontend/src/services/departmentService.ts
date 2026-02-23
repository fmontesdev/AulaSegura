/**
 * Service para operaciones CRUD de departamentos
 */

import {
  Department,
  DepartmentBasic,
  DepartmentsResponse,
  CreateDepartmentDto,
  UpdateDepartmentDto,
  GetDepartmentsParams,
} from '../types/Department';
import apiService from './apiService';

export const departmentService = {
  // Obtiene todos los departamentos básicos (sin paginación, sin subjects/teachers)
  async getAllDepartments(): Promise<DepartmentBasic[]> {
    return apiService.get<DepartmentBasic[]>('/departments');
  },

  // Obtiene departamentos con filtros y paginación
  async getAllDepartmentsWithFilters(params: GetDepartmentsParams): Promise<DepartmentsResponse> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.filters && params.filters.length > 0) {
      queryParams.append('filters', params.filters.join(','));
    }

    const url = `/departments/filters?${queryParams.toString()}`;
    return apiService.get<DepartmentsResponse>(url);
  },

  // Obtiene un departamento por ID
  async getDepartmentById(departmentId: number): Promise<Department> {
    return apiService.get<Department>(`/departments/${departmentId}`);
  },

  // Crea un nuevo departamento
  async createDepartment(data: CreateDepartmentDto): Promise<Department> {
    return apiService.post<Department>('/departments', data);
  },

  // Actualiza un departamento
  async updateDepartment(departmentId: number, data: UpdateDepartmentDto): Promise<Department> {
    return apiService.patch<Department>(`/departments/${departmentId}`, data);
  },

  // Elimina un departamento (soft delete)
  async deleteDepartment(departmentId: number): Promise<void> {
    return apiService.delete<void>(`/departments/${departmentId}`);
  },
};
