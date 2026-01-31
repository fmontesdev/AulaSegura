/**
 * Tipos relacionados con notificaciones
 */

export interface Notification {
  id: number;
  title: string;
  time: string;
  type: 'warning' | 'error' | 'success';
  read: boolean;
}
