/**
 * Tipos para la entidad Subject (Asignaturas)
 */

import { DepartmentBasic } from './Department';
import { Course } from './Course';
import { Pagination } from './Pagination';

export interface Subject {
  subjectId: number;
  subjectCode: string;
  name: string;
  isActive: boolean;
  department: DepartmentBasic;
  courses: Course[];
}

export interface PaginatedSubjects {
  data: Subject[];
  meta: Pagination;
}

export interface SubjectsFilters {
  page?: number;
  limit?: number;
  filters?: string[];
}

export interface CreateSubjectData {
  subjectCode: string;
  name: string;
  departmentId: number;
  courseIds: number[];
}

export interface UpdateSubjectData {
  subjectCode?: string;
  name?: string;
  departmentId?: number;
  courseIds?: number[];
  isActive?: boolean;
}

export interface SubjectResponse {
  message: string;
}
