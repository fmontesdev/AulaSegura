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
    flex: 0.8,
    justifyContent: 'center',
  },
  cellName: {
    flex: 1.8,
    justifyContent: 'center',
  },
  cellStage: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cellLevel: {
    flex: 0.5,
    justifyContent: 'center',
  },
  cellCFLevel: {
    flex: 0.6,
    justifyContent: 'center',
  },
  cellStatus: {
    flex: 0.7,
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
});
