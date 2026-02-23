/**
 * Service para operaciones de cursos
 */

import { Course, CreateCourseData, UpdateCourseData, SoftDeleteCourseResponse, PaginatedCourses, CoursesFilters } from '../types/Course';
import apiService from './apiService';

export const courseService = {
  // Obtiene todos los cursos con filtros opcionales
  async getAllCourses(filters?: CoursesFilters): Promise<PaginatedCourses> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    // Filtros híbridos como string separado por comas
    if (filters?.filters && filters.filters.length > 0) {
      params.append('filters', filters.filters.join(','));
    }
    
    const queryString = params.toString();
    const url = queryString ? `/courses?${queryString}` : '/courses';
    
    return apiService.get<PaginatedCourses>(url);
  },

  // Obtiene un curso por su ID
  async getCourseById(courseId: number): Promise<Course> {
    return apiService.get<Course>(`/courses/${courseId}`);
  },

  // Crea un nuevo curso
  async createCourse(data: CreateCourseData): Promise<Course> {
    return apiService.post<Course>('/courses', data);
  },

  // Actualiza un curso por su ID
  async updateCourse(courseId: number, data: UpdateCourseData): Promise<Course> {
    return apiService.patch<Course>(`/courses/${courseId}`, data);
  },

  // Elimina (soft delete) un curso por su ID
  async deleteCourse(courseId: number): Promise<SoftDeleteCourseResponse> {
    return apiService.delete<SoftDeleteCourseResponse>(`/courses/${courseId}`);
  },
};
