import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Chip } from 'react-native-paper';
import { useAppTheme } from '../theme';
import { addOpacity } from '../utils/colorUtils';

interface StyledChipProps {
  text?: string;
  children?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onClose?: () => void;
  onPress?: () => void;
}

// Chip con borderRadius, texto con estilos, y backgroundColor con opacidad
export function StyledChip({ 
  text, 
  children, 
  color, 
  style, 
  textStyle,
  onClose,
  onPress,
}: StyledChipProps) {
  const theme = useAppTheme();


  const chipColor = color || theme.colors.primary;
  const displayText = text || children || '';

  return (
    <Chip
      mode="flat"
      compact
      onClose={onClose}
      closeIcon="close"
      onPress={onPress}
      rippleColor={addOpacity(chipColor, 0.16)}
      style={[
        styles.chip,
        { backgroundColor: addOpacity(chipColor, 0.12) },
        style,
      ]}
      textStyle={[
        styles.text,
        theme.fonts.labelSmall,
        { color: chipColor },
        textStyle,
      ]}
    >
      {displayText}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 20,
  },
  text: {
    marginVertical: 5,
  }
});
