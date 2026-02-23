import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 2,
    paddingBottom: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 22,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  cellCode: {
    flex: 0.5,
    justifyContent: 'center',
  },
  cellName: {
    flex: 1.2,
    justifyContent: 'center',
  },
  cellDepartment: {
    flex: 0.7,
    justifyContent: 'center',
  },
  cellCourses: {
    flex: 1.2,
    justifyContent: 'center',
    paddingRight: 14,
  },
  cellStatus: {
    flex: 0.4,
    justifyContent: 'center',
  },
  cellActions: {
    flex: 0.27,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipWrapper: {
    alignSelf: 'flex-start',
  },
  coursesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
});
