import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import packageJson from '../../package.json';

const config: Config = {
  title: 'Tessera',
  tagline: 'Copy-paste React Native components for Expo projects',
  favicon: 'img/favicon.ico',

  url: 'https://bryandms.github.io',
  baseUrl: '/tessera/',
  organizationName: 'bryandms',
  projectName: 'tessera',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    function reactNativeWeb() {
      return {
        name: 'react-native-web',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                'react-native$': 'react-native-web',
              },
            },
          };
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {},
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Tessera',
      items: [
        {
          to: '/releases',
          label: `v${packageJson.version}`,
          position: 'right',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
