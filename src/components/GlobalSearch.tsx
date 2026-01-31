import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../theme';
import { addOpacity } from '../utils/colorUtils';

interface GlobalSearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

// Buscador global
export function GlobalSearch({ value, onChangeText, onSubmit }: GlobalSearchProps) {
  const theme = useAppTheme();

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.colors.background,
        borderColor: addOpacity(theme.colors.secondary, 0.15),
        borderWidth: 1,
      }
    ]}>
      <MaterialCommunityIcons name="magnify" size={20} color={theme.colors.grey} />
      <TextInput
        style={[
          styles.input,
          {
            color: theme.colors.onSurface,
            ...theme.fonts.bodyMedium,
            outlineStyle: 'none',
          } as any
        ]}
        placeholder="Buscar usuarios, aulas, lectores..."
        placeholderTextColor={theme.colors.grey}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    flex: 1,
    maxWidth: 500,
    minWidth: 200,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
});
