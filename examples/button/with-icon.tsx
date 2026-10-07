import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'tessera';

export function ButtonWithIconExample() {
  return (
    <View style={styles.container}>
      <Button.Root onPress={() => {}}>
        <Button.Icon>
          <Text style={styles.icon}>{'+'}</Text>
        </Button.Icon>
        <Button.Text>Label</Button.Text>
      </Button.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  icon: {
    fontSize: 16,
    lineHeight: 20,
  },
});
