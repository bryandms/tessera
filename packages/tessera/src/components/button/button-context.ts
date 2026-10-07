import { createContext, useContext } from 'react';
import type {
  ButtonColor,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from './types';

export type ButtonVariantContextValue = {
  variant: ButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
  state: ButtonState;
};

export const ButtonVariantContext =
  createContext<ButtonVariantContextValue | null>(null);

export function useButtonVariant() {
  const context = useContext(ButtonVariantContext);

  if (!context) {
    throw new Error('Button pieces must be used within Button.Root');
  }

  return context;
}
