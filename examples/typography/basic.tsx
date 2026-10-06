import { StyleSheet, View } from 'react-native';
import { Typography } from 'tessera';

export function TypographyBasicExample() {
  return (
    <View style={styles.container}>
      <Typography variant="body1">
        Simple text with the default variant. It inherits the active theme and
        adapts to light and dark mode automatically.
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
