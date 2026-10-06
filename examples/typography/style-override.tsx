import { StyleSheet, View } from 'react-native';
import { Typography } from 'tessera';

export function TypographyStyleOverrideExample() {
  return (
    <View style={styles.container}>
      <Typography
        variant="body1"
        style={theme => ({
          color: theme.palette.info.main,
          marginTop: theme.spacing.xs,
        })}>
        Adjusted from `style` with theme access: info color and xl margin,
        without leaving the component.
      </Typography>
      <Typography variant="body1" style={{ fontStyle: 'italic' }}>
        Plain React Native styles work too.
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
