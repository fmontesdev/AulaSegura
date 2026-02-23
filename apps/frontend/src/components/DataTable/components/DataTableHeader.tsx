import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../../theme';
import { ColumnConfig } from '../index';

interface DataTableHeaderProps<T> {
  columns: ColumnConfig<T>[];
  sortField?: string;
  sortOrder: 'asc' | 'desc';
  onSort: (columnKey: string) => void;
}

export function DataTableHeader<T>({
  columns,
  sortField,
  sortOrder,
  onSort,
}: DataTableHeaderProps<T>) {
  const theme = useAppTheme();
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  return (
    <View style={[styles.tableHeader, { backgroundColor: theme.colors.tertiary }]}>
      {columns.map((column) => {
        const isActive = sortField === column.key;
        const isHovered = hoveredColumn === column.key;
        
        return (
          <Pressable
            key={column.key}
            style={[styles.headerCell, { flex: column.flex }]}
            onPress={() => column.sortable !== false && onSort(column.key)}
            onHoverIn={() => column.sortable !== false && setHoveredColumn(column.key)}
            onHoverOut={() => setHoveredColumn(null)}
            disabled={column.sortable === false}
          >
            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onPrimary,
                fontWeight: (isHovered || isActive) ? '600' : '500',
              }}
            >
              {column.label} {isActive && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  headerCell: {
    justifyContent: 'center',
  },
});
