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
  St extends object = ViewStyle,
  S extends TesseraStyleState = TesseraStyleState,
> = StyleProp<St> | ((theme: AppTheme, state: S) => StyleProp<St>);

export function resolveTesseraStyle<
  St extends object = ViewStyle,
  S extends TesseraStyleState = TesseraStyleState,
>(
  theme: AppTheme,
  state: S,
  style: TesseraStyleProp<St, S> | undefined,
): StyleProp<St> | undefined {
  return typeof style === 'function' ? style(theme, state) : style;
}

export function useTesseraStyle<
  St extends object = ViewStyle,
  S extends TesseraStyleState = TesseraStyleState,
>(
  style: TesseraStyleProp<St, S> | undefined,
  state: S,
): StyleProp<St> | undefined {
  const theme = useTheme();
  return resolveTesseraStyle(theme, state, style);
}
