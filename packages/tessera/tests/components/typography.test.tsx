import { StyleSheet } from 'react-native';
import type { TextStyle } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { Typography } from '../../src/components/typography';
import { createAppTheme, ThemeProvider } from '../../src/core';
import type { AppTheme, ThemeMode } from '../../src/core';

const VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'button',
  'caption',
  'overline',
] as const;

const HEADING_VARIANTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

async function renderWithTheme(
  element: React.ReactElement,
  mode: ThemeMode = 'light',
) {
  await render(<ThemeProvider defaultMode={mode}>{element}</ThemeProvider>);
}

function flatStyle(element: { props: { style?: unknown } }): TextStyle {
  return StyleSheet.flatten(element.props.style as TextStyle[]) ?? {};
}

const colorByName: Record<
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'disabled',
  (theme: AppTheme) => string
> = {
  primary: theme => theme.palette.primary.textColor,
  secondary: theme => theme.palette.text.secondary,
  success: theme => theme.palette.success.textColor,
  info: theme => theme.palette.info.textColor,
  warning: theme => theme.palette.warning.textColor,
  error: theme => theme.palette.error.textColor,
  disabled: theme => theme.palette.text.disabled,
};

describe('Typography', () => {
  it('uses the body1 variant by default', async () => {
    await renderWithTheme(<Typography>Hello</Typography>);
    const token = createAppTheme('light').typography.body1;

    expect(flatStyle(screen.getByText('Hello'))).toMatchObject({
      fontSize: token.fontSize,
      fontWeight: token.fontWeight,
      lineHeight: token.lineHeight,
    });
  });

  it.each(VARIANTS)('applies the %s token from the theme', async variant => {
    await renderWithTheme(<Typography variant={variant}>Text</Typography>);
    const token = createAppTheme('light').typography[variant];

    expect(flatStyle(screen.getByText('Text'))).toMatchObject({
      fontSize: token.fontSize,
      fontWeight: token.fontWeight,
      lineHeight: token.lineHeight,
      letterSpacing: token.letterSpacing,
    });
  });

  it.each(HEADING_VARIANTS)(
    'marks %s as a header for screen readers',
    async variant => {
      await renderWithTheme(<Typography variant={variant}>Title</Typography>);
      expect(screen.getByRole('header', { name: 'Title' })).toBeOnTheScreen();
    },
  );

  it.each(
    VARIANTS.filter(variant => !HEADING_VARIANTS.includes(variant as never)),
  )('does not mark %s as a header', async variant => {
    await renderWithTheme(<Typography variant={variant}>Plain</Typography>);
    expect(screen.queryByRole('header')).toBeNull();
  });

  it('uses text.primary when no color is given', async () => {
    await renderWithTheme(<Typography>Default</Typography>);
    expect(flatStyle(screen.getByText('Default')).color).toBe(
      createAppTheme('light').palette.text.primary,
    );
  });

  it('uses the token color for caption without an explicit color', async () => {
    await renderWithTheme(<Typography variant="caption">Muted</Typography>);
    expect(flatStyle(screen.getByText('Muted')).color).toBe(
      createAppTheme('light').typography.caption.color,
    );
  });

  it('uses the token color for overline without an explicit color', async () => {
    await renderWithTheme(<Typography variant="overline">Label</Typography>);
    expect(flatStyle(screen.getByText('Label')).color).toBe(
      createAppTheme('light').typography.overline.color,
    );
  });

  it.each(Object.keys(colorByName) as (keyof typeof colorByName)[])(
    'resolves color="%s" to its theme token in light mode',
    async color => {
      await renderWithTheme(<Typography color={color}>Colored</Typography>);
      expect(flatStyle(screen.getByText('Colored')).color).toBe(
        colorByName[color](createAppTheme('light')),
      );
    },
  );

  it.each(Object.keys(colorByName) as (keyof typeof colorByName)[])(
    'resolves color="%s" to its theme token in dark mode',
    async color => {
      await renderWithTheme(
        <Typography color={color}>Colored</Typography>,
        'dark',
      );
      expect(flatStyle(screen.getByText('Colored')).color).toBe(
        colorByName[color](createAppTheme('dark')),
      );
    },
  );

  it('overrides only the font weight of the variant', async () => {
    await renderWithTheme(
      <Typography variant="h1" weight="400">
        Light
      </Typography>,
    );
    const token = createAppTheme('light').typography.h1;
    const style = flatStyle(screen.getByText('Light'));

    expect(style.fontWeight).toBe('400');
    expect(style.fontSize).toBe(token.fontSize);
    expect(style.lineHeight).toBe(token.lineHeight);
  });

  it('applies text alignment', async () => {
    await renderWithTheme(<Typography align="center">Centered</Typography>);
    expect(flatStyle(screen.getByText('Centered')).textAlign).toBe('center');
  });

  it('applies a style object last, over the variant and color', async () => {
    await renderWithTheme(
      <Typography
        variant="h2"
        color="error"
        style={{ color: 'red', fontSize: 99 }}>
        Override
      </Typography>,
    );
    const style = flatStyle(screen.getByText('Override'));

    expect(style.color).toBe('red');
    expect(style.fontSize).toBe(99);
  });

  it('applies a style function that receives the theme', async () => {
    await renderWithTheme(
      <Typography style={theme => ({ color: theme.palette.success.main })}>
        Themed
      </Typography>,
    );
    expect(flatStyle(screen.getByText('Themed')).color).toBe(
      createAppTheme('light').palette.success.main,
    );
  });

  it('limits system font scaling to 2 by default', async () => {
    await renderWithTheme(<Typography>Scaled</Typography>);
    expect(screen.getByText('Scaled').props.maxFontSizeMultiplier).toBe(2);
  });

  it('allows overriding maxFontSizeMultiplier per instance', async () => {
    await renderWithTheme(
      <Typography maxFontSizeMultiplier={1.5}>Scaled</Typography>,
    );
    expect(screen.getByText('Scaled').props.maxFontSizeMultiplier).toBe(1.5);
  });

  it('forwards other Text props unchanged', async () => {
    await renderWithTheme(
      <Typography
        accessibilityLabel="Custom label"
        numberOfLines={1}
        testID="typo">
        Forwarded
      </Typography>,
    );
    const text = screen.getByTestId('typo');

    expect(text.props.accessibilityLabel).toBe('Custom label');
    expect(text.props.numberOfLines).toBe(1);
  });

  it('renders a non-interactive text node', async () => {
    await renderWithTheme(<Typography>Static</Typography>);
    const text = screen.getByText('Static');

    expect(text.type).toBe('Text');
    expect(text.props.onPress).toBeUndefined();
  });
});
