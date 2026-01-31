import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addOpacity } from '../utils/colorUtils';
import { QuickAction } from '../types/Dummies';

// Omit hace omitir la propiedad route del tipo QuickAction
interface QuickActionButtonProps extends Omit<QuickAction, 'route'> {
  onPress: () => void;
}

// Botón de acción rápida con icono y título
export function QuickActionButton({ title, icon, color, onPress }: QuickActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={[
        styles.button,
        {
          borderColor: color,
          backgroundColor: isHovered ? addOpacity(color, 0.3) : addOpacity(color, 0.2),
          transform: isHovered ? [{ scale: 1.02 }] : [{ scale: 1 }],
          // @ts-ignore - transitionDuration es válido en React Native Web
          transitionDuration: '150ms',
        },
      ]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <MaterialCommunityIcons name={icon} size={32} color={color} />
      <Text variant="bodyMedium" style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: 150,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
  },
});
