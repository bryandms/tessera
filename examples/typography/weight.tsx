import { StyleSheet, View } from 'react-native';
import { Typography } from 'tessera';

export function WeightExample() {
  return (
    <View style={styles.container}>
      <Typography variant="h4" weight="400">
        Heading with regular weight
      </Typography>
      <Typography weight="700">Body text with bold weight</Typography>
      <Typography variant="body2" weight="500">
        Body 2 with medium weight
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
