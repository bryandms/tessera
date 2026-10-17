import type { CatalogExample } from '../catalog-example';
import { ModeToggleExample } from './mode-toggle';
import { PaletteExample } from './palette';

export { ModeToggleExample, PaletteExample };

export const themeExamples: CatalogExample[] = [
  {
    id: 'theme/palette',
    title: 'Palette',
    description:
      'Main color, text color and contrast text for each palette color.',
    Component: PaletteExample,
  },
  {
    id: 'theme/mode-toggle',
    title: 'Mode toggle',
    description: 'Switches between light and dark mode with useThemeMode.',
    Component: ModeToggleExample,
  },
];
