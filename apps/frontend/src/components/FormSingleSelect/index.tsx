import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Menu, TextInput, HelperText } from 'react-native-paper';
import { Controller, Control, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { useAppTheme } from '../../theme';
import { SingleSelectOption, SingleSelectItem } from './components/SingleSelectItem';
import { styles } from './FormSingleSelect.styles';

export type { SingleSelectOption };

interface FormSingleSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errors: FieldErrors<T>;
  options: SingleSelectOption[];
  isLoading?: boolean;
  loadingText?: string;
  emptyText?: string;
  disabled?: boolean;
}

export function FormSingleSelect<T extends FieldValues>({
  control,
  name,
  label,
  errors,
  options,
  isLoading = false,
  loadingText = 'Cargando...',
  emptyText = 'No hay opciones disponibles',
  disabled = false,
}: FormSingleSelectProps<T>) {
  const theme = useAppTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const error = errors[name];

  const handleSelect = (onChange: (value: any) => void, value: string | number) => {
    onChange(value);
    setMenuVisible(false);
  };

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
                    <SingleSelectItem
                      key={String(option.value)}
                      option={option}
                      isSelected={value === option.value}
                      onSelect={(selectedValue) => handleSelect(onChange, selectedValue)}
                      theme={theme}
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
