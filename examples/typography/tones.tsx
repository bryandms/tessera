import { StyleSheet, View } from 'react-native';
import { Typography, type TypographyColor } from 'tessera';

const colors: TypographyColor[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
];

export function TypographyTonesExample() {
  return (
    <View style={styles.container}>
      {colors.map(color => (
        <Typography key={color} variant="body1" color={color}>
          Text with the {color} tone
        </Typography>
      ))}
      <Typography variant="caption">
        Captions and overlines use the muted tone by default.
      </Typography>
      <Typography variant="overline">Overline</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
