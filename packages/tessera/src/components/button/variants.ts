import { StyleSheet, type ViewStyle } from 'react-native';
import type { AppTheme } from '../../core';
import type { ButtonColor, ButtonState, ButtonVariant } from './types';

type ColorRoles = {
  main: string;
  dark: string;
  light: string;
  contrastText: string;
  textColor: string;
};

const colorRoles = (theme: AppTheme, color: ButtonColor): ColorRoles => {
  const palette = theme.palette[color];

  return {
    main: palette.main,
    dark: palette.dark,
    light: palette.light,
    contrastText: palette.contrastText,
    textColor: palette.textColor,
  };
};

/**
 * Base structure every button renders: horizontal layout with the label
 * centered on both axes and content-hugging width.
 */
export const buttonBase: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
};

export const buttonContainerVariants: Record<
  ButtonVariant,
  (theme: AppTheme, color: ButtonColor) => ViewStyle
> = {
  contained: (theme, color) => ({
    backgroundColor: colorRoles(theme, color).main,
  }),
  outlined: (theme, color) => ({
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colorRoles(theme, color).main,
  }),
  text: () => ({ backgroundColor: 'transparent' }),
};

export const buttonPressedVariants: Record<
  ButtonVariant,
  (theme: AppTheme, color: ButtonColor) => ViewStyle
> = {
  contained: (theme, color) => ({
    backgroundColor: colorRoles(theme, color).dark,
  }),
  outlined: theme => ({
    backgroundColor: theme.palette.action.disabledBackground,
  }),
  text: theme => ({
    backgroundColor: theme.palette.action.disabledBackground,
  }),
};

export const buttonDisabledVariants: Record<
  ButtonVariant,
  (theme: AppTheme) => ViewStyle
> = {
  contained: theme => ({
    backgroundColor: theme.palette.action.disabledBackground,
  }),
  outlined: theme => ({
    backgroundColor: 'transparent',
    borderColor: theme.palette.action.disabled,
  }),
  text: () => ({ backgroundColor: 'transparent' }),
};

export const buttonSizeVariants = StyleSheet.create({
  sm: {
    minHeight: 36,
  },
  md: {
    minHeight: 48,
  },
  lg: {
    minHeight: 56,
  },
});

export const buttonSpacingVariants = StyleSheet.create({
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 4,
  },
  md: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    gap: 8,
  },
  lg: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    gap: 8,
  },
});

export const buttonRadius = StyleSheet.create({
  md: {
    borderRadius: 8,
  },
});

/**
 * Color of content pieces (`Button.Icon`, `Button.Spinner`): the variant
 * label color, or the muted action color while disabled.
 */
export const buttonContentColor = (
  theme: AppTheme,
  variant: ButtonVariant,
  color: ButtonColor,
  state: ButtonState,
): string =>
  state.disabled
    ? theme.palette.action.disabled
    : buttonTextVariants[variant](theme, color, state).color;

export const buttonTextVariants: Record<
  ButtonVariant,
  (theme: AppTheme, color: ButtonColor, state: ButtonState) => { color: string }
> = {
  contained: (theme, color, { disabled }) => ({
    color: disabled
      ? theme.palette.action.disabled
      : colorRoles(theme, color).contrastText,
  }),
  outlined: (theme, color, { disabled }) => ({
    color: disabled
      ? theme.palette.action.disabled
      : colorRoles(theme, color).textColor,
  }),
  text: (theme, color, { disabled }) => ({
    color: disabled
      ? theme.palette.action.disabled
      : colorRoles(theme, color).textColor,
  }),
};

export const buttonTextSizeVariants = StyleSheet.create({
  sm: {
    fontSize: 12,
    lineHeight: 16,
  },
  md: {
    fontSize: 14,
    lineHeight: 24,
  },
  lg: {
    fontSize: 15,
    lineHeight: 26,
  },
});
