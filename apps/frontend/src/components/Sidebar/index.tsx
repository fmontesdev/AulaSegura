import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useAppTheme } from '../../theme';
import { sidebarMenuItemsData } from '../../data/sidebarData';
import { SidebarMenuItem } from './components/SidebarMenuItem';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const theme = useAppTheme();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = sidebarMenuItemsData;

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  const isActive = (route: string) => {
    // Extraer la ruta base (primer y segundo segmento) para items con tabs
    // Ejemplo: /academic/years -> /academic
    const routeBase = route.split('/').slice(0, 2).join('/');
    const pathnameBase = pathname.split('/').slice(0, 2).join('/');
    
    // Comparar las rutas base para detectar cuando estamos en cualquier tab de la sección
    return pathnameBase === routeBase;
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: isCollapsed ? 64 : 250,
          backgroundColor: theme.colors.primary,
          borderRightColor: theme.colors.outlineVariant,
        },
      ]}
    >
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.quaternary }]}>
        {!isCollapsed ? (
          <>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons name="shield-lock" size={32} color={theme.colors.onPrimary} />
              <Text variant="titleLarge" style={[styles.logoText, { color: theme.colors.onPrimary }]}>
                AulaSegura
              </Text>
            </View>
            <TouchableOpacity onPress={onToggle} style={styles.toggleButton}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={24}
                color={theme.colors.lightGrey}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={onToggle} style={styles.logoButton}>
            <MaterialCommunityIcons name="shield-lock" size={32} color={theme.colors.onPrimary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {menuItems.map(item => (
          <SidebarMenuItem
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            isActive={isActive(item.route)}
            onPress={() => handleNavigate(item.route)}
          />
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: theme.colors.quaternary }]}>
        <Text variant="bodySmall" style={[styles.footerText, { color: theme.colors.quaternary }]}>
          {isCollapsed ? 'v1.0' : 'AulaSegura Admin v1.0'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    borderRightWidth: 1,
    ...Platform.select({
      web: {
        position: 'absolute' as 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 11,
    borderBottomWidth: 1,
    minHeight: 64,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    padding: 0,
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  logoText: {
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
  },
});
