import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 22,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
  cellWithAvatar: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellRoles: {
    flex: 1.2,
    justifyContent: 'center',
  },
  cellDepartment: {
    flex: 0.9,
    justifyContent: 'center',
  },
  cellStatus: {
    flex: 0.6,
    justifyContent: 'center',
  },
  cellActions: {
    flex: 0.35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipWrapper: {
    alignSelf: 'flex-start',
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
});
