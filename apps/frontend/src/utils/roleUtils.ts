import { RoleName } from '../types/User';
import type { AppTheme } from '../theme';

// Utilidades para gestión de roles de usuario

// Obtener etiqueta legible del rol
export const getRoleLabel = (role: RoleName): string => {
  const roleMap: Record<RoleName, string> = {
    [RoleName.ADMIN]: 'Administrador',
    [RoleName.TEACHER]: 'Profesor',
    [RoleName.JANITOR]: 'Conserje',
    [RoleName.SUPPORT_STAFF]: 'Staff',
  };
  return roleMap[role] || role;
};

// Obtener color asociado al rol
export const getRoleColor = (role: RoleName, theme: AppTheme): string => {
  const colorMap: Record<RoleName, string> = {
    [RoleName.ADMIN]: theme.colors.error,
    [RoleName.TEACHER]: theme.colors.tertiary,
    [RoleName.JANITOR]: theme.colors.primary,
    [RoleName.SUPPORT_STAFF]: theme.colors.grey,
  };
  return colorMap[role] || theme.colors.grey;
};
