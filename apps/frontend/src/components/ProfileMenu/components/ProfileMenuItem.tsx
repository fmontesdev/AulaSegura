import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../theme';
import { addOpacity } from '../../../utils/colorUtils';

interface ProfileMenuItemProps {
  title: string;
  icon: string;
  onPress: () => void;
  variant?: 'default' | 'danger';
}

// Item del menú de perfil de usuario
export function ProfileMenuItem({ title, icon, onPress, variant = 'default' }: ProfileMenuItemProps) {
  const theme = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={[
        styles.container,
        isHovered && { backgroundColor: addOpacity(theme.colors.secondary, 0.08) },
      ]}
    >
      <MaterialCommunityIcons
        name={icon as any}
        size={20}
        color={variant === 'danger' ? theme.colors.error : theme.colors.onSurface}
        style={styles.icon}
      />
      <Text
        variant="bodyMedium"
        style={[
          styles.text,
          variant === 'danger' && { color: theme.colors.error },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 11,
    paddingRight: 20,
    paddingVertical: 10,
    minHeight: 40,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    flex: 1,
  },
});
