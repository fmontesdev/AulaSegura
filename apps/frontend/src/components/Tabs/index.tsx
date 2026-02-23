import React from 'react';
import { View, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { Slot, usePathname, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../theme';
import { TabProps } from '../../types/Tab';
import { TabLabelWithBadge } from './components/TabLabelWithBadge';

// Barra de pestañas superior con navegación real en el historial
export default function Tabs({ tabs }: TabProps) {
  const theme = useAppTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const showOnlyIcons = width < 768;

  return (
    <View style={styles.container}>
      {/* Tab bar */}
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.outlineVariant,
          },
        ]}
      >
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.route || pathname.startsWith(`${tab.route}/`);
          const color = isActive ? theme.colors.secondary : theme.colors.grey;

          return (
            <Pressable
              key={tab.name}
              onPress={() => router.push(tab.route as any)}
              style={[
                styles.tabItem,
                showOnlyIcons && styles.tabItemIconOnly,
              ]}
            >
              <MaterialCommunityIcons name={tab.icon} size={20} color={color} />

              {!showOnlyIcons &&
                (tab.badge !== undefined ? (
                  <TabLabelWithBadge
                    label={tab.title}
                    badge={tab.badge}
                    focused={isActive}
                  />
                ) : (
                  <Text style={[styles.tabLabel, { color }]}>{tab.title}</Text>
                ))}

              {isActive && (
                <View
                  style={[
                    styles.indicator,
                    { backgroundColor: theme.colors.secondary },
                  ]}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Contenido de la ruta activa */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 0,
    shadowOpacity: 0,
    overflow: 'hidden',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 13,
    paddingHorizontal: 16,
    position: 'relative',
  },
  tabItemIconOnly: {
    paddingHorizontal: 12,
    minWidth: 60,
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  content: {
    flex: 1,
  },
});
