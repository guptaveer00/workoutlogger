import { StyleSheet } from 'react-native';

export const colors = {
  background: '#101815',
  surface: '#1D2A24',
  text: '#F1F6F2',
  muted: '#B1C2B7',
  accent: '#C8F479',
  error: '#FFB9AF',
};

export const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 20, gap: 14 },
  text: { color: colors.text, fontSize: 17 },
  muted: { color: colors.muted, fontSize: 15 },
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 16, gap: 6 },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    padding: 15,
    alignItems: 'center',
    minHeight: 48,
  },
  buttonLabel: { color: colors.background, fontSize: 16, fontWeight: '800' },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 17,
    borderRadius: 12,
    padding: 14,
    minHeight: 48,
  },
  field: { gap: 6 },
  error: { color: colors.error, fontSize: 15 },
});
