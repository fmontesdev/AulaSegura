import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../theme';

interface PlaceholderScreenProps {
  title: string;
  description: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export default function PlaceholderScreen({ 
  title, 
  description, 
  icon = 'cog' 
}: PlaceholderScreenProps) {
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.onPrimary }]}>
        <Card.Content style={styles.content}>
          <MaterialCommunityIcons 
            name={icon} 
            size={64} 
            color={theme.colors.secondary}
            style={styles.icon}
          />
          <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.secondary }]}>
            {title}
          </Text>
          <Text variant="bodyLarge" style={[styles.description, { color: theme.colors.grey }]}>
            {description}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  card: {
    maxWidth: 500,
    width: '100%',
    elevation: 2,
  },
  content: {
    alignItems: 'center',
    padding: 32,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    marginBottom: 8,
  },
  note: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 16,
  },
});
