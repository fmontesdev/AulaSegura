import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Menu } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../theme';
import { addOpacity } from '../utils/colorUtils';
import { GlobalSearch } from './GlobalSearch';

interface SearchMenuProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

// Menú de búsqueda global del Topbar (versión responsive)
export function SearchMenu({ value, onChangeText, onSubmit }: SearchMenuProps) {
  const theme = useAppTheme();
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = () => {
    onSubmit();
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Pressable
          style={[
            styles.iconButton,
            {
              backgroundColor: isHovered ? addOpacity(theme.colors.secondary, 0.1) : 'transparent',
              borderRadius: 25,
              // @ts-ignore
              transitionDuration: '200ms',
            },
          ]}
          onPress={() => setVisible(true)}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
        >
          <MaterialCommunityIcons name="magnify" size={24} color={theme.colors.grey} />
        </Pressable>
      }
      contentStyle={[
        styles.menu,
        { backgroundColor: theme.colors.surface }
      ]}
    >
      <View style={styles.menuContent}>
        <GlobalSearch
          value={value}
          onChangeText={onChangeText}
          onSubmit={handleSubmit}
        />
      </View>
    </Menu>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
  },
  menu: {
    marginTop: 64,
    minWidth: 320,
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
  },
  menuContent: {
    padding: 12,
  },
});
