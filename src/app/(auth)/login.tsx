import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppTheme } from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import { LoginSchema, LoginFormValues } from '../../schemas/auth.schema';
import { StyledSnackbar } from '../../components/StyledSnackbar';
import { loginStyles as styles } from './login.styles';

// Pantalla de login, ruta: /login
export default function LoginScreen() {
  const theme = useAppTheme();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  // Configuración de React Hook Form con zodResolver
  const {control, handleSubmit, formState: { errors }} = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur', // Valida cuando el campo pierde el foco
    defaultValues: { email: '', password: '',},
  });

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const onSubmit = async (data: LoginFormValues) => {
    // Si llegamos aquí, los datos ya han pasado todas las validaciones de Zod
    setIsLoading(true);

    try {
      // Intenta hacer login - el AuthContext redirigirá automáticamente a /home
      await signIn(data.email.trim(), data.password);
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Error al iniciar sesión';
      showSnackbar(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = () => {
    // Se ejecuta cuando hay errores de validación
    showSnackbar('Por favor, revisa los datos introducidos');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.content}>
        {/* Logo y título */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text variant="displayLarge" style={{ color: theme.colors.onPrimary }}>
            AulaSegura
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          {/* Email input */}
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => (
                <View style={styles.inputWrapper}>
                  <TextInput
                    label="Introduce tu email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    mode="flat"
                    autoCapitalize="none"
                    autoComplete="email"
                    textContentType="emailAddress"
                    autoCorrect={false}
                    keyboardType="email-address"
                    error={!!errors.email}
                    left={<TextInput.Icon icon="at" color={theme.colors.onPrimary} />}
                    style={[styles.inputStyle, { backgroundColor: theme.colors.quaternary }]}
                    underlineStyle={{ height: 0 }}
                    textColor={theme.colors.onSurface}
                    theme={{ colors: {
                      onSurfaceVariant: theme.colors.primary,
                    } }}
                  />
                </View>
              )}
            />
            {/* Mensaje de error para email */}
            {errors.email?.message ? (
              <HelperText type="error" visible={true} style={styles.helperText}>
                {errors.email.message}
              </HelperText>
            ) : null}
          </View>

          {/* Password input */}
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <View style={styles.inputWrapper}>
                  <TextInput
                    label="Introduce tu contraseña"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    mode="flat"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                    textContentType="password"
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    error={!!errors.password}
                    left={<TextInput.Icon icon="lock-outline" color={theme.colors.onPrimary} />}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        color={theme.colors.onPrimary}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    style={[styles.inputStyle, { backgroundColor: theme.colors.quaternary }]}
                    underlineStyle={{ height: 0 }}
                    textColor={theme.colors.onSurface}
                    theme={{ colors: {
                      onSurfaceVariant: theme.colors.primary,
                    } }}
                  />
                </View>
              )}
            />
            {/* Mensaje de error para contraseña */}
            {errors.password?.message ? (
              <HelperText type="error" visible={true} style={styles.helperText}>
                {errors.password.message}
              </HelperText>
            ) : null}
          </View>

          {/* Link para recuperación de contraseña */}
          <Pressable 
            onPress={() => console.log('Recuperar contraseña')}
            style={({ pressed, hovered }: any) => [
              styles.forgotPasswordContainer,
              hovered && styles.forgotPasswordHovered,
              pressed && styles.forgotPasswordPressed,
            ]}
          >
            <Text variant="bodyLarge" style={{ color: theme.colors.onPrimary }}>
              ¿Se te olvidó la contraseña?
            </Text>
          </Pressable>

          {/* Botón de inicio de sesión */}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit, onError)}
            loading={isLoading}
            disabled={isLoading}
            style={[styles.button, { backgroundColor: theme.colors.tertiary }]}
            contentStyle={styles.buttonContent}
            labelStyle={theme.fonts.titleMedium}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </View>
      </View>

      {/* Snackbar para mostrar mensajes de error */}
      <StyledSnackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        message={snackbarMessage}
        variant="error"
        duration={3000}
        action={{
          label: 'Cerrar',
          onPress: () => setSnackbarVisible(false),
        }}
        usePortal={false}
      />
    </SafeAreaView>
  );
}
