import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../theme';
import { StyledChip } from './StyledChip';
import { Reservation } from '../types/Dummies';

// Omit hace omitir la propiedad id del tipo Reservation
interface ReservationItemProps extends Omit<Reservation, 'id'> {}

// Item de reserva para widgets del dashboard
export function ReservationItem({ classroom, user, time, status }: ReservationItemProps) {
  const theme = useAppTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      case 'rejected':
        return theme.colors.error;
      default:
        return theme.colors.grey;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'pending':
        return 'Pendiente';
      case 'rejected':
        return 'Rechazada';
      default:
        return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons name="door" size={20} color={theme.colors.grey} />
        <View style={styles.textContainer}>
          <Text variant="bodyMedium" style={{ fontWeight: '600' }}>
            {classroom}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.grey }}>
            {user} • {time}
          </Text>
        </View>
      </View>
      <StyledChip color={getStatusColor(status)}>
        {getStatusLabel(status)}
      </StyledChip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
});
