import type { TextProps, TextStyle } from 'react-native';
import { Text as RNText } from 'react-native';
import type {
  AppTheme,
  TesseraStyleProp,
  TypographyToken,
  TypographyVariant,
} from '../../core';
import { resolveTesseraStyle, useTheme } from '../../core';

export const TYPOGRAPHY_DEFAULT_MAX_FONT_SIZE_MULTIPLIER = 2;

/** Semantic color families resolvable as text tones. `secondary` maps to the muted text tone, not the gray palette color. */
export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'disabled';

/** Props of `Typography`, the text anchor of the catalog. */
export type TypographyProps = Omit<TextProps, 'style'> & {
  /** Scale entry from the theme typography tokens (`h1`…`h6`, `subtitle1/2`, `body1/2`, `button`, `caption`, `overline`). Headings render with `accessibilityRole="header"`. */
  variant?: TypographyVariant;
  /** Per-instance weight override on top of the variant token (e.g. `'700'` on `body1`). */
  weight?: TypographyToken['fontWeight'];
  /**
   * Semantic color resolved against the palette: `primary`, `secondary`
   * (muted text — not the gray palette color), `success`, `info`,
   * `warning`, `error`, `disabled`. When omitted, text uses
   * `theme.palette.text.primary` so dark mode always works.
   */
  color?: TypographyColor;
  /** Text alignment (`left`, `center`, `right`, `justify`). */
  align?: TextStyle['textAlign'];
  /**
   * Theme-aware style override, applied as the last layer after variant,
   * weight, color and align. Accepts plain React Native styles or a
   * function `(theme) => styles` reading the design tokens.
   *
   * @example
   * <Typography style={(theme) => ({ color: theme.palette.info.main })}>
   */
  style?: TesseraStyleProp<TextStyle>;
  /** Cap for OS font scaling so large accessibility sizes stay readable without breaking layouts. */
  maxFontSizeMultiplier?: number;
};

const headingVariants = new Set<TypographyVariant>([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
]);

const paletteColorResolvers: Record<
  TypographyColor,
  (theme: AppTheme) => string
> = {
  primary: theme => theme.palette.primary.textColor,
  secondary: theme => theme.palette.text.secondary,
  success: theme => theme.palette.success.textColor,
  info: theme => theme.palette.info.textColor,
  warning: theme => theme.palette.warning.textColor,
  error: theme => theme.palette.error.textColor,
  disabled: theme => theme.palette.text.disabled,
};

const resolveColor = (color: TypographyColor, theme: AppTheme): string =>
  paletteColorResolvers[color](theme);

/**
 * Text anchor of the catalog: renders the theme typography scale with
 * semantic palette tones, adapts to light/dark automatically and hides
 * the OS font-scale behind a readable cap. Non-interactive by design —
 * it never captures focus.
 */
export function Typography({
  variant = 'body1',
  weight,
  color,
  align,
  style,
  maxFontSizeMultiplier = TYPOGRAPHY_DEFAULT_MAX_FONT_SIZE_MULTIPLIER,
  children,
  ...rest
}: TypographyProps) {
  const theme = useTheme();
  const resolvedStyle = resolveTesseraStyle(theme, {}, style);
  const tone = color
    ? resolveColor(color, theme)
    : (theme.typography[variant].color ?? theme.palette.text.primary);

  return (
    <RNText
      accessibilityRole={headingVariants.has(variant) ? 'header' : undefined}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[
        theme.typography[variant],
        ...(weight ? [{ fontWeight: weight }] : []),
        { color: tone },
        ...(align ? [{ textAlign: align }] : []),
        resolvedStyle,
      ]}
      {...rest}>
      {children}
    </RNText>
  );
}
