import expoFlat from 'eslint-config-expo/flat.js';
import prettierConfig from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import path from 'node:path';

const tesseraPlugin = {
  meta: { name: 'tessera-plugin' },
  rules: {
    'self-contained-components': {
      meta: {
        schema: [],
        messages: {
          violation:
            'Tessera: components must stay self-contained — this import reaches another component. Fixes are ported per component, so cross-component imports are not allowed. Allowed: own folder, `core`, approved `hooks`/`utils`, react, react-native.',
        },
      },
      create(context) {
        const filename = context.filename;
        const marker = `${path.sep}src${path.sep}components${path.sep}`;
        const markerIndex = filename.indexOf(marker);
        if (markerIndex === -1) {
          return {};
        }
        const componentsRoot = path.resolve(
          filename.slice(0, markerIndex),
          `.${path.sep}src${path.sep}components`,
        );
        const ownSlice = path
          .relative(componentsRoot, filename)
          .split(path.sep)[0];
        const isInsideOwnSlice = resolved => {
          const relative = path.relative(componentsRoot, resolved);
          return (
            relative === ownSlice ||
            relative.startsWith(`${ownSlice}${path.sep}`)
          );
        };

        const check = (source, node) => {
          if (typeof source !== 'string' || !source.startsWith('.')) {
            return;
          }
          const resolved = path.resolve(path.dirname(filename), source);
          const isComponentsRoot = resolved === componentsRoot;
          if (
            (!isComponentsRoot &&
              !resolved.startsWith(`${componentsRoot}${path.sep}`)) ||
            isInsideOwnSlice(resolved)
          ) {
            return;
          }
          context.report({ node, messageId: 'violation', data: { source } });
        };

        return {
          ImportDeclaration: node => check(node.source.value, node),
          ImportExpression: node =>
            check(
              node.source.type === 'Literal' &&
                typeof node.source.value === 'string'
                ? node.source.value
                : '',
              node,
            ),
          ExportAllDeclaration: node => check(node.source.value, node),
          ExportNamedDeclaration: node =>
            node.source ? check(node.source.value, node) : undefined,
        };
      },
    },
  },
};

const eslintConfig = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.expo/**',
      '**/.docusaurus/**',
      '**/build/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.next/**',
      '**/out/**',
      '**/expo-env.d.ts',
      '**/next-env.d.ts',
    ],
  },

  ...expoFlat,

  {
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs['recommended-latest'].rules,
  },

  {
    files: ['**/*.{ts,tsx,d.ts}'],
    plugins: (() => {
      const entry = expoFlat.find(
        config => config.plugins?.['@typescript-eslint'],
      );
      if (!entry) {
        throw new Error(
          'eslint-config-expo/flat no longer declares the @typescript-eslint plugin; update the plugin extraction in eslint.config.mjs',
        );
      }
      return { '@typescript-eslint': entry.plugins['@typescript-eslint'] };
    })(),
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  {
    files: ['packages/tessera/src/components/**/*.{ts,tsx}'],
    plugins: { tessera: tesseraPlugin },
    rules: {
      'tessera/self-contained-components': 'error',
    },
  },

  {
    files: [
      'packages/tessera/src/core/**/*.{ts,tsx}',
      'packages/tessera/src/hooks/**/*.{ts,tsx}',
      'packages/tessera/src/utils/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '\\.\\.?/components',
              message:
                'Tessera: core/hooks/utils must not depend on components (components depend on core, never the reverse).',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['apps/**/*.{ts,tsx}', 'examples/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['tessera/src/**', 'tessera-examples/*'],
              message:
                'Tessera: import the public barrel only (`import ... from "tessera"` / `"tessera-examples"`).',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['apps/website/**/*.{ts,tsx}'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },

  prettierConfig,
];

export default eslintConfig;
