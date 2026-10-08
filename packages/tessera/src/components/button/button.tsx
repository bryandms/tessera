import { useEffect, useState } from 'react';
import {
  AccessibilityInfo,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { resolveTesseraStyle, useTheme } from '../../core';
import { ButtonVariantContext, useButtonVariant } from './button-context';
import type {
  ButtonIconProps,
  ButtonRootProps,
  ButtonSpinnerProps,
  ButtonTextProps,
} from './types';
import {
  buttonBase,
  buttonContainerVariants,
  buttonContentColor,
  buttonDisabledVariants,
  buttonPressedVariants,
  buttonRadius,
  buttonSizeVariants,
  buttonSpacingVariants,
  buttonTextSizeVariants,
  buttonTextVariants,
} from './variants';

/**
 * Interactive root of the button: a `Pressable` with a ≥ 48dp touch
 * target that resolves its look from `variant` × `color` × `size` and
 * shares its state (`pressed`, `disabled`, `busy`) with the pieces
 * through an internal context. While `busy`, presses are ignored
 * (double-submit guard) and the state is announced as busy, not disabled.
 *
 * Compose with `Button.Icon`, `Button.Text` and `Button.Spinner`; the
 * flattened style makes it safe to wrap with `Link asChild` for
 * navigation actions.
 */
function ButtonRoot({
  variant = 'contained',
  color = 'primary',
  size = 'md',
  busy,
  disabled,
  accessibilityState,
  style,
  onPress,
  children,
  ...rest
}: ButtonRootProps) {
  const theme = useTheme();
  const isDisabled = disabled ?? false;
  const isBusy = busy ?? false;

  return (
    <ButtonVariantContext.Provider
      value={{
        variant,
        color,
        size,
        state: { disabled: isDisabled, busy: isBusy },
      }}>
      <Pressable
        {...rest}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{
          disabled: isDisabled,
          busy: isBusy,
          ...accessibilityState,
        }}
        onPress={event => {
          if (isBusy) {
            return;
          }
          onPress?.(event);
        }}
        style={({ pressed }) => {
          const layers = [
            buttonBase,
            buttonRadius.md,
            buttonSizeVariants[size],
            buttonSpacingVariants[size],
            buttonContainerVariants[variant](theme, color),
            isDisabled ? buttonDisabledVariants[variant](theme) : undefined,
            !isDisabled && !isBusy && pressed
              ? buttonPressedVariants[variant](theme, color)
              : undefined,
            resolveTesseraStyle(
              theme,
              { pressed, disabled: isDisabled, busy: isBusy },
              style,
            ),
          ];

          return StyleSheet.flatten(layers);
        }}>
        {children}
      </Pressable>
    </ButtonVariantContext.Provider>
  );
}

/**
 * Accessible label of the button — this is the name announced by screen
 * readers, so keep it a short action verb ("Save", not "OK"). Inherits
 * variant, size and state from the enclosing root.
 */
function ButtonText({ style, children, ...rest }: ButtonTextProps) {
  const theme = useTheme();
  const { variant, color, size, state } = useButtonVariant();
  const finalStyle = StyleSheet.flatten([
    buttonTextSizeVariants[size],
    buttonTextVariants[variant](theme, color, state),
    style,
  ]);

  return (
    <Text style={finalStyle} {...rest}>
      {children}
    </Text>
  );
}

/**
 * Decorative icon slot — hidden from screen readers
 * (`accessibilityElementsHidden` + `importantForAccessibility="no"`);
 * the accessible name comes from `Button.Text`. Plain-string glyphs are
 * wrapped, tinted and scaled automatically; any other content is
 * rendered as-is and its tint is configured by the consumer.
 */
function ButtonIcon({ style, children }: ButtonIconProps) {
  const { variant, color, size, state } = useButtonVariant();
  const theme = useTheme();
  const contentColor = buttonContentColor(theme, variant, color, state);

  return (
    <View
      style={StyleSheet.flatten([styles.icon, style])}
      accessibilityElementsHidden
      importantForAccessibility="no">
      {typeof children === 'string' ? (
        <Text
          style={StyleSheet.flatten([
            buttonTextSizeVariants[size],
            { color: contentColor },
          ])}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

/**
 * Decorative busy indicator — compose it inside the root while
 * `busy`. Hidden from screen readers (the busy state is announced by
 * the root through `accessibilityState.busy`). The glyph inherits the
 * variant color (muted when disabled) and renders static when the OS
 * reduce-motion setting is on.
 */
function ButtonSpinner({ size = 'small', style }: ButtonSpinnerProps) {
  const { variant, color, state } = useButtonVariant();
  const theme = useTheme();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceMotionEnabled().then(value => {
      if (mounted) {
        setReduceMotion(value);
      }
    });
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion,
    );

    return () => {
      mounted = false;
      subscription?.remove();
    };
  }, []);

  const spinnerColor = buttonContentColor(theme, variant, color, state);

  return (
    <ActivityIndicator
      style={style}
      color={spinnerColor}
      size={size}
      animating={!reduceMotion}
      hidesWhenStopped={false}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Button = {
  Root: ButtonRoot,
  Text: ButtonText,
  Icon: ButtonIcon,
  Spinner: ButtonSpinner,
};
