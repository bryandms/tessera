import { StyleSheet, View } from 'react-native';
import { Typography } from 'tessera';

export function TypographyWeightExample() {
  return (
    <View style={styles.container}>
      <Typography variant="body1">body1 (regular)</Typography>
      <Typography variant="body1" weight="700">
        body1 with weight 700
      </Typography>
      <Typography variant="h4" weight="400">
        h4 with weight 400
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
