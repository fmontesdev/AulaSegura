/**
 * Hooks de TanStack Query para gestión de asignaturas
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subjectService } from '../../services/subjectService';
import { CreateSubjectData, UpdateSubjectData, SubjectsFilters } from '../../types/Subject';

// Keys para el caché de React Query
export const subjectKeys = {
  all: ['subjects'] as const,
  lists: () => [...subjectKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...subjectKeys.lists(), filters] as const,
  details: () => [...subjectKeys.all, 'detail'] as const,
  detail: (subjectId: number) => [...subjectKeys.details(), subjectId] as const,
};

// Hook para obtener todas las asignaturas con filtros opcionales
export function useSubjects(filters?: SubjectsFilters) {
  return useQuery({
    queryKey: subjectKeys.list(filters),
    queryFn: () => subjectService.getAllSubjects(filters),
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}

// Hook para obtener una asignatura específica por ID
export function useSubject(subjectId?: number, enabled: boolean = true) {
  return useQuery({
    queryKey: subjectKeys.detail(subjectId!),
    queryFn: () => subjectService.getSubjectById(subjectId!),
    enabled: !!subjectId && enabled,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

// Hook para crear una asignatura
export function useCreateSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSubjectData) => subjectService.createSubject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subjectKeys.lists() });
    },
  });
}

// Hook para actualizar una asignatura
export function useUpdateSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ subjectId, data }: { subjectId: number; data: UpdateSubjectData }) =>
      subjectService.updateSubject(subjectId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: subjectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: subjectKeys.detail(variables.subjectId) });
    },
  });
}
