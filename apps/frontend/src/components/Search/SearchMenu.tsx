import React, { useState } from 'react';
import { View, Pressable, TextInput } from 'react-native';
import { Menu, Badge, Icon } from 'react-native-paper';
import { useAppTheme } from '../../theme';
import { addOpacity } from '../../utils/colorUtils';
import { useFilters } from '../../contexts/FilterContext';
import { StyledChip } from '../StyledChip';
import { styles } from './SearchMenu.styles';

// Menú de búsqueda global del Topbar (versión responsive para pantallas pequeñas)
export function SearchMenu() {
  const theme = useAppTheme();
  const { filters, addFilter, removeFilter, clearFilters } = useFilters();
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClearHovered, setIsClearHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Maneja tecla Enter o coma para agregar filtro
  const handleKeyPress = (e: any) => {
    const key = e.nativeEvent.key;
    
    // Enter o coma para crea chip
    if (key === 'Enter' || key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addFilter(inputValue);
        setInputValue('');
      }
    }
  };

  // Elimina un filtro por índice
  const handleRemoveFilter = (index: number) => {
    removeFilter(index);
  };

  return (
    <View>
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
            <Icon source="magnify" size={24} color={theme.colors.grey} />
            {filters.length > 0 && (
              <Badge
                size={18}
                style={[
                  styles.badge,
                  { backgroundColor: theme.colors.secondary }
                ]}
              >
                {filters.length}
              </Badge>
            )}
          </Pressable>
        }
        contentStyle={[
          styles.menu,
          { backgroundColor: theme.colors.surface }
        ]}
      >
        <View style={styles.menuContent}>
          {/* Contenedor de búsqueda */}
          <View style={[
            styles.searchContainer,
            {
              backgroundColor: theme.colors.background,
              borderColor: addOpacity(theme.colors.secondary, 0.15),
            }
          ]}>
            <Icon source="magnify" size={20} color={theme.colors.grey} />
            
            <View style={styles.chipsAndInputContainer}>
              {/* Chips de filtros dentro del input */}
              {filters.map((filter, index) => (
                <StyledChip
                  key={index}
                  text={filter}
                  // variant={filter.includes(':') ? 'info' : 'default'}
                  color={filter.includes(':') ? theme.colors.tertiary : theme.colors.grey}
                  onClose={() => handleRemoveFilter(index)}
                />
              ))}
              
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.onSurface,
                    ...theme.fonts.bodyMedium,
                  }
                ]}
                placeholder={filters.length === 0 ? "Buscar... Enter o , para agregar" : "Agregar filtro..."}
                placeholderTextColor={theme.colors.grey}
                value={inputValue}
                onChangeText={setInputValue}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            </View>

            {/* Añade botón para limpiar filtros */}
            {filters.length > 0 && (
              <Pressable
                onPress={clearFilters}
                onHoverIn={() => setIsClearHovered(true)}
                onHoverOut={() => setIsClearHovered(false)}
                style={[
                  styles.clearButton,
                  {
                    backgroundColor: isClearHovered ? addOpacity(theme.colors.secondary, 0.1) : 'transparent',
                    // @ts-ignore
                    transitionDuration: '200ms',
                  },
                ]}
              >
                <Icon source="close" size={18} color={theme.colors.darkGrey} />
              </Pressable>
            )}
          </View>
        </View>
      </Menu>
    </View>
  );
}

