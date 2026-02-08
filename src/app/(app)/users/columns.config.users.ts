import { ColumnConfig } from '../../../components/DataTable';
import { User } from '../../../types/User';
import { getRoleLabel } from '../../../utils/roleUtils';

// Configuración de columnas para la tabla de usuarios
export const getUsersColumns = (isUserActive: (user: User) => boolean): ColumnConfig<User>[] => [
  {
    key: 'name',
    label: 'Usuario',
    flex: 1.4,
    sortKey: (user) => `${user.name} ${user.lastname}`,
  },
  {
    key: 'email',
    label: 'Email',
    flex: 1,
    sortKey: 'email',
  },
  {
    key: 'role',
    label: 'Rol',
    flex: 1.2,
    sortKey: (user) => user.roles.map(role => getRoleLabel(role)).join(', '),
  },
  {
    key: 'department',
    label: 'Departamento',
    flex: 0.9,
    sortKey: (user) => user.department?.name || '',
  },
  {
    key: 'status',
    label: 'Estado',
    flex: 0.6,
    sortKey: (user) => isUserActive(user) ? 1 : 0,
  },
  {
    key: 'actions',
    label: 'Acciones',
    flex: 0.35,
    sortable: false,
  },
];
