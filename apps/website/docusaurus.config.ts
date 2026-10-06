import type * as Preset from '@docusaurus/preset-classic';
import type { Config, PluginModule } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';
import remarkRegistryExample from './remark/registry-example.mjs';

const webpackAliasPlugin: PluginModule = () => ({
  name: 'tessera-webpack-alias',
  configureWebpack() {
    return {
      resolve: {
        alias: {
          'react-native$': 'react-native-web',
        },
      },
    };
  },
});

const config: Config = {
  title: 'Tessera',
  tagline:
    "Copyable React Native components for Expo — shadcn-style. Copy the code, don't install a package.",
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  plugins: [webpackAliasPlugin],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkRegistryExample],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Tessera',
      logo: {
        alt: 'Tessera logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'catalogSidebar',
          position: 'left',
          label: 'Docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Tessera. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
