import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../../theme';
import { TabProps } from '../../types/Tab';
import { TabLabelWithBadge } from './components/TabLabelWithBadge';

// Componente de pestañas superior para el dashboard
const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);

export default function Tabs({ initialRouteName, tabs }: TabProps) {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  
  // En pantallas pequeñas, solo mostrar iconos
  const showOnlyIcons = width < 768;

  return (
    <MaterialTopTabs
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.grey,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.outlineVariant,
          },
        ],
        tabBarIndicatorStyle: [
          styles.tabBarIndicator,
          { backgroundColor: theme.colors.secondary },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: showOnlyIcons ? styles.tabBarItemIconOnly : styles.tabBarItem,
        tabBarScrollEnabled: false,
        tabBarShowLabel: !showOnlyIcons,
        tabBarShowIcon: true,
        swipeEnabled: true,
      }}
    >
      {tabs.map((tab) => (
        <MaterialTopTabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }: { color: string }) => (
              <MaterialCommunityIcons name={tab.icon} size={20} color={color} />
            ),
            ...(tab.badge !== undefined && {
              tabBarLabel: ({ focused }: { focused: boolean }) => (
                <TabLabelWithBadge 
                  label={tab.title} 
                  badge={tab.badge} 
                  focused={focused} 
                />
              ),
            }),
          }}
        />
      ))}
    </MaterialTopTabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabBarIndicator: {
    height: 3,
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'none',
  },
  tabBarItem: {
    flexDirection: 'row',
    width: 'auto',
  },
  tabBarItemIconOnly: {
    flexDirection: 'row',
    width: 'auto',
    minWidth: 60,
    paddingHorizontal: 12,
  },
});
