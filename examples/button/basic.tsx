import { StyleSheet, View } from 'react-native';
import { Button } from 'tessera';

export function ButtonBasicExample() {
  return (
    <View style={styles.container}>
      <Button.Root onPress={() => {}}>
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
