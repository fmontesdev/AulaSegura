import React from 'react';
import { Pressable } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';
import { addOpacity } from '../../../utils/colorUtils';
import { MultiSelectOption } from '../index';
import { styles } from '../FormMultiSelect.styles';

interface MultiSelectItemProps {
  option: MultiSelectOption;
  isSelected: boolean;
  isHovered: boolean;
  onToggle: (value: string | number) => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
  theme: MD3Theme;
}

export function MultiSelectItem({
  option,
  isSelected,
  isHovered,
  onToggle,
  onHoverIn,
  onHoverOut,
  theme,
}: MultiSelectItemProps) {
  return (
    <Pressable
      onPress={() => onToggle(option.value)}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      style={[
        styles.switchItem,
        isSelected && {
          backgroundColor: addOpacity(theme.colors.surfaceVariant, 0.6),
        },
        isHovered && !isSelected && {
          backgroundColor: addOpacity(theme.colors.secondary, 0.08),
        },
      ]}
    >
      <Text variant="bodyMedium" style={styles.switchLabel}>
        {option.label}
      </Text>
      <Switch
        value={isSelected}
        onValueChange={() => onToggle(option.value)}
        color={theme.colors.tertiary}
        style={styles.switch}
      />
    </Pressable>
  );
}
