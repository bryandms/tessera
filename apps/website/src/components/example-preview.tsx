import type { ComponentType, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, useTheme, useThemeMode } from 'tessera';

function PreviewChrome({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();

  return (
    <View
      style={[
        styles.frame,
        {
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.divider,
        },
      ]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => setMode(mode === 'light' ? 'dark' : 'light')}
          style={[
            styles.modeButton,
            {
              backgroundColor: theme.palette.primary.main,
              borderRadius: theme.radius.sm,
            },
          ]}>
          <Text
            style={{ color: theme.palette.primary.contrastText, fontSize: 12 }}>
            {mode === 'light' ? 'dark' : 'light'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.stage}>{children}</View>
    </View>
  );
}

export default function ExamplePreview({
  Component,
}: {
  Component: ComponentType;
}) {
  return (
    <ThemeProvider>
      <PreviewChrome>
        <Component />
      </PreviewChrome>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  frame: {
    marginVertical: 16,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
  },
  modeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  stage: {
    padding: 24,
  },
});
