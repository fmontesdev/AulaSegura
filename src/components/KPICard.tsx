import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../theme';
import { addOpacity } from '../utils/colorUtils';
import { StyledCard } from './StyledCard';
import { StyledChip } from './StyledChip';
import { KPIData } from '../types/Dummies';

// Omit hace omitir la propiedad route del tipo KPIData
interface KPICardProps extends Omit<KPIData, 'route'> {
  onPress?: () => void;
}

export function KPICard({ title, value, icon, color, badge, onPress }: KPICardProps) {
  const theme = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.wrapper,
        {
          transform: isHovered ? [{ scale: 1.025 }] : [{ scale: 1 }],
          // @ts-ignore - transitionDuration es válido en React Native Web
          transitionDuration: '200ms',
        },
      ]}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <StyledCard>
        <StyledCard.Content style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: addOpacity(color, 0.12) }]}>
            <MaterialCommunityIcons name={icon} size={32} color={color} />
          </View>
          <View style={styles.textContainer}>
            <Text variant="headlineMedium" style={styles.value}>
              {value}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.grey }}>
              {title}
            </Text>
            {badge && (
              <StyledChip color={theme.colors.warning} style={styles.badge}>
                {badge}
              </StyledChip>
            )}
          </View>
        </StyledCard.Content>
      </StyledCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minWidth: 200,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  value: {
    fontWeight: '700',
    marginBottom: 4,
  },
  badge: {
    marginTop: 4,
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
});
