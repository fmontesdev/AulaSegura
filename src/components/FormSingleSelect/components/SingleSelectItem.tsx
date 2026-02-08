import React from 'react';
import { Menu } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper';
import { addOpacity } from '../../../utils/colorUtils';
import { styles } from '../FormSingleSelect.styles';

export interface SingleSelectOption {
  value: string | number;
  label: string;
}

interface SingleSelectItemProps {
  option: SingleSelectOption;
  isSelected: boolean;
  onSelect: (value: string | number) => void;
  theme: MD3Theme;
}

export function SingleSelectItem({ option, isSelected, onSelect, theme }: SingleSelectItemProps) {
  return (
    <Menu.Item
      key={String(option.value)}
      onPress={() => onSelect(option.value)}
      title={option.label}
      style={
        isSelected
          ? [styles.selectedMenuItem, { backgroundColor: addOpacity(theme.colors.surfaceVariant, 0.6) }]
          : styles.menuItem
      }
      titleStyle={theme.fonts.bodyMedium}
      rippleColor={addOpacity(theme.colors.secondary, 0.2)}
    />
  );
}
