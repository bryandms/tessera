import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'tessera';

export function ButtonBusyExample() {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!busy) {
      return;
    }
    const timeout = setTimeout(() => setBusy(false), 2000);
    return () => clearTimeout(timeout);
  }, [busy]);

  return (
    <View style={styles.container}>
      <Button.Root busy={busy} onPress={() => setBusy(true)}>
        {busy ? <Button.Spinner /> : null}
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
