import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Menu, TextInput, HelperText } from 'react-native-paper';
import { Controller, Control, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { useAppTheme } from '../theme';
import { addOpacity } from '../utils/colorUtils';

export interface MenuSelectOption {
  value: string | number;
  label: string;
}

interface FormMenuSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errors: FieldErrors<T>;
  options: MenuSelectOption[];
  isLoading?: boolean;
  loadingText?: string;
  emptyText?: string;
  disabled?: boolean;
}

export function FormMenuSelect<T extends FieldValues>({
  control,
  name,
  label,
  errors,
  options,
  isLoading = false,
  loadingText = 'Cargando...',
  emptyText = 'No hay opciones disponibles',
  disabled = false,
}: FormMenuSelectProps<T>) {
  const theme = useAppTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const selectedOption = options.find((opt) => opt.value === value);

        return (
          <View>
            <Menu
              visible={menuVisible && !disabled}
              onDismiss={() => setMenuVisible(false)}
              anchorPosition="bottom"
              elevation={1}
              contentStyle={[styles.menuContent, { backgroundColor: theme.colors.onTertiary }]}
              style={styles.menuContainer}
              anchor={
                <Pressable onPress={() => !disabled && setMenuVisible(true)} disabled={disabled}>
                  <TextInput
                  label={label}
                  value={selectedOption?.label || ''}
                  mode="outlined"
                  dense
                  error={!!error}
                  style={[styles.input, { backgroundColor: theme.colors.onTertiary }]}
                  outlineColor={menuVisible ? theme.colors.tertiary : theme.colors.outline}
                  activeOutlineColor={theme.colors.tertiary}
                  outlineStyle={[styles.inputOutline, menuVisible && styles.inputOutlineFocused]}
                  theme={{ colors: { onSurfaceVariant: theme.colors.grey } }}
                  contentStyle={theme.fonts.bodyMedium}
                  editable={false}
                  disabled={disabled}
                  right={
                    <TextInput.Icon
                      icon={menuVisible ? 'menu-up' : 'menu-down'}
                      style={styles.menuIcon}
                      forceTextInputFocus={false}
                      disabled
                    />
                  }
                  pointerEvents="none"
                  />
                </Pressable>
              }
            >
              <ScrollView style={styles.menuScroll}>
                {isLoading ? (
                  <Menu.Item title={loadingText} disabled />
                ) : options.length > 0 ? (
                  options.map((option) => (
                    <Menu.Item
                      key={String(option.value)}
                      onPress={() => {
                        onChange(option.value);
                        setMenuVisible(false);
                      }}
                      title={option.label}
                      style={
                        value === option.value
                          ? [styles.selectedMenuItem, { backgroundColor: addOpacity(theme.colors.surfaceVariant, 0.7) }]
                          : styles.menuItem
                      }
                      titleStyle={theme.fonts.bodyMedium}
                      rippleColor={addOpacity(theme.colors.secondary, 0.2)}
                    />
                  ))
                ) : (
                  <Menu.Item title={emptyText} disabled />
                )}
              </ScrollView>
            </Menu>
            {error && (
              <HelperText type="error" visible={!!error}>
                {error.message as string}
              </HelperText>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
  },
  inputOutline: {
    borderRadius: 20,
  },
  inputOutlineFocused: {
    borderWidth: 1.5,
  },
  menuIcon: {
    width: 32,
    height: 32,
  },
  menuContainer: {
    marginTop: 10,
    width: '100%',
  },
  menuContent: {
    borderRadius: 20,
    alignSelf: 'flex-end',
    paddingVertical: 15,
    marginLeft: 'auto',
    maxHeight: 268,
    minWidth: 225,
  },
  menuScroll: {
    maxHeight: 286,
  },
  menuItem: {
    height: 34,
    minHeight: 34,
  },
  selectedMenuItem: {
    height: 34,
    minHeight: 34,
  },
});
