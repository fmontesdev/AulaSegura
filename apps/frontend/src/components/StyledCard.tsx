import React, { ReactNode } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';
import { useAppTheme } from '../theme';

interface StyledCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

// Card con elevation, borderRadius y backgroundColor
function StyledCardComponent({ children, style }: StyledCardProps) {
  const theme = useAppTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.onPrimary }, style]}>
      {children}
    </Card>
  );
}

// Agregar Card.Content como propiedad estática
StyledCardComponent.Content = Card.Content;

export const StyledCard = StyledCardComponent;

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    borderRadius: 30,
  },
});
