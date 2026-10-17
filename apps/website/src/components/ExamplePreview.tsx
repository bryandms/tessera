import { type ComponentType } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider, useTheme } from 'tessera';

type ExamplePreviewProps = {
  Component: ComponentType;
};

const modes = ['light', 'dark'] as const;

function PreviewPanel({ Component }: ExamplePreviewProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.panel,
        { backgroundColor: theme.palette.background.default },
      ]}>
      <Component />
    </View>
  );
}

export default function ExamplePreview({ Component }: ExamplePreviewProps) {
  return (
    <View style={styles.container}>
      {modes.map(mode => (
        <ThemeProvider key={mode} defaultMode={mode}>
          <PreviewPanel Component={Component} />
        </ThemeProvider>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  panel: {
    padding: 16,
    borderRadius: 8,
  },
});
