import { StyleSheet, View } from 'react-native';
import { Typography } from 'tessera';

export function BasicExample() {
  return (
    <View style={styles.container}>
      <Typography variant="h4">Heading</Typography>
      <Typography>
        Without a variant, Typography renders the body1 style of the theme.
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
