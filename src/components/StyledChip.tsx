import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Chip } from 'react-native-paper';
import { addOpacity } from '../utils/colorUtils';

interface StyledChipProps {
  children: string;
  color: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

// Chip con borderRadius, texto con estilos, y backgroundColor con opacidad
export function StyledChip({ children, color, style, textStyle }: StyledChipProps) {
  return (
    <Chip
      mode="flat"
      compact
      style={[
        styles.chip,
        { backgroundColor: addOpacity(color, 0.12) },
        style,
      ]}
      textStyle={[
        styles.text,
        { color },
        textStyle,
      ]}
    >
      {children}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 20,
  },
  text: {
    fontSize: 11,
  },
});
