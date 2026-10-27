import type { TextStyle } from 'react-native';
import type { PaletteShades, RadiusScale, SpacingScale } from './tokens';
import { paletteShades, radiusScale, spacingScale } from './tokens';

export type ThemeMode = 'light' | 'dark';

/**
 * `contrastText` is the text color on top of `main`. `textColor` is the same
 * hue in a variant that meets WCAG AA as text on `background.default`.
 */
export type PaletteColor = PaletteShades & {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
  textColor: string;
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

/**
 * When `color` is set, it is the variant's default text color, used when the
 * caller does not pass one.
 */
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
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      inverse: string;
    };
    divider: string;
  };
  typography: Record<TypographyVariant, TypographyToken>;
  spacing: SpacingScale;
  radius: RadiusScale;
};

const channelLuminance = (channel: number): number => {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const relativeLuminance = (hex: string): number => {
  const red = channelLuminance(parseInt(hex.slice(1, 3), 16));
  const green = channelLuminance(parseInt(hex.slice(3, 5), 16));
  const blue = channelLuminance(parseInt(hex.slice(5, 7), 16));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrastRatio = (first: string, second: string): number => {
  const luminances = [relativeLuminance(first), relativeLuminance(second)];
  return (Math.max(...luminances) + 0.05) / (Math.min(...luminances) + 0.05);
};

/** Picks black or white, whichever gives the higher minimum contrast on every fill. */
const pickContrastText = (fills: string[]): string => {
  const minimumContrast = (text: string): number =>
    Math.min(...fills.map(fill => contrastRatio(fill, text)));
  return minimumContrast('#000000') >= minimumContrast('#FFFFFF')
    ? '#000000'
    : '#FFFFFF';
};

const toPaletteColor = (
  shades: PaletteShades,
  mode: ThemeMode,
): PaletteColor => {
  if (mode === 'dark') {
    return {
      ...shades,
      light: shades['300'],
      main: shades['400'],
      dark: shades['600'],
      contrastText: pickContrastText([shades['400'], shades['600']]),
      textColor: shades['400'],
    };
  }
  return {
    ...shades,
    light: shades['700'],
    main: shades['800'],
    dark: shades['900'],
    contrastText: pickContrastText([shades['800'], shades['900']]),
    textColor: shades['900'],
  };
};

const buildTypography = (
  mode: ThemeMode,
): Record<TypographyVariant, TypographyToken> => {
  const muted =
    mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';

  return {
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 38, letterSpacing: 0 },
    h2: { fontSize: 28, fontWeight: '700', lineHeight: 34, letterSpacing: 0 },
    h3: { fontSize: 24, fontWeight: '700', lineHeight: 29, letterSpacing: 0 },
    h4: {
      fontSize: 20,
      fontWeight: '700',
      lineHeight: 24,
      letterSpacing: 0.25,
    },
    h5: { fontSize: 18, fontWeight: '700', lineHeight: 22, letterSpacing: 0 },
    h6: {
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 21,
      letterSpacing: 0.15,
    },
    subtitle2: {
      fontSize: 13,
      fontWeight: '700',
      lineHeight: 20,
      letterSpacing: 0,
    },
    body1: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 21,
      letterSpacing: 0.15,
    },
    body2: {
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 20,
      letterSpacing: 0.17,
    },
    button: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 24,
      letterSpacing: 0.4,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      letterSpacing: 0,
      color: muted,
    },
    overline: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      letterSpacing: 1,
      color: muted,
    },
  };
};

/**
 * Text colors meet WCAG AA on `background.default` in both modes.
 */
export const createAppTheme = (mode: ThemeMode = 'light'): AppTheme => {
  const isDark = mode === 'dark';

  return {
    mode,
    palette: {
      primary: toPaletteColor(paletteShades.primary, mode),
      secondary: toPaletteColor(paletteShades.secondary, mode),
      grey: paletteShades.grey,
      success: toPaletteColor(paletteShades.success, mode),
      info: toPaletteColor(paletteShades.info, mode),
      warning: toPaletteColor(paletteShades.warning, mode),
      error: toPaletteColor(paletteShades.error, mode),
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
      background: isDark
        ? { default: '#121212', paper: '#1E1E1E' }
        : { default: '#FFFFFF', paper: '#FFFFFF' },
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
