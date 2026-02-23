import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../theme';
import { DeniedAccess } from '../types/Dummies';

// Omit hace omitir la propiedad id del tipo DeniedAccess
interface DeniedAccessItemProps extends Omit<DeniedAccess, 'id'> {}

// Item de acceso denegado para widgets del dashboard
export function DeniedAccessItem({ user, classroom, reason, time }: DeniedAccessItemProps) {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons name="alert-circle" size={20} color={theme.colors.error} />
        <View style={styles.textContainer}>
          <Text variant="bodyMedium" style={{ fontWeight: '600' }}>
            {user}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.grey }}>
            {classroom} • {time}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.error }}>
            {reason}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
});
