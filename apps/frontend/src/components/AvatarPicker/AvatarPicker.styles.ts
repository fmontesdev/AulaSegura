import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 325,
  },
  avatarHeader: {
    marginBottom: 10,
  },
  avatarSectionsColumn: {
    flexDirection: 'column',
    gap: 12,
    alignItems: 'stretch',
    marginTop: -4,
  },
  customAvatarSection: {
    width: '100%',
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  customControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  closeButton: {
    margin: 0,
    width: 32,
    height: 32,
  },
  defaultAvatarSection: {
    width: '100%',
  },
  dividerHorizontal: {
    width: '100%',
    height: 1,
  },
  avatarsCard: {
    width: '99.6%',
    marginHorizontal: 'auto',
    paddingHorizontal: 4,
  },
  customAvatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  avatarOption: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'transparent',
    overflow: 'hidden',
    position: 'relative',
  },
  avatarSelected: {
    borderWidth: 4,
    transform: [{ scale: 1.05 }],
  },
  avatarImage: {
    width: 80,
    height: 80,
  },
  checkmark: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 14,
  },
  uploadButton: {
    minHeight: 30,
    height: 30,
  },
  uploadButtonContent: {
    height: 30,
    paddingHorizontal: 4,
  },
  uploadButtonLabel: {
    fontSize: 13,
    lineHeight: 16,
  },
});
