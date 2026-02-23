import React, { ReactNode, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { useAppTheme } from '../theme';
import { StyledCard } from './StyledCard';
import { addOpacity } from '../utils/colorUtils';

interface WidgetCardProps {
  title: string;
  actionLabel: string;
  onActionPress: () => void;
  children: ReactNode;
  style?: any;
}

/**
 * Card de widget para dashboard con título, acción y contenido personalizable
 */
export function WidgetCard({ title, actionLabel, onActionPress, children, style }: WidgetCardProps) {
  const theme = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledCard style={style}>
      <StyledCard.Content>
        <View style={styles.header}>
          <Text variant="titleLarge" style={{ color: theme.colors.secondary }}>
            {title}
          </Text>
          <Pressable
            onPress={onActionPress}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 12,
              backgroundColor: isHovered ? addOpacity(theme.colors.tertiary, 0.08) : 'transparent',
              // @ts-ignore - transitionDuration es válido en React Native Web
              transitionDuration: '200ms',
            }}
          >
            <Text style={{ color: theme.colors.tertiary }}>
              {actionLabel}
            </Text>
          </Pressable>
        </View>
        <Divider style={{ marginVertical: 12 }} />
        {children}
      </StyledCard.Content>
    </StyledCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
