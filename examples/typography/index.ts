import type { CatalogExample } from '../catalog-example';
import { BasicExample } from './basic';
import { StyleOverrideExample } from './style-override';
import { TonesExample } from './tones';
import { VariantsExample } from './variants';
import { WeightExample } from './weight';

export {
  BasicExample,
  StyleOverrideExample,
  TonesExample,
  VariantsExample,
  WeightExample,
};

export const typographyExamples: CatalogExample[] = [
  {
    id: 'typography/basic',
    title: 'Basic',
    description: 'Default body text, without a variant.',
    Component: BasicExample,
  },
  {
    id: 'typography/variants',
    title: 'Variants',
    description: 'Every variant of the type scale, from h1 to overline.',
    Component: VariantsExample,
  },
  {
    id: 'typography/tones',
    title: 'Tones',
    description: 'Semantic colors, each resolved to its text color.',
    Component: TonesExample,
  },
  {
    id: 'typography/weight',
    title: 'Weight',
    description: 'Overrides the font weight without changing the size.',
    Component: WeightExample,
  },
  {
    id: 'typography/style-override',
    title: 'Style override',
    description:
      'Adds styles with an object or a function that reads the theme.',
    Component: StyleOverrideExample,
  },
];
