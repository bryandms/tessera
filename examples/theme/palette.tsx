import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'tessera';

const colorKeys = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
] as const;

export function PaletteExample() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {colorKeys.map(key => {
        const color = theme.palette[key];

        return (
          <View
            key={key}
            style={[
              styles.row,
              { backgroundColor: theme.palette.background.paper },
            ]}>
            <View style={[styles.swatch, { backgroundColor: color.main }]} />
            <Text style={[styles.label, { color: theme.palette.text.primary }]}>
              {key}
            </Text>
            <Text style={[styles.sample, { color: color.textColor }]}>
              Sample text
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
  },
  swatch: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  sample: {
    fontSize: 14,
  },
});
