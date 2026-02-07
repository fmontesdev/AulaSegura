import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Appbar, ActivityIndicator, Text, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../../theme';
import { UserForm } from '../../../components/UserForm';
import { StyledSnackbar } from '../../../components/StyledSnackbar';
import { useUser, useUpdateUser } from '../../../hooks/queries/useUsers';
import { UserEditFormData } from '../../../schemas/user.schema';

export default function EditUserScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: user, isLoading, isError } = useUser(id);
  const updateUser = useUpdateUser();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (data: UserEditFormData) => {
    if (!id) return;

    try {
      await updateUser.mutateAsync({ userId: id, data });
      router.back();
    } catch (error: any) {
      console.error('Error updating user:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Error al actualizar el usuario';
      setSnackbarMessage(errorMessage);
      setSnackbarVisible(true);
    }
  };

  if (isLoading) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => (
              <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Editar Usuario" />
              </Appbar.Header>
            ),
          }}
        />
        <View style={[styles.container, styles.centered]}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  if (isError || !user) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => (
              <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Editar Usuario" />
              </Appbar.Header>
            ),
          }}
        />
        <View style={[styles.container, styles.centered]}>
          <Text>Error al cargar el usuario</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
              <Appbar.BackAction onPress={() => router.back()} />
              <Appbar.Content title="Editar Usuario" />
            </Appbar.Header>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <IconButton
              icon="arrow-left"
              size={22}
              onPress={() => router.back()}
              iconColor={theme.colors.secondary}
            />
            <Text variant="headlineMedium" style={{ color: theme.colors.secondary }}>
              Editar Usuario
            </Text>
          </View>
        </View>

        <UserForm
          mode="edit"
          initialData={user}
          onSubmit={handleSubmit}
          isLoading={updateUser.isPending}
        />

        <StyledSnackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          message={snackbarMessage}
          variant="error"
          action={{
            label: 'Cerrar',
            onPress: () => setSnackbarVisible(false),
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -4,
    marginLeft: -6,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
