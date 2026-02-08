import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    fontSize: 14,
  },
  inputOutline: {
    borderRadius: 20,
  },
  inputOutlineFocused: {
    borderWidth: 1.5,
  },
  menuIcon: {
    width: 32,
    height: 32,
  },
  menuContainer: {
    marginTop: 10,
    width: '100%',
  },
  menuContent: {
    borderRadius: 20,
    alignSelf: 'flex-end',
    paddingVertical: 15,
    marginLeft: 'auto',
    maxHeight: 268,
    minWidth: 225,
  },
  menuScroll: {
    maxHeight: 286,
  },
  menuItem: {
    height: 34,
    minHeight: 34,
  },
  selectedMenuItem: {
    height: 34,
    minHeight: 34,
  },
});
