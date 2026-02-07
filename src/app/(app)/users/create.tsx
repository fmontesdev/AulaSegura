import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';
import { useAppTheme } from '../../../theme';
import { UserForm } from '../../../components/UserForm';
import { StyledSnackbar } from '../../../components/StyledSnackbar';
import { useCreateUser } from '../../../hooks/queries/useUsers';
import { UserCreateFormData } from '../../../schemas/user.schema';

export default function CreateUserScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const createUser = useCreateUser();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (data: UserCreateFormData) => {
    try {
      // Crear el usuario y lo retorna para que el UserForm pueda subir el avatar si es necesario
      const newUser = await createUser.mutateAsync(data);
      router.back();
      return newUser;
    } catch (error: any) {
      console.error('Error creating user:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Error al crear el usuario';
      setSnackbarMessage(errorMessage);
      setSnackbarVisible(true);
      throw error; // Re-lanza para UserForm
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
              <Appbar.BackAction onPress={() => router.back()} />
              <Appbar.Content title="Crear Usuario" />
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
              Nuevo Usuario
            </Text>
          </View>
        </View>

        <UserForm
          mode="create"
          onSubmit={handleSubmit}
          isLoading={createUser.isPending}
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
