import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Chip, Menu, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../theme';
import { addOpacity } from '../utils/colorUtils';
import { academicYears } from '../data/dummies';

interface AcademicYearSelectorProps {
  selectedYear: string;
  onYearSelect: (year: string) => void;
}

// Selector de año académico del Topbar
export function AcademicYearSelector({ selectedYear, onYearSelect }: AcademicYearSelectorProps) {
  const theme = useAppTheme();
  const [visible, setVisible] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Chip
            icon={() => <MaterialCommunityIcons name="calendar" size={18} color={theme.colors.secondary} />}
            mode="outlined"
            style={[
              styles.chip,
              { borderColor: addOpacity(theme.colors.secondary, 0.151), backgroundColor: theme.colors.primaryContainer }
            ]}
            textStyle={{ color: theme.colors.secondary }}
            rippleColor={addOpacity(theme.colors.secondary, 0.1)} // Color del hover
            onPress={() => setVisible(true)}
          >
            {selectedYear}
          </Chip>
        }
        contentStyle={[styles.menu, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.menuContainer}>
          <View style={[styles.titleContainer, { borderBottomColor: theme.colors.outlineVariant }]}>
            <Text variant="titleMedium" style={[styles.title, { color: theme.colors.secondary }]}>
              Año Académico
            </Text>
          </View>
          {academicYears.map(year => (
            <Pressable
              key={year}
              onPress={() => {
                onYearSelect(year);
                setVisible(false);
              }}
              onHoverIn={() => setHoveredYear(year)}
              onHoverOut={() => setHoveredYear(null)}
              style={[
                styles.yearItem,
                hoveredYear === year && { backgroundColor: addOpacity(theme.colors.secondary, 0.05) },
                selectedYear === year && { backgroundColor: addOpacity(theme.colors.secondary, 0.1) },
              ]}
            >
              <Text
                variant="bodyMedium"
                style={{
                  color: selectedYear === year ? theme.colors.secondary : theme.colors.onSurface,
                  fontWeight: selectedYear === year ? '600' : '400',
                }}
              >
                {year}
              </Text>
            </Pressable>
          ))}
        </View>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  chip: {
    borderRadius: 20,
  },
  menu: {
    marginTop: 61,
    minWidth: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuContainer: {
    paddingVertical: 0,
  },
  titleContainer: {
    borderBottomWidth: 1,
  },
  title: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  yearItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
