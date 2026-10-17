import { StyleSheet, View } from 'react-native';
import { Typography } from 'tessera';
import type { TypographyVariant } from 'tessera';

const variants: TypographyVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'button',
  'caption',
  'overline',
];

export function VariantsExample() {
  return (
    <View style={styles.container}>
      {variants.map(variant => (
        <View key={variant} style={styles.row}>
          <Typography variant="caption" color="secondary">
            {variant}
          </Typography>
          <Typography variant={variant}>The quick brown fox</Typography>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    gap: 4,
  },
});
