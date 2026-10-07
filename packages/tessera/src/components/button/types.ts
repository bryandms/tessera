import type { ReactNode } from 'react';
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { TesseraStyleProp } from '../../core';

/** Visual appearance of the button. */
export type ButtonVariant = 'contained' | 'outlined' | 'text';

/** Palette family the button resolves its colors from. */
export type ButtonColor = 'primary' | 'secondary';

/** Visual scale of the button. All sizes keep a ≥ 48dp touch target. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Interaction state shared with the button pieces through the internal
 * context and with the `style` function prop.
 */
export type ButtonState = {
  pressed?: boolean;
  disabled?: boolean;
  busy?: boolean;
};

/** Props of `Button.Root`, the interactive `Pressable` piece. */
export type ButtonRootProps = Omit<PressableProps, 'style' | 'children'> & {
  /** Visual appearance: `contained` (filled), `outlined` (bordered), `text` (borderless). */
  variant?: ButtonVariant;
  /** Palette family: `primary` (blue) or `secondary` (gray). */
  color?: ButtonColor;
  /** Visual scale: `sm` (36dp), `md` (48dp), `lg` (56dp). */
  size?: ButtonSize;
  /** Marks the action as in progress: announced through `accessibilityState.busy`. Does not block presses or render a spinner — pair with your own pending UI. */
  busy?: boolean;
  /** Cancels interaction and renders the muted state. */
  disabled?: boolean;
  /**
   * Theme-aware style override, applied as the last layer after variant
   * styles. Accepts plain React Native styles or a function
   * `(theme, state) => styles` reading the theme and the interaction state.
   *
   * @example
   * style={(theme, { pressed }) => ({
   *   backgroundColor: pressed ? theme.palette.primary.dark : theme.palette.primary.main,
   * })}
   */
  style?: TesseraStyleProp<ViewStyle, ButtonState>;
  /** Content pieces: usually `Button.Icon` and/or `Button.Text`. */
  children?: ReactNode;
};

/** Props of `Button.Text`, the accessible label piece. */
export type ButtonTextProps = Omit<TextProps, 'style' | 'children'> & {
  /**
   * Per-instance style override on top of the button typography. Label
   * color resolves from the variant by default.
   *
   * @example
   * <Button.Text style={{ textTransform: 'uppercase' }}>Save</Button.Text>
   */
  style?: StyleProp<TextStyle>;
  /** The action label — verbs, not "OK". This is the accessible name of the button. */
  children?: ReactNode;
};

/** Props of `Button.Icon`, the decorative leading piece. */
export type ButtonIconProps = {
  /**
   * Per-instance style override on the icon slot (margin, size of the
   * glyph container).
   */
  style?: StyleProp<TextStyle>;
  /** The icon content — a glyph or any consumer icon element. Hidden from screen readers; the name comes from `Button.Text`. */
  children?: ReactNode;
};
