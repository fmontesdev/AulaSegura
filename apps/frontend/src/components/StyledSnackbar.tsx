import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar, Portal } from 'react-native-paper';
import { useAppTheme } from '../theme';

type SnackbarVariant = 'success' | 'info' | 'warning' | 'error';

interface StyledSnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  variant?: SnackbarVariant;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
  usePortal?: boolean;
}

export function StyledSnackbar({
  visible,
  onDismiss,
  message,
  variant = 'info',
  duration = 4000,
  action,
  usePortal = true,
}: StyledSnackbarProps) {
  const theme = useAppTheme();

  const getColors = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: theme.colors.success,
          textColor: theme.colors.onSuccess,
        };
      case 'error':
        return {
          backgroundColor: theme.colors.error,
          textColor: theme.colors.onError,
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.warning,
          textColor: theme.colors.onWarning,
        };
      case 'info':
      default:
        return {
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.onPrimary,
        };
    }
  };

  const colors = getColors();

  const snackbarContent = (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={[styles.snackbar, { backgroundColor: colors.backgroundColor }]}
      action={
        action
          ? {
              label: action.label,
              onPress: action.onPress,
              textColor: colors.textColor,
            }
          : undefined
      }
    >
      {message}
    </Snackbar>
  );

  return usePortal ? <Portal>{snackbarContent}</Portal> : snackbarContent;
}

const styles = StyleSheet.create({
  snackbar: {
    marginBottom: 20,
    borderRadius: 30,
    alignSelf: 'center',
    maxWidth: 500,
    minWidth: 400,
  },
});
