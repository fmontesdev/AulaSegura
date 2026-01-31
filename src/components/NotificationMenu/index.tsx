import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Text, Menu, Badge } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../../theme';
import { addOpacity } from '../../utils/colorUtils';
import { NotificationItem } from './components/NotificationItem';
import { Notification } from '../../types/Notification';

interface NotificationMenuProps {
  notifications: Notification[];
}

// Menú de notificaciones del Topbar
export function NotificationMenu({ notifications }: NotificationMenuProps) {
  const theme = useAppTheme();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [isHoveredIcon, setIsHoveredIcon] = useState(false);
  const [isHoveredButton, setIsHoveredButton] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Pressable
            onPress={() => setVisible(true)}
            onHoverIn={() => setIsHoveredIcon(true)}
            onHoverOut={() => setIsHoveredIcon(false)}
            style={[
              styles.iconButton,
              {
                backgroundColor: isHoveredIcon ? addOpacity(theme.colors.secondary, 0.1) : 'transparent',
                borderRadius: 25,
                // @ts-ignore
                transitionDuration: '200ms',
              },
            ]}
          >
            <MaterialCommunityIcons name="bell" size={24} color={theme.colors.grey} />
            {unreadCount > 0 && (
              <Badge style={styles.badge} size={18}>
                {unreadCount}
              </Badge>
            )}
          </Pressable>
        }
        contentStyle={[styles.menu, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.notificationsContainer}>
          <View style={[styles.titleContainer, { borderBottomColor: theme.colors.outlineVariant }]}>
            <Text variant="titleMedium" style={[styles.title, { color: theme.colors.secondary }]}>
              Notificaciones
            </Text>
          </View>
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onPress={() => {
                // TODO: Marcar como leída y navegar
              }}
            />
          ))}
          <Pressable
            onPress={() => {
              setVisible(false);
              router.push('/notifications');
            }}
            onHoverIn={() => setIsHoveredButton(true)}
            onHoverOut={() => setIsHoveredButton(false)}
            style={[styles.viewAllButton, {
              backgroundColor: isHoveredButton ? addOpacity(theme.colors.tertiary, 0.08) : 'transparent',
              // @ts-ignore
              transitionDuration: '200ms',
            }]}
          >
            <Text variant="labelLarge" style={{ color: theme.colors.tertiary }}>
              Ver todas
            </Text>
          </Pressable>
        </View>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  menu: {
    marginTop: 64,
    minWidth: 320,
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
  },
  notificationsContainer: {
    maxHeight: 400,
  },
  titleContainer: {
    borderBottomWidth: 1,
  },
  title: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 6,
  },
});
