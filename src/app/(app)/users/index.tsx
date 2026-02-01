import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, ActivityIndicator, FAB, IconButton, Portal, Dialog, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../../../theme';
import { useUsers, useDeleteUser } from '../../../hooks/queries/useUsers';
import { API_CONFIG } from '../../../constants';
import { StyledChip } from '../../../components/StyledChip';
import { DataTable, ColumnConfig } from '../../../components/DataTable';
import { User } from '../../../types/User';

// Pantalla de gestión de usuarios
export default function UsersScreen() {
  const theme = useAppTheme();

  // Hook de TanStack Query para obtener todos los usuarios
  const { data: users, isLoading, error, isFetching, refetch } = useUsers();

  const getRoleLabel = (roles: string[]) => {
    const roleMap: Record<string, string> = {
      admin: 'Administrador',
      teacher: 'Profesor',
      janitor: 'Conserje',
      support_staff: 'Staff',
    };
    return roles.map(role => roleMap[role] || role).join(', ');
  };

  const getRoleColor = (roles: string[]) => {
    if (roles.includes('admin')) return theme.colors.error;
    if (roles.includes('teacher')) return theme.colors.tertiary;
    if (roles.includes('janitor')) return theme.colors.primary;
    return theme.colors.grey;
  };

  const isUserActive = (user: User) => {
    if (!user.validTo) return true;
    const now = new Date();
    const validTo = new Date(user.validTo);
    return validTo > now;
  };

  const columns: ColumnConfig<User>[] = [
    {
      key: 'name',
      label: 'Usuario',
      flex: 1.5,
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
      flex: 1,
      sortKey: (user) => getRoleLabel(user.roles),
    },
    {
      key: 'department',
      label: 'Departamento',
      flex: 1,
      sortKey: (user) => user.department?.name || '',
    },
    {
      key: 'status',
      label: 'Estado',
      flex: 0.5,
      sortKey: (user) => isUserActive(user) ? 1 : 0,
    },
  ];

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="bodyLarge" style={{ marginTop: 16, color: theme.colors.onSurface }}>
          Cargando usuarios...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text variant="titleMedium" style={{ color: theme.colors.error }}>
          Error al cargar usuarios
        </Text>
        <Text variant="bodyMedium" style={{ marginTop: 8, color: theme.colors.onSurface }}>
          {error instanceof Error ? error.message : 'Error desconocido'}
        </Text>
      </View>
    );
  }

  return (
    <DataTable
      data={users || []}
      columns={columns}
      keyExtractor={(user) => user.userId}
      renderRow={(user) => (
        <>
          <View style={styles.cellWithAvatar}>
            <Avatar.Image
              size={32}
              source={{ uri: `${API_CONFIG.IMAGE_SERVER_URL}/${user.avatar}` }}
            />
            <Text variant="bodyMedium" style={{ fontWeight: '600', marginLeft: 12 }}>
              {user.name} {user.lastname}
            </Text>
          </View>

          <View style={styles.cell}>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
              {user.email}
            </Text>
          </View>

          <View style={styles.cell}>
            <View style={styles.chipWrapper}>
              <StyledChip color={getRoleColor(user.roles)}>
                {getRoleLabel(user.roles)}
              </StyledChip>
            </View>
          </View>

          <View style={styles.cell}>
            {user.roles.includes('teacher') && user.department ? (
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                {user.department.name}
              </Text>
            ) : (
              <Text variant="bodyMedium" style={{ color: theme.colors.grey }}>
                &nbsp;
              </Text>
            )}
          </View>

          <View style={styles.cellStatus}>
            <View style={styles.chipWrapper}>
              <StyledChip color={isUserActive(user) ? theme.colors.success : theme.colors.grey}>
                {isUserActive(user) ? 'Activo' : 'Inactivo'}
              </StyledChip>
            </View>
          </View>
        </>
      )}
      isLoading={isFetching}
      onRefresh={refetch}
      emptyMessage="No hay usuarios disponibles"
      defaultSortKey="name"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  cellWithAvatar: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
  cellStatus: {
    flex: 0.5,
    justifyContent: 'center',
  },
  chipWrapper: {
    alignSelf: 'flex-start',
  },
});
