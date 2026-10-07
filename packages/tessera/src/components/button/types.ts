import type { ReactNode } from 'react';
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { TesseraStyleProp } from '../../core';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

export type ButtonColor = 'primary' | 'secondary';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonState = {
  pressed?: boolean;
  disabled?: boolean;
  busy?: boolean;
};

export type ButtonRootProps = Omit<PressableProps, 'style' | 'children'> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  busy?: boolean;
  disabled?: boolean;
  style?: TesseraStyleProp<ViewStyle, ButtonState>;
  children?: ReactNode;
};

export type ButtonTextProps = Omit<TextProps, 'style' | 'children'> & {
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
};

export type ButtonIconProps = {
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
};
