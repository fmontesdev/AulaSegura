/**
 * Service para operaciones de asignaturas
 */

import { Subject, CreateSubjectData, UpdateSubjectData, SubjectResponse, PaginatedSubjects, SubjectsFilters } from '../types/Subject';
import apiService from './apiService';

export const subjectService = {
  // Obtiene todas las asignaturas con filtros opcionales
  async getAllSubjects(filters?: SubjectsFilters): Promise<PaginatedSubjects> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    // Filtros híbridos como string separado por comas
    if (filters?.filters && filters.filters.length > 0) {
      params.append('filters', filters.filters.join(','));
    }
    
    const queryString = params.toString();
    const url = queryString ? `/subjects?${queryString}` : '/subjects';
    
    return apiService.get<PaginatedSubjects>(url);
  },

  // Obtiene una asignatura por su ID
  async getSubjectById(subjectId: number): Promise<Subject> {
    return apiService.get<Subject>(`/subjects/${subjectId}`);
  },

  // Crea una nueva asignatura
  async createSubject(data: CreateSubjectData): Promise<Subject> {
    return apiService.post<Subject>('/subjects', data);
  },

  // Actualiza una asignatura por su ID
  async updateSubject(subjectId: number, data: UpdateSubjectData): Promise<Subject> {
    return apiService.patch<Subject>(`/subjects/${subjectId}`, data);
  },

  // Elimina (soft delete) una asignatura por su ID
  async deleteSubject(subjectId: number): Promise<SubjectResponse> {
    return apiService.delete<SubjectResponse>(`/subjects/${subjectId}`);
  },
};
