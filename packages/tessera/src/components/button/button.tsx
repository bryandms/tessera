import { Pressable, StyleSheet, Text } from 'react-native';
import { resolveTesseraStyle, useTheme } from '../../core';
import { ButtonVariantContext, useButtonVariant } from './button-context';
import type {
  ButtonIconProps,
  ButtonRootProps,
  ButtonTextProps,
} from './types';
import {
  buttonBase,
  buttonContainerVariants,
  buttonDisabledVariants,
  buttonPressedVariants,
  buttonRadius,
  buttonSizeVariants,
  buttonSpacingVariants,
  buttonTextSizeVariants,
  buttonTextVariants,
} from './variants';

function ButtonRoot({
  variant = 'contained',
  color = 'primary',
  size = 'md',
  busy,
  disabled,
  style,
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
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: isBusy }}
        style={({ pressed }) => {
          const layers = [
            buttonBase,
            buttonRadius.md,
            buttonSizeVariants[size],
            buttonSpacingVariants[size],
            buttonContainerVariants[variant](theme, color),
            isDisabled ? buttonDisabledVariants[variant](theme) : undefined,
            !isDisabled && pressed
              ? buttonPressedVariants[variant](theme, color)
              : undefined,
            resolveTesseraStyle(
              theme,
              { pressed, disabled: isDisabled, busy: isBusy },
              style,
            ),
          ];

          return StyleSheet.flatten(layers);
        }}
        {...rest}>
        {children}
      </Pressable>
    </ButtonVariantContext.Provider>
  );
}

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

function ButtonIcon({ style, children }: ButtonIconProps) {
  const { variant, color, state } = useButtonVariant();
  const theme = useTheme();
  const iconColor = state.disabled
    ? theme.palette.action.disabled
    : buttonTextVariants[variant](theme, color, state).color;

  return (
    <Text
      style={StyleSheet.flatten([styles.icon, { color: iconColor }, style])}
      accessibilityElementsHidden
      importantForAccessibility="no">
      {children}
    </Text>
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
};
