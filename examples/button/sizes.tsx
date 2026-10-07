import { StyleSheet, View } from 'react-native';
import { Button } from 'tessera';

export function ButtonSizesExample() {
  return (
    <View style={styles.container}>
      <Button.Root size="sm" onPress={() => {}}>
        <Button.Text>Label</Button.Text>
      </Button.Root>
      <Button.Root size="md" onPress={() => {}}>
        <Button.Text>Label</Button.Text>
      </Button.Root>
      <Button.Root size="lg" onPress={() => {}}>
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
