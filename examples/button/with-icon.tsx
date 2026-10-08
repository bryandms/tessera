import { StyleSheet, View } from 'react-native';
import { Button } from 'tessera';

export function ButtonWithIconExample() {
  return (
    <View style={styles.container}>
      <Button.Root onPress={() => {}}>
        <Button.Icon>{'+'}</Button.Icon>
        <Button.Text>Label</Button.Text>
      </Button.Root>
      <Button.Root variant="outlined" onPress={() => {}}>
        <Button.Text>Label</Button.Text>
        <Button.Icon>{'›'}</Button.Icon>
      </Button.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
