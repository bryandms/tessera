export type PaletteShades = {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
};

export const paletteShades = {
  primary: {
    50: '#E3F3FF',
    100: '#BAE0FF',
    200: '#8CCDFF',
    300: '#58BAFF',
    400: '#27AAFF',
    500: '#009BFF',
    600: '#008CFF',
    700: '#0068DA',
    800: '#0047BB',
    900: '#003A99',
  },
  secondary: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  success: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  info: {
    50: '#E1F5FE',
    100: '#B3E5FC',
    200: '#81D4FA',
    300: '#4FC3F7',
    400: '#2AB7F6',
    500: '#04AAF4',
    600: '#049CE5',
    700: '#0289D1',
    800: '#0278BD',
    900: '#01589B',
  },
  warning: {
    50: '#FEF7DF',
    100: '#FDE9AF',
    200: '#FACF42',
    300: '#F9C307',
    400: '#F9C424',
    500: '#F8B900',
    600: '#F9AB00',
    700: '#F99800',
    800: '#F98700',
    900: '#FA6500',
  },
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },
} satisfies Record<string, PaletteShades>;

export type SpacingScale = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export const spacingScale: SpacingScale = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

export type RadiusScale = {
  sm: number;
  md: number;
  lg: number;
  full: number;
};

export const radiusScale: RadiusScale = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
};
