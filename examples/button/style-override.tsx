import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'tessera';

export function ButtonStyleOverrideExample() {
  return (
    <View style={styles.container}>
      <Button.Root
        variant="outlined"
        color="secondary"
        onPress={() => {}}
        style={(theme, { pressed }) => ({
          borderRadius: theme.radius.full,
          borderWidth: 2,
          borderColor: theme.palette.warning.textColor,
          backgroundColor: theme.palette.common.white,
          transform: pressed ? [{ scale: 0.96 }] : [],
        })}>
        <Button.Icon>
          <Text style={styles.icon}>{'$'}</Text>
        </Button.Icon>
        <Button.Text>Tip</Button.Text>
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
