/**
 * Tipos para la entidad Course (Cursos)
 */

import { AcademicYear } from './AcademicYear';
import { Pagination } from './Pagination';

export enum CFLevel {
  FPB = 'FPB',
  CFGM = 'CFGM',
  CFGS = 'CFGS',
}

export enum EducationStage {
  ESO = 'ESO',
  BACHILLERATO = 'bachillerato',
  CF = 'CF',
}

export interface Course {
  courseId: number;
  courseCode: string;
  name: string;
  educationStage: EducationStage;
  levelNumber: number;
  cfLevel: CFLevel | null;
  isActive: boolean;
  academicYears: AcademicYear[];
}

export interface PaginatedCourses {
  data: Course[];
  meta: Pagination;
}

export interface CoursesFilters {
  page?: number;
  limit?: number;
  filters?: string[];
}

export interface CreateCourseData {
  courseCode: string;
  name: string;
  educationStage: EducationStage;
  levelNumber: number;
  cfLevel?: CFLevel | null;
  academicYearCode: string;
}

export interface UpdateCourseData {
  courseCode?: string;
  name?: string;
  educationStage?: EducationStage;
  levelNumber?: number;
  cfLevel?: CFLevel | null;
  isActive?: boolean;
  academicYearCode?: string;
}

export interface SoftDeleteCourseResponse {
  message: string;
}
