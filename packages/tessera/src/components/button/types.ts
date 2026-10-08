import type { ReactNode } from 'react';
import type {
  ActivityIndicatorProps,
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
export type ButtonColor =
  'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';

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
  /** Palette family: `primary` (blue), `secondary` (gray), `success`, `info`, `warning`, `error` — resolved from theme tokens with verified contrast. */
  color?: ButtonColor;
  /** Visual scale: `sm` (36dp), `md` (48dp), `lg` (56dp). */
  size?: ButtonSize;
  /**
   * Marks the action as in progress: announced through
   * `accessibilityState.busy` and blocks presses (no double submit).
   * Does not dim the button — pair with `Button.Spinner` for the visible
   * indicator or use the `style` function for custom visuals.
   */
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
  /** Content pieces: usually `Button.Icon`, `Button.Text` and/or `Button.Spinner`. */
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

/** Props of `Button.Icon`, the decorative icon slot. */
export type ButtonIconProps = {
  /**
   * Per-instance style override on the slot container (margins,
   * alignment). It is a neutral `View` slot: plain-string glyphs are
   * wrapped, tinted and scaled automatically; any other content (an icon
   * component, an SVG, a `View`) is rendered as-is and its tint is
   * configured by the consumer.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The icon content — a glyph string or any consumer icon element.
   * Hidden from screen readers; the name comes from `Button.Text`.
   */
  children?: ReactNode;
};

/** Props of `Button.Spinner`, the busy indicator piece. */
export type ButtonSpinnerProps = {
  /** Glyph size forwarded to the native `ActivityIndicator`. */
  size?: ActivityIndicatorProps['size'];
  /** Per-instance style override on the spinner container. */
  style?: StyleProp<ViewStyle>;
};
