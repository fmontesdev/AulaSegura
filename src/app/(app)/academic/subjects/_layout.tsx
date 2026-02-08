import React from 'react';
import { Stack } from 'expo-router';
import { useAppTheme } from '../../../../theme';

// Layout para la navegación de asignaturas (listado, crear, editar)
export default function SubjectsLayout() {
  const theme = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.colors.background},
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
