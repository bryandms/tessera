import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme, useThemeMode } from 'tessera';

export function ModeToggleExample() {
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.palette.background.default },
      ]}>
      <Text style={[styles.label, { color: theme.palette.text.primary }]}>
        Current mode: {mode}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Switch to ${nextMode} mode`}
        onPress={() => setMode(nextMode)}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: theme.palette.primary.main,
            opacity: pressed ? 0.8 : 1,
          },
        ]}>
        <Text
          style={[
            styles.buttonLabel,
            { color: theme.palette.primary.contrastText },
          ]}>
          Switch to {nextMode}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
  },
  button: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});
