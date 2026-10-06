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

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'disabled';

export type TypographyProps = Omit<TextProps, 'style'> & {
  variant?: TypographyVariant;
  weight?: TypographyToken['fontWeight'];
  color?: TypographyColor;
  align?: TextStyle['textAlign'];
  style?: TesseraStyleProp<TextStyle>;
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
