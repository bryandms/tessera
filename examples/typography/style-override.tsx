import { StyleSheet, View } from 'react-native';
import { Typography } from 'tessera';

export function StyleOverrideExample() {
  return (
    <View style={styles.container}>
      <Typography style={styles.spaced}>
        Object style adds letter spacing and a top margin.
      </Typography>
      <Typography
        style={theme => ({
          textDecorationLine: 'underline',
          textDecorationColor: theme.palette.primary.textColor,
        })}>
        Function style reads the theme to underline with the primary color.
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  spaced: {
    letterSpacing: 2,
    marginTop: 4,
  },
});
