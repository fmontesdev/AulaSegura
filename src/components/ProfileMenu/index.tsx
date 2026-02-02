import React, { useState } from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Text, Menu, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../../theme';
import { addOpacity } from '../../utils/colorUtils';
import { User } from '../../types/User';
import { API_CONFIG } from '../../constants';
import { ProfileMenuItem } from './components/ProfileMenuItem';

interface UserProfileMenuProps {
  user: User | null;
  onLogout: () => void;
}

// Menú de perfil de usuario del Topbar
export function UserProfileMenu({ user, onLogout }: UserProfileMenuProps) {
  const theme = useAppTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const showUserInfo = width >= 768; // Mostrar nombre solo en pantallas grandes

  const avatarUrl = user?.avatar
    ? `${API_CONFIG.IMAGE_SERVER_URL}/${user.avatar}`
    : undefined;

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Pressable
            onPress={() => setVisible(true)}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
            style={[
              styles.button,
              {
                // Solo aplicar background si se muestra la info del usuario
                backgroundColor: showUserInfo && isHovered 
                  ? addOpacity(theme.colors.secondary, 0.1) 
                  : 'transparent',
                borderRadius: 25,
                // paddingVertical: 4,
                paddingRight: showUserInfo ? 14 : 8,
                // Aplicar opacidad al avatar cuando no se muestra la info
                opacity: !showUserInfo && isHovered ? 0.85 : 1,
                // @ts-ignore
                transitionDuration: '200ms',
              },
            ]}
          >
            {avatarUrl ? (
              <Avatar.Image size={40} source={{ uri: avatarUrl }} />
            ) : (
              <Avatar.Text
                size={40}
                label={`${user?.name?.[0] || ''}${user?.lastname?.[0] || ''}`}
                style={{ backgroundColor: theme.colors.primary }}
              />
            )}
            {showUserInfo && (
              <View style={styles.info}>
                <Text variant="bodyMedium" style={styles.name} numberOfLines={1}>
                  {user?.name} {user?.lastname}
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.grey }} numberOfLines={1}>
                  Administrador
                </Text>
              </View>
            )}
          </Pressable>
        }
        contentStyle={[styles.menu, { backgroundColor: theme.colors.surface }]}
      >
        <ProfileMenuItem
          title="Mi Perfil"
          icon="account"
          onPress={() => {
            setVisible(false);
            router.push('/profile');
          }}
        />
        <ProfileMenuItem
          title="Configuración"
          icon="cog"
          onPress={() => {
            setVisible(false);
            router.push('/settings');
          }}
        />
        <ProfileMenuItem
          title="Cerrar Sesión"
          icon="logout"
          variant="danger"
          onPress={() => {
            setVisible(false);
            onLogout();
          }}
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  info: {
    maxWidth: 150,
  },
  name: {
    fontWeight: '600',
  },
  menu: {
    marginTop: 64,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
