import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { useAppTheme } from '../theme';
import { addOpacity } from '../utils/colorUtils';

interface ExpandButtonProps {
  // Estado de expansión (true = expandido, false = contraído)
  isExpanded: boolean;

  // Función a ejecutar cuando se presiona el botón
  onToggle: () => void;

  // Número de items restantes que se pueden mostrar (cuando no está expandido)
  remainingCount?: number;

  // Texto a mostrar cuando está expandido
  collapseText?: string;

  // Texto personalizado a mostrar cuando está contraído
  expandText?: string;

  // Color del texto y del ícono
  color?: string;

  // Color de fondo al hacer hover
  hoverColor?: string;
}

export function ExpandButton({
  isExpanded,
  onToggle,
  remainingCount,
  collapseText = 'Ocultar',
  expandText,
  color,
  hoverColor,
}: ExpandButtonProps) {
  const theme = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Determinar el color del texto/ícono
  const textColor = color || theme.colors.tertiary;

  // Determinar el color de fondo en hover
  const backgroundColorOnHover = hoverColor || addOpacity(theme.colors.secondary, 0.05);

  // Determinar el texto a mostrar
  const displayText = isExpanded
    ? collapseText
    : expandText || (remainingCount !== undefined ? `${remainingCount} más` : 'Ver más');

  // Determinar el ícono
  const iconName = isExpanded ? 'chevron-up' : 'chevron-down';

  const button = (
    <Pressable
      onPress={onToggle}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={[
        styles.button,
        {
          backgroundColor: isHovered ? backgroundColorOnHover : 'transparent',
          borderColor: theme.colors.quaternary,
        },
      ]}
    >
      <Text variant="bodySmall" style={[styles.text, { color: textColor }]}>
        {displayText}
      </Text>
      <Icon source={iconName} size={18} color={textColor} />
    </Pressable>
  );

  // Si está expandido, envolver en un View para forzar salto de línea
  if (isExpanded) {
    return (
      <View style={styles.expandedWrapper}>
        {button}
      </View>
    );
  }

  return button;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 9,
    paddingRight: 4,
    borderRadius: 15,
    borderWidth: 1,
  },
  expandedWrapper: {
    flexBasis: '100%',
    alignItems: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});
