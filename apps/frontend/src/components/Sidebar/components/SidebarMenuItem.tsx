import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Badge } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../../theme';
import { MenuItem } from '../../../data/sidebarData';

interface SidebarMenuItemProps {
  item: MenuItem;
  isCollapsed: boolean;
  isActive: boolean;
  onPress: () => void;
}

// Item de menú del Sidebar
export function SidebarMenuItem({ item, isCollapsed, isActive, onPress }: SidebarMenuItemProps) {
  const theme = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={[
        styles.menuItem,
        {
          // @ts-ignore - transitionDuration es válido en React Native Web
          transitionDuration: '200ms',
        },
      ]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      {(isActive || isHovered) && (
        <View
          style={[
            styles.menuItemBackground,
            {
              backgroundColor: theme.colors.onPrimaryContainer,
              opacity: isActive ? 0.25 : 0.12,
            },
          ]}
        />
      )}
      <View style={styles.menuItemContent}>
        <MaterialCommunityIcons
          name={item.icon}
          size={24}
          color={isActive ? theme.colors.onPrimary : theme.colors.quaternary}
        />
        {!isCollapsed && (
          <>
            <Text
              variant="bodyMedium"
              style={[
                styles.menuLabel,
                isActive
                  ? [styles.menuLabelActive, { color: theme.colors.onPrimary }]
                  : { color: theme.colors.quaternary },
              ]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
            {item.badge !== undefined && item.badge > 0 && (
              <Badge style={[styles.badge, { backgroundColor: theme.colors.error }]}>
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginVertical: 1,
    position: 'relative',
  },
  menuItemBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    marginLeft: 12,
  },
  menuLabelActive: {
    fontWeight: '600',
  },
  badge: {
    marginLeft: 14,
    marginBottom: 1,
  },
});
