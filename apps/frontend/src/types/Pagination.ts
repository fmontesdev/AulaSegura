/**
 * Tipos reutilizables para paginación
 */

// Metadata de paginación
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
