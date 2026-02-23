import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../theme';
import { Notification } from '../../../types/Notification';
import { addOpacity } from '../../../utils/colorUtils';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

// Item de notificación
export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const theme = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);

  const getIconName = (type: string) => {
    switch (type) {
      case 'warning':
        return 'alert';
      case 'error':
        return 'alert-circle';
      default:
        return 'check-circle';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'warning':
        return theme.colors.warning;
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.success;
    }
  };

  return (
    <Pressable
      style={[
        styles.container,
        !notification.read && { backgroundColor: addOpacity(theme.colors.secondary, 0.05) },
        isHovered && { backgroundColor: addOpacity(theme.colors.secondary, 0.1) },
      ]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons
          name={getIconName(notification.type)}
          size={20}
          color={getIconColor(notification.type)}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text variant="bodyMedium" numberOfLines={2}>
            {notification.title}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.grey }}>
            {notification.time}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
});
