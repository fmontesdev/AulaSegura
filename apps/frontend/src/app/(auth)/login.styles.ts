import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 70,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 18,
  },
  inputWrapper: {
    borderRadius: 40,
    overflow: 'hidden',
  },
  inputStyle: {
    height: 50,
    marginTop: -2,
  },
  helperText: {
    paddingHorizontal: 12,
    marginTop: 4,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 66,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  forgotPasswordHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  forgotPasswordPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  button: {
    justifyContent: 'center',
    borderRadius: 40,
  },
  buttonContent: {
    paddingVertical: 2,
  },
  snackbar: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 40,
  },
});
