import type { StyleProp, ViewStyle } from 'react-native';
import type { AppTheme } from './theme';

export type VariantStyleResolver<St extends object = ViewStyle> = (
  theme: AppTheme,
) => StyleProp<St>;

export function createVariants<V extends string, St extends object = ViewStyle>(
  variants: Record<V, VariantStyleResolver<St>>,
): Record<V, VariantStyleResolver<St>> {
  return variants;
}
