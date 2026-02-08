import React, { useState, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { Text, ActivityIndicator, IconButton, Button, Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../../../../theme';
import { useFilters } from '../../../../contexts/FilterContext';
import { useSubjects, useUpdateSubject } from '../../../../hooks/queries/useSubjects';
import { StyledChip } from '../../../../components/StyledChip';
import { DataTable } from '../../../../components/DataTable';
import { ConfirmDialog } from '../../../../components/ConfirmDialog';
import { TooltipWrapper } from '../../../../components/TooltipWrapper';
import { Subject } from '../../../../types/Subject';
import { getSubjectsColumns } from './columns.config.subjects';
import { addOpacity } from '../../../../utils/colorUtils';
import { styles } from './subjects.styles';

// Pantalla de gestión de asignaturas
export default function SubjectsScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { filters } = useFilters();
  const [deactivateDialogVisible, setDeactivateDialogVisible] = useState(false);
  const [activateDialogVisible, setActivateDialogVisible] = useState(false);
  const [subjectToToggle, setSubjectToToggle] = useState<Subject | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  const [hoveredExpandButton, setHoveredExpandButton] = useState<string | null>(null);

  // Resetear a página 1 cuando cambien los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Limpiar expansiones cuando cambie la página
  useEffect(() => {
    setExpandedSubjects(new Set());
    setHoveredExpandButton(null);
  }, [currentPage]);

  // Hook de TanStack Query para obtener todas las asignaturas
  const { data: subjectsResponse, isLoading, error, isFetching, refetch } = useSubjects({
    page: currentPage,
    limit: currentLimit,
    filters: filters.length > 0 ? filters : undefined,
  });
  const updateSubject = useUpdateSubject();

  // Extraer datos y metadata de la respuesta paginada
  const subjects = subjectsResponse?.data || [];
  const pagination = subjectsResponse?.meta;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(1);
  };

  const handleEdit = (subject: Subject) => {
    router.push(`/academic/subjects/${subject.subjectId}`);
  };

  const handleDeactivateClick = (subject: Subject) => {
    setSubjectToToggle(subject);
    setDeactivateDialogVisible(true);
  };

  const handleActivateClick = (subject: Subject) => {
    setSubjectToToggle(subject);
    setActivateDialogVisible(true);
  };

  const handleDeactivateConfirm = async () => {
    if (!subjectToToggle) return;

    try {
      await updateSubject.mutateAsync({
        subjectId: subjectToToggle.subjectId,
        data: { isActive: false },
      });
      setDeactivateDialogVisible(false);
      setSubjectToToggle(null);
    } catch (error) {
      console.error('Error deactivating subject:', error);
    }
  };

  const handleActivateConfirm = async () => {
    if (!subjectToToggle) return;

    try {
      await updateSubject.mutateAsync({
        subjectId: subjectToToggle.subjectId,
        data: { isActive: true },
      });
      setActivateDialogVisible(false);
      setSubjectToToggle(null);
    } catch (error) {
      console.error('Error activating subject:', error);
    }
  };

  const handleDeactivateCancel = () => {
    setDeactivateDialogVisible(false);
    setSubjectToToggle(null);
  };

  const handleActivateCancel = () => {
    setActivateDialogVisible(false);
    setSubjectToToggle(null);
  };

  // Función para expandir/colapsar la lista de cursos en una asignatura
  const toggleExpandCourses = (subjectId: string) => {
    setExpandedSubjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subjectId)) {
        newSet.delete(subjectId);
      } else {
        newSet.add(subjectId);
      }
      return newSet;
    });
  };

  const columns = getSubjectsColumns();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="bodyLarge" style={{ marginTop: 16, color: theme.colors.onSurface }}>
          Cargando asignaturas...
        </Text>
      </View>
    );
  }

  if (error) {
    return (     
      <View style={[styles.container, styles.centered]}>
        <Text variant="titleMedium" style={{ color: theme.colors.error }}>
          Error al cargar asignaturas
        </Text>
        <Text variant="bodyMedium" style={{ marginTop: 8, color: theme.colors.onSurface }}>
          {error instanceof Error ? error.message : 'Error desconocido'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Título sección */}
        <Text variant="headlineMedium" style={{ color: theme.colors.secondary }}>
          Gestión de Asignaturas
        </Text>

        {/* Botón crear asignatura */}
        <Button
          icon="plus"
          mode="contained"
          onPress={() => router.push('/academic/subjects/create')}
          style={{ backgroundColor: theme.colors.success }}
        >
          Nueva Asignatura
        </Button>
      </View>

      <DataTable
        data={subjects}
        columns={columns}
        keyExtractor={(subject) => String(subject.subjectId)}
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        limitOptions={[5, 10, 20, 50]}
        renderRow={(subject) => (
          <>
            {/* Columna de código */}
            <View style={styles.cellCode}>
              <Text variant="bodyMedium" style={{ fontWeight: '600' }}>
                {subject.subjectCode}
              </Text>
            </View>

            {/* Columna de nombre */}
            <View style={styles.cellName}>
              <Text variant="bodyMedium" style={{ color: theme.colors.grey }}>
                {subject.name}
              </Text>
            </View>

            {/* Columna de departamento */}
            <View style={styles.cellDepartment}>
              <Text variant="bodyMedium" style={{ color: theme.colors.grey }}>
                {subject.department.name}
              </Text>
            </View>

            {/* Columna de cursos */}
            <View style={styles.cellCourses}>
              <View style={styles.coursesContainer}>
                {(() => {
                  const isExpanded = expandedSubjects.has(String(subject.subjectId));
                  const displayCourses = isExpanded ? subject.courses : subject.courses.slice(0, 2);
                  const hasMore = subject.courses.length > 2;

                  return (
                    <>
                      {displayCourses.map(course => (
                        <StyledChip key={course.courseId} color={theme.colors.warning}>
                          {course.courseCode}
                        </StyledChip>
                      ))}
                      {hasMore && (
                        <Pressable
                          onPress={() => toggleExpandCourses(String(subject.subjectId))}
                          onHoverIn={() => setHoveredExpandButton(String(subject.subjectId))}
                          onHoverOut={() => setHoveredExpandButton(null)}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 2,
                            paddingLeft: 9,
                            paddingRight: 4,
                            borderRadius: 15,
                            backgroundColor: hoveredExpandButton === String(subject.subjectId) 
                              ? addOpacity(theme.colors.secondary, 0.05)
                              : 'transparent',
                          }}
                        >
                          <Text 
                            variant="bodySmall" 
                            style={[{ fontWeight: '600' }, { color: theme.colors.tertiary }]}
                          >
                            {isExpanded 
                              ? 'Ocultar' 
                              : `${subject.courses.length - 2} más`
                            }
                          </Text>
                          <Icon
                            source={isExpanded ? 'chevron-up' : 'chevron-down'}
                            size={20}
                            color={theme.colors.tertiary}
                          />
                        </Pressable>
                      )}
                    </>
                  );
                })()}
              </View>
            </View>

            {/* Columna de estado */}
            <View style={styles.cellStatus}>
              <View style={styles.chipWrapper}>
                <StyledChip color={subject.isActive ? theme.colors.success : theme.colors.grey}>
                  {subject.isActive ? 'Activo' : 'Inactivo'}
                </StyledChip>
              </View>
            </View>

            {/* Columna de acciones */}
            <View style={styles.cellActions}>
              <TooltipWrapper title="Editar">
                <IconButton
                  icon="pencil"
                  size={20}
                  iconColor={theme.colors.secondary}
                  onPress={() => handleEdit(subject)}
                  style={{
                    marginVertical: -1,
                    marginLeft: -10,
                  }}
                />
              </TooltipWrapper>
              {subject.isActive ? (
                <TooltipWrapper title="Desactivar">
                  <IconButton
                    icon="toggle-switch-off"
                    size={24}
                    iconColor={theme.colors.error}
                    onPress={() => handleDeactivateClick(subject)}
                    style={{
                      marginVertical: -3,
                      marginLeft: -2,
                    }}
                  />
                </TooltipWrapper>
              ) : (
                <TooltipWrapper title="Activar">
                  <IconButton
                    icon="toggle-switch"
                    size={24}
                    iconColor={theme.colors.success}
                    onPress={() => handleActivateClick(subject)}
                    style={{
                      marginVertical: -3,
                      marginLeft: -2,
                    }}
                  />
                </TooltipWrapper>
              )}
            </View>
          </>
        )}
        isLoading={isFetching}
        onRefresh={refetch}
        emptyMessage="No hay asignaturas disponibles"
        defaultSortKey="name"
      />

      {/* Diálogo de confirmación para desactivar asignatura */}
      <ConfirmDialog
        visible={deactivateDialogVisible}
        onDismiss={handleDeactivateCancel}
        onConfirm={handleDeactivateConfirm}
        title="Confirmar desactivación"
        message="¿Estás seguro de que deseas desactivar la asignatura"
        highlightedText={subjectToToggle?.name || ''}
        confirmText="Desactivar"
        cancelText="Cancelar"
        isLoading={updateSubject.isPending}
        variant="danger"
      />

      {/* Diálogo de confirmación para activar asignatura */}
      <ConfirmDialog
        visible={activateDialogVisible}
        onDismiss={handleActivateCancel}
        onConfirm={handleActivateConfirm}
        title="Confirmar activación"
        message="¿Estás seguro de que deseas activar la asignatura"
        highlightedText={subjectToToggle?.name || ''}
        confirmText="Activar"
        cancelText="Cancelar"
        isLoading={updateSubject.isPending}
        variant="success"
      />
    </View>
  );
}
