import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Badge } from 'react-native-paper';
import { useAppTheme } from '../../../theme';

interface TabLabelWithBadgeProps {
  label: string;
  badge?: number;
  focused: boolean;
}

// Etiqueta de pestaña con badge opcional
export function TabLabelWithBadge({ label, badge, focused }: TabLabelWithBadgeProps) {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: focused ? theme.colors.primary : theme.colors.grey }]}>
        {label}
      </Text>
      {badge !== undefined && badge > 0 && (
        <Badge style={[styles.badge, { backgroundColor: theme.colors.error }]} size={18}>
          {badge}
        </Badge>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
  },
  badge: {
    marginLeft: 4,
  },
});
