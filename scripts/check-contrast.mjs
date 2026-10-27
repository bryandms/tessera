import { createAppTheme } from '../packages/tessera/src/core/theme.ts';

const TEXT_MIN = 4.5;
const NON_TEXT_MIN = 3;
function parseColor(value) {
  const hex = /^#([0-9a-f]{6})$/i.exec(value);
  if (hex) {
    const number = parseInt(hex[1], 16);
    return {
      r: (number >> 16) & 255,
      g: (number >> 8) & 255,
      b: number & 255,
      a: 1,
    };
  }
  const rgba =
    /^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)$/i.exec(value);
  if (rgba) {
    return {
      r: Number(rgba[1]),
      g: Number(rgba[2]),
      b: Number(rgba[3]),
      a: rgba[4] === undefined ? 1 : Number(rgba[4]),
    };
  }
  throw new Error(`Unsupported color: ${value}`);
}

function over(foreground, background) {
  const top = parseColor(foreground);
  const bottom = parseColor(background);
  const mix = (channel, other) => top[channel] * top.a + other * (1 - top.a);
  return {
    r: mix('r', bottom.r),
    g: mix('g', bottom.g),
    b: mix('b', bottom.b),
  };
}

function luminance({ r, g, b }) {
  const linear = channel => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function contrastRatio(foreground, background) {
  const foregroundLuminance = luminance(over(foreground, background));
  const backgroundLuminance = luminance(over(background, background));
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

function checksFor(mode) {
  const theme = createAppTheme(mode);
  const { background, text } = theme.palette;
  const surface = background.default;
  const checks = [];

  const add = (label, foreground, background, minimum) => {
    checks.push({
      mode,
      label,
      ratio: contrastRatio(foreground, background),
      minimum,
    });
  };

  const colorKeys = Object.entries(theme.palette)
    .filter(
      ([, value]) =>
        typeof value === 'object' && value !== null && 'main' in value,
    )
    .map(([key]) => key);

  for (const key of colorKeys) {
    add(
      `palette.${key}.textColor on background`,
      theme.palette[key].textColor,
      surface,
      TEXT_MIN,
    );
    add(
      `palette.${key}.contrastText on main`,
      theme.palette[key].contrastText,
      theme.palette[key].main,
      TEXT_MIN,
    );
    add(
      `palette.${key}.contrastText on dark`,
      theme.palette[key].contrastText,
      theme.palette[key].dark,
      TEXT_MIN,
    );
    add(
      `palette.${key}.main on background`,
      theme.palette[key].main,
      surface,
      NON_TEXT_MIN,
    );
    add(
      `palette.${key}.dark on background`,
      theme.palette[key].dark,
      surface,
      NON_TEXT_MIN,
    );
  }

  add('palette.text.primary on background', text.primary, surface, TEXT_MIN);
  add(
    'palette.text.secondary on background',
    text.secondary,
    surface,
    TEXT_MIN,
  );

  for (const [variant, token] of Object.entries(theme.typography)) {
    if (token.color) {
      add(
        `typography.${variant}.color on background`,
        token.color,
        surface,
        TEXT_MIN,
      );
    }
  }

  return checks;
}

const checks = [...checksFor('light'), ...checksFor('dark')];
const failures = checks.filter(check => check.ratio < check.minimum);

for (const check of checks) {
  const status = check.ratio < check.minimum ? 'FAIL' : 'ok  ';
  console.log(
    `${status} ${check.mode.padEnd(5)} ${check.label} ${check.ratio.toFixed(2)}:1 (min ${check.minimum}:1)`,
  );
}

if (failures.length > 0) {
  console.error(`\n${failures.length} contrast check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log(`\nAll ${checks.length} contrast checks pass.`);
}
