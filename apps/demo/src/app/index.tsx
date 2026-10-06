import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { type TypographyVariant, useTheme, useThemeMode } from 'tessera';

const variants: TypographyVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
  'overline',
];

const paletteTones = ['light', 'main', 'dark'] as const;

type PaletteName =
  'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';

const paletteNames: PaletteName[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
];

export default function Index() {
  const { mode, setMode } = useThemeMode();
  const theme = useTheme();
  const [swatchIndex, setSwatchIndex] = useState(0);

  const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.palette.background.default },
      ]}>
      <Text
        style={[theme.typography.h3, { color: theme.palette.text.primary }]}>
        Tessera
      </Text>

      <Pressable
        onPress={toggleMode}
        style={[
          styles.toggle,
          {
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.radius.md,
          },
        ]}>
        <Text
          style={{
            color: theme.palette.primary.contrastText,
            ...theme.typography.button,
          }}>
          Switch to {mode === 'light' ? 'dark' : 'light'}
        </Text>
      </Pressable>

      <View style={styles.swatches}>
        {paletteNames.map(name => (
          <Pressable
            key={name}
            onPress={() =>
              setSwatchIndex((swatchIndex + 1) % paletteTones.length)
            }
            style={styles.swatch}>
            <View
              style={[
                styles.swatchColor,
                {
                  backgroundColor:
                    theme.palette[name][paletteTones[swatchIndex] ?? 'main'],
                  borderRadius: theme.radius.sm,
                },
              ]}
            />
            <Text
              style={[
                theme.typography.caption,
                { color: theme.palette.text.secondary },
              ]}>
              {name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.typography}>
        {variants.map(variant => (
          <Text
            key={variant}
            style={[
              theme.typography[variant],
              { color: theme.palette.text.primary },
            ]}>
            {variant}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: 24,
  },
  toggle: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  swatches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  swatch: {
    alignItems: 'center',
    gap: 4,
  },
  swatchColor: {
    width: 48,
    height: 48,
  },
  typography: {
    gap: 4,
    alignItems: 'center',
  },
});
