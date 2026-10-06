import { StyleSheet, View } from 'react-native';
import { Typography, type TypographyVariant } from 'tessera';

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
  'caption',
  'overline',
];

export function TypographyVariantsExample() {
  return (
    <View style={styles.container}>
      {variants.map(variant => (
        <Typography key={variant} variant={variant}>
          {variant}
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
