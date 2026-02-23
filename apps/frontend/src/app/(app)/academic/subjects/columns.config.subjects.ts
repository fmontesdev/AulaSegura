/**
 * Configuración de columnas para la tabla de asignaturas
 */

import { ColumnConfig } from '../../../../components/DataTable';
import { Subject } from '../../../../types/Subject';

export const getSubjectsColumns = (): ColumnConfig<Subject>[] => [
  {
    key: 'subjectCode',
    label: 'Código',
    flex: 0.5,
    sortKey: 'subjectCode',
  },
  {
    key: 'name',
    label: 'Nombre',
    flex: 1.2,
    sortKey: 'name',
  },
  {
    key: 'department',
    label: 'Departamento',
    flex: 0.7,
    sortKey: (subject) => subject.department.name,
  },
  {
    key: 'courses',
    label: 'Cursos',
    flex: 1.2,
    sortable: false,
  },
  {
    key: 'isActive',
    label: 'Estado',
    flex: 0.4,
    sortKey: (subject) => subject.isActive ? 1 : 0,
  },
  {
    key: 'actions',
    label: 'Acciones',
    flex: 0.27,
    sortable: false,
  },
];
