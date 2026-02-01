import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Pressable, ListRenderItem } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../theme';
import { StyledCard } from './StyledCard';

export interface ColumnConfig<T> {
  key: string;
  label: string;
  flex: number;
  sortable?: boolean;
  sortKey?: keyof T | ((item: T) => string | number);
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  keyExtractor: (item: T) => string;
  renderRow: (item: T) => React.ReactNode;
  isLoading?: boolean;
  onRefresh?: () => void;
  emptyMessage?: string;
  defaultSortKey?: string;
  defaultSortOrder?: 'asc' | 'desc';
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  renderRow,
  isLoading = false,
  onRefresh,
  emptyMessage = 'No hay datos disponibles',
  defaultSortKey,
  defaultSortOrder = 'asc',
}: DataTableProps<T>) {
  const theme = useAppTheme();
  const [sortField, setSortField] = useState<string | undefined>(defaultSortKey);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(defaultSortOrder);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  const handleSort = (columnKey: string) => {
    if (sortField === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(columnKey);
      setSortOrder('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField) return data;

    const column = columns.find(col => col.key === sortField);
    if (!column || column.sortable === false) return data;

    return [...data].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (typeof column.sortKey === 'function') {
        aValue = column.sortKey(a);
        bValue = column.sortKey(b);
      } else if (column.sortKey) {
        aValue = a[column.sortKey];
        bValue = b[column.sortKey];
      } else {
        return 0;
      }

      let compareValue = 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        compareValue = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        compareValue = aValue - bValue;
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });
  }, [data, sortField, sortOrder, columns]);

  return (
    <View style={styles.container}>
      <StyledCard style={styles.tableCard}>
        <FlatList
          data={sortedData}
          keyExtractor={keyExtractor}
          ListHeaderComponent={() => (
            <View style={[styles.tableHeader, { backgroundColor: theme.colors.secondary }]}>
              {columns.map((column) => {
                const isActive = sortField === column.key;
                const isHovered = hoveredColumn === column.key;
                
                return (
                  <Pressable
                    key={column.key}
                    style={[styles.headerCell, { flex: column.flex }]}
                    onPress={() => column.sortable !== false && handleSort(column.key)}
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
          )}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
                colors={[theme.colors.secondary]}
              />
            ) : undefined
          }
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.row, { borderBottomColor: theme.colors.outlineVariant }]}>
              {renderRow(item)}
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.centered}>
              <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
                {emptyMessage}
              </Text>
            </View>
          )}
        />
      </StyledCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    padding: 24,
    alignItems: 'center',
  },
  listContent: {
    flexGrow: 1,
  },
  tableCard: {
    margin: 0,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  headerCell: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
});
