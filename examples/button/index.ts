import type { CatalogExample } from '../catalog-example';
import { ButtonBasicExample } from './basic';
import { ButtonBusyExample } from './busy';
import { ButtonFullWidthExample } from './full-width';
import { ButtonSizesExample } from './sizes';
import { ButtonStyleOverrideExample } from './style-override';
import { ButtonTonesExample } from './tones';
import { ButtonVariantsExample } from './variants';
import { ButtonWithIconExample } from './with-icon';

export { ButtonBasicExample } from './basic';
export { ButtonVariantsExample } from './variants';
export { ButtonSizesExample } from './sizes';
export { ButtonTonesExample } from './tones';
export { ButtonWithIconExample } from './with-icon';
export { ButtonBusyExample } from './busy';
export { ButtonFullWidthExample } from './full-width';
export { ButtonStyleOverrideExample } from './style-override';

export const buttonExamples: CatalogExample[] = [
  {
    id: 'button/basic',
    title: 'Basic',
    description:
      'Primary button with the theme tokens and a 48dp touch target.',
    Component: ButtonBasicExample,
  },
  {
    id: 'button/variants',
    title: 'Variants',
    description: 'Contained, outlined and text appearance axis.',
    Component: ButtonVariantsExample,
  },
  {
    id: 'button/sizes',
    title: 'Sizes',
    description: 'Small, medium and large scales built from tokens.',
    Component: ButtonSizesExample,
  },
  {
    id: 'button/tones',
    title: 'Tones',
    description:
      'The six palette families resolved to AA-verified tokens per mode.',
    Component: ButtonTonesExample,
  },
  {
    id: 'button/with-icon',
    title: 'With icon',
    description:
      'Leading and trailing decorative slots; string glyphs are tinted automatically.',
    Component: ButtonWithIconExample,
  },
  {
    id: 'button/busy',
    title: 'Busy',
    description:
      'Announced as busy, presses blocked, spinner composed while pending.',
    Component: ButtonBusyExample,
  },
  {
    id: 'button/full-width',
    title: 'Full width',
    description: 'Default is content-hugging; stretch it with the style prop.',
    Component: ButtonFullWidthExample,
  },
  {
    id: 'button/style-override',
    title: 'Style override',
    description: 'The `style` prop reading theme and pressed state.',
    Component: ButtonStyleOverrideExample,
  },
];
