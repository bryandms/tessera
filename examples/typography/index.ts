import type { ComponentType } from 'react';
import { TypographyBasicExample } from './basic';
import { TypographyStyleOverrideExample } from './style-override';
import { TypographyTonesExample } from './tones';
import { TypographyVariantsExample } from './variants';
import { TypographyWeightExample } from './weight';

export { TypographyBasicExample } from './basic';
export { TypographyVariantsExample } from './variants';
export { TypographyTonesExample } from './tones';
export { TypographyWeightExample } from './weight';
export { TypographyStyleOverrideExample } from './style-override';

export type CatalogExample = {
  id: string;
  title: string;
  description?: string;
  Component: ComponentType;
};

export const typographyExamples: CatalogExample[] = [
  {
    id: 'typography/basic',
    title: 'Basic',
    description: 'Default text with the theme body variant.',
    Component: TypographyBasicExample,
  },
  {
    id: 'typography/variants',
    title: 'Variants',
    description: 'The full typography scale, straight from the theme tokens.',
    Component: TypographyVariantsExample,
  },
  {
    id: 'typography/tones',
    title: 'Tones',
    description: 'Semantic colors resolved against the palette.',
    Component: TypographyTonesExample,
  },
  {
    id: 'typography/weight',
    title: 'Weight',
    description: 'Per-instance weight override.',
    Component: TypographyWeightExample,
  },
  {
    id: 'typography/style-override',
    title: 'Style override',
    description: 'The `style` prop with theme access for one-off adjustments.',
    Component: TypographyStyleOverrideExample,
  },
];
