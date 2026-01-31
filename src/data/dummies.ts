/**
 * Datos de ejemplo para el Dashboard
 * TODO: Reemplazar con datos reales del backend
 */

import { AppTheme } from '../theme';
import { Notification } from '../types/Notification';

export const kpiData = (theme: AppTheme) => [
  {
    title: 'Reservas de hoy',
    value: 24,
    icon: 'calendar-check' as const,
    color: theme.colors.primary,
    badge: '3 pendientes',
    route: '/access/reservations',
  },
  {
    title: 'Incidencias abiertas',
    value: 7,
    icon: 'alert-circle' as const,
    color: theme.colors.error,
    route: '/supervision/incidents',
  },
  {
    title: 'Usuarios activos',
    value: 142,
    icon: 'account-group' as const,
    color: theme.colors.success,
    route: '/users',
  },
  {
    title: 'Accesos hoy',
    value: '356 / 12',
    icon: 'door-open' as const,
    color: theme.colors.tertiary,
    route: '/supervision/logs',
  },
];

export const recentReservations = [
  { id: 1, classroom: 'Aula 47', user: 'Paco García', time: '15:10 - 16:05', status: 'approved' as const },
  { id: 2, classroom: 'Aula 12', user: 'María López', time: '16:05 - 17:00', status: 'pending' as const },
  { id: 3, classroom: 'Laboratorio 3', user: 'Juan Pérez', time: '17:00 - 18:00', status: 'approved' as const },
];

export const deniedAccess = [
  { id: 1, user: 'Carlos Ruiz', classroom: 'Aula 8', reason: 'Sin permisos', time: '10:30' },
  { id: 2, user: 'Ana Martín', classroom: 'Aula 15', reason: 'Fuera de horario', time: '14:15' },
];

export const quickActions = (theme: AppTheme) => [
  { title: 'Crear Usuario', icon: 'account-plus' as const, route: '/users/create', color: theme.colors.primary },
  { title: 'Crear Credencial', icon: 'card-plus' as const, route: '/credentials/create', color: theme.colors.warning },
  { title: 'Crear Reserva', icon: 'calendar-plus' as const, route: '/access/reservations/create', color: theme.colors.tertiary },
  { title: 'Crear Permiso', icon: 'key-plus' as const, route: '/access/permissions/create', color: theme.colors.success },
];

export const notifications: Notification[] = [
  { id: 1, title: 'Reserva pendiente de validación', time: 'Hace 5 min', type: 'warning', read: false },
  { id: 2, title: 'Lector offline en Aula 12', time: 'Hace 15 min', type: 'error', read: false },
  { id: 3, title: 'Nueva credencial asignada', time: 'Hace 1 hora', type: 'success', read: true },
];

export const academicYears = [
  '2025-2026',
  '2024-2025',
  '2023-2024',
];
