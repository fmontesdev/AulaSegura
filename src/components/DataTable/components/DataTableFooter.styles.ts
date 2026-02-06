import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 12,
  },
  paginationLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  limitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  limitButton: {
    minWidth: 32,
  },
  limitMenuContent: {
    borderRadius: 15,
    paddingVertical: 0,
    maxHeight: 200,
    maxWidth: 50,
    marginTop: 3,
    marginLeft: -9,
    alignItems: 'center',
    overflow: 'hidden',
  },
  paginationControls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 0,
  },
  paginationText: {},
  limitLabelText: {
    marginRight: 8,
  },
  limitButtonLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginHorizontal: 0,
    marginVertical: 4.5,
  },
  limitButtonBorder: {
    borderWidth: 1,
    borderRadius: 20,
  },
  limitMenuItem: {
    height: 26,
    minHeight: 26,
  },
  limitMenuItemContent: {
    minHeight: 26,
    height: 26,
    paddingVertical: 0,
  },
  limitMenuItemTitle: {
    textAlign: 'center',
    paddingRight: 4,
    lineHeight: 16,
  },
  paginationPageText: {
    marginHorizontal: 0,
  },
  iconButtonEdge: {
    marginHorizontal: 0,
  },
  iconButtonPrev: {
    marginLeft: 0,
    marginRight: 4,
  },
  iconButtonNext: {
    marginLeft: 4,
    marginRight: 0,
  },
});
