import type { StyleProp, ViewStyle } from 'react-native';
import type { AppTheme } from './theme';
import { useTheme } from './theme-provider';

export type TesseraStyleState = {
  pressed?: boolean;
  focused?: boolean;
  disabled?: boolean;
  error?: boolean;
  selected?: boolean;
  busy?: boolean;
};

export type TesseraStyleProp<
  Style extends object = ViewStyle,
  State extends TesseraStyleState = TesseraStyleState,
> = StyleProp<Style> | ((theme: AppTheme, state: State) => StyleProp<Style>);

/**
 * Returns `style` as is, or calls it with the theme and the state when it is
 * a function.
 */
export function resolveTesseraStyle<
  Style extends object = ViewStyle,
  State extends TesseraStyleState = TesseraStyleState,
>(
  theme: AppTheme,
  state: State,
  style: TesseraStyleProp<Style, State> | undefined,
): StyleProp<Style> | undefined {
  return typeof style === 'function' ? style(theme, state) : style;
}

/**
 * Same as `resolveTesseraStyle`, using the active theme. Must be called inside
 * `ThemeProvider`.
 */
export function useTesseraStyle<
  Style extends object = ViewStyle,
  State extends TesseraStyleState = TesseraStyleState,
>(
  style: TesseraStyleProp<Style, State> | undefined,
  state: State,
): StyleProp<Style> | undefined {
  const theme = useTheme();
  return resolveTesseraStyle(theme, state, style);
}
