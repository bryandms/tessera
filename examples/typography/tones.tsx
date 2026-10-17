import { StyleSheet, View } from 'react-native';
import { Typography } from 'tessera';
import type { TypographyColor } from 'tessera';

const tones: TypographyColor[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
  'disabled',
];

export function TonesExample() {
  return (
    <View style={styles.container}>
      {tones.map(tone => (
        <Typography key={tone} color={tone}>
          {tone}: sample text
        </Typography>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
