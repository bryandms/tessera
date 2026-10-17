import { Text } from 'react-native';
import type { TextProps, TextStyle } from 'react-native';
import { resolveTesseraStyle, useTheme } from '../../core';
import type {
  AppTheme,
  TesseraStyleProp,
  TypographyToken,
  TypographyVariant,
} from '../../core';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'disabled';

export type TypographyProps = Omit<
  TextProps,
  'style' | 'maxFontSizeMultiplier'
> & {
  /**
   * Text role in the type scale. `h1`–`h6` set `accessibilityRole="header"`
   * unless the caller passes its own `accessibilityRole`.
   * @default 'body1'
   */
  variant?: TypographyVariant;
  /** Overrides the font weight of the variant. Size and line height are kept. */
  weight?: TypographyToken['fontWeight'];
  /**
   * Text color. Without it the text uses `text.primary`, or the muted color of
   * `caption` and `overline`. Allowed values: `primary`, `secondary`,
   * `success`, `info`, `warning`, `error`, `disabled`.
   */
  color?: TypographyColor;
  /** Text alignment. Allowed values: `left`, `center`, `right`, `justify`. */
  align?: TextStyle['textAlign'];
  /**
   * Applied last, over variant, weight, color and alignment. Accepts a React
   * Native style or `(theme) => style`.
   */
  style?: TesseraStyleProp<TextStyle>;
  /**
   * Upper limit for the system font scaling applied to the text.
   * @default 2
   */
  maxFontSizeMultiplier?: number;
};

const headingVariants: readonly TypographyVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
];

const colorResolvers: Record<TypographyColor, (theme: AppTheme) => string> = {
  primary: theme => theme.palette.primary.textColor,
  // Neutral secondary text, not the palette's secondary color.
  secondary: theme => theme.palette.text.secondary,
  success: theme => theme.palette.success.textColor,
  info: theme => theme.palette.info.textColor,
  warning: theme => theme.palette.warning.textColor,
  error: theme => theme.palette.error.textColor,
  disabled: theme => theme.palette.text.disabled,
};

/**
 * Renders text with the theme type scale and semantic colors. Must be rendered
 * inside `ThemeProvider`.
 */
export function Typography({
  variant = 'body1',
  weight,
  color,
  align,
  style,
  maxFontSizeMultiplier = 2,
  ...rest
}: TypographyProps) {
  const theme = useTheme();
  const token = theme.typography[variant];
  const isHeading = headingVariants.includes(variant);
  const resolvedColor = color
    ? colorResolvers[color](theme)
    : (token.color ?? theme.palette.text.primary);

  return (
    <Text
      accessibilityRole={isHeading ? 'header' : undefined}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      {...rest}
      style={[
        token,
        weight !== undefined && { fontWeight: weight },
        { color: resolvedColor },
        align !== undefined && { textAlign: align },
        resolveTesseraStyle(theme, {}, style),
      ]}
    />
  );
}
