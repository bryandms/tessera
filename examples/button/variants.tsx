import { StyleSheet, View } from 'react-native';
import { Button } from 'tessera';

export function ButtonVariantsExample() {
  return (
    <View style={styles.container}>
      <Button.Root variant="contained" color="primary" onPress={() => {}}>
        <Button.Text>Label</Button.Text>
      </Button.Root>
      <Button.Root variant="outlined" color="primary" onPress={() => {}}>
        <Button.Text>Label</Button.Text>
      </Button.Root>
      <Button.Root variant="text" color="primary" onPress={() => {}}>
        <Button.Text>Label</Button.Text>
      </Button.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
