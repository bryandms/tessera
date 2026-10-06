import type { TextStyle } from 'react-native';
import type { PaletteShades, RadiusScale, SpacingScale } from './tokens';
import { paletteShades, radiusScale, spacingScale } from './tokens';

export type ThemeMode = 'light' | 'dark';

export type PaletteColor = PaletteShades & {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
};

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

export type TypographyToken = Pick<
  TextStyle,
  'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing'
> &
  Partial<Pick<TextStyle, 'color'>>;

export type AppTheme = {
  mode: ThemeMode;
  palette: {
    primary: PaletteColor;
    secondary: PaletteColor;
    grey: PaletteShades;
    success: PaletteColor;
    info: PaletteColor;
    warning: PaletteColor;
    error: PaletteColor;
    common: { white: string; black: string };
    action: { disabled: string; disabledBackground: string };
    background: { default: string; paper: string };
    text: { primary: string; secondary: string; disabled: string; inverse: string };
    divider: string;
  };
  typography: Record<TypographyVariant, TypographyToken>;
  spacing: SpacingScale;
  radius: RadiusScale;
};

const toPaletteColor = (shades: PaletteShades, contrastText = '#FFFFFF'): PaletteColor => ({
  ...shades,
  light: shades['700'],
  main: shades['800'],
  dark: shades['900'],
  contrastText,
});

const buildTypography = (mode: ThemeMode): Record<TypographyVariant, TypographyToken> => {
  const muted = mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';

  return {
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 38, letterSpacing: 0 },
    h2: { fontSize: 28, fontWeight: '700', lineHeight: 34, letterSpacing: 0 },
    h3: { fontSize: 24, fontWeight: '700', lineHeight: 29, letterSpacing: 0 },
    h4: { fontSize: 20, fontWeight: '700', lineHeight: 24, letterSpacing: 0.25 },
    h5: { fontSize: 18, fontWeight: '700', lineHeight: 22, letterSpacing: 0 },
    h6: { fontSize: 16, fontWeight: '700', lineHeight: 24, letterSpacing: 0.15 },
    subtitle1: { fontSize: 14, fontWeight: '700', lineHeight: 21, letterSpacing: 0.15 },
    subtitle2: { fontSize: 13, fontWeight: '700', lineHeight: 20, letterSpacing: 0 },
    body1: { fontSize: 14, fontWeight: '400', lineHeight: 21, letterSpacing: 0.15 },
    body2: { fontSize: 13, fontWeight: '400', lineHeight: 20, letterSpacing: 0.17 },
    button: { fontSize: 14, fontWeight: '500', lineHeight: 24, letterSpacing: 0.4 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16, letterSpacing: 0, color: muted },
    overline: { fontSize: 12, fontWeight: '400', lineHeight: 32, letterSpacing: 1, color: muted },
  };
};

export const createAppTheme = (mode: ThemeMode = 'light'): AppTheme => {
  const isDark = mode === 'dark';

  return {
    mode,
    palette: {
      primary: toPaletteColor(paletteShades.primary),
      secondary: toPaletteColor(paletteShades.secondary),
      grey: paletteShades.grey,
      success: toPaletteColor(paletteShades.success),
      info: toPaletteColor(paletteShades.info),
      warning: toPaletteColor(paletteShades.warning, '#212121'),
      error: toPaletteColor(paletteShades.error),
      common: { white: '#FFFFFF', black: '#000000' },
      action: isDark
        ? {
            disabled: 'rgba(255, 255, 255, 0.38)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
          }
        : {
            disabled: 'rgba(42, 42, 42, 0.38)',
            disabledBackground: 'rgba(42, 42, 42, 0.12)',
          },
      background: isDark ? { default: '#121212', paper: '#1E1E1E' } : { default: '#FFFFFF', paper: '#FFFFFF' },
      text: isDark
        ? {
            primary: 'rgba(255, 255, 255, 0.92)',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
            inverse: 'rgba(0, 0, 0, 0.87)',
          }
        : {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            inverse: 'rgba(255, 255, 255, 0.92)',
          },
      divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    },
    typography: buildTypography(mode),
    spacing: spacingScale,
    radius: radiusScale,
  };
};
