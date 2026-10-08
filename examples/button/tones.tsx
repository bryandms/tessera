import { StyleSheet, View } from 'react-native';
import { Button, type ButtonColor } from 'tessera';

const tones: ButtonColor[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
];

export function ButtonTonesExample() {
  return (
    <View style={styles.container}>
      {tones.map(tone => (
        <Button.Root key={tone} color={tone} onPress={() => {}}>
          <Button.Text>Label</Button.Text>
        </Button.Root>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
