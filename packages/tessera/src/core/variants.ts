import type { StyleProp, ViewStyle } from 'react-native';
import type { AppTheme } from './theme';

export type VariantStyleResolver<Style extends object = ViewStyle> = (
  theme: AppTheme,
) => StyleProp<Style>;

/**
 * Returns the map unchanged. Its only purpose is to type each variant as a
 * `VariantStyleResolver`.
 */
export function createVariants<
  VariantName extends string,
  Style extends object = ViewStyle,
>(
  variants: Record<VariantName, VariantStyleResolver<Style>>,
): Record<VariantName, VariantStyleResolver<Style>> {
  return variants;
}
