# Architecture

Tessera is a pnpm monorepo with one product split into four workspaces: the component source, the two app surfaces that consume it (docs site and demo) and the shared examples workspace.

## Monorepo layout

```text
tessera/
├── apps/
│   ├── website/           # Docusaurus 3; docs + live previews (react-native-web)
│   └── demo/              # Expo app: renders the component examples on device
├── packages/tessera/      # THE LIBRARY: only core + components (the copyable source)
│   └── src/
│       ├── core/          # Design tokens, createAppTheme, ThemeProvider, variants, style resolver
│       ├── components/    # One auto-contained folder per component
│       ├── hooks/         # (created when ≥ 2 approved components share a hook)
│       ├── utils/         # (created when ≥ 2 approved components share a util)
│       └── index.ts       # Catalog barrel (used by website/demo, never copied alone)
├── examples/              # Full, runnable examples per component + ordered manifest
├── brand/                 # Vector source of the logo and derived brand assets
├── docs/                  # Repository docs (English)
└── scripts/               # Release helper scripts
```

Key properties:

- `packages/tessera` is **never published** — its source is the distributable. `main` points to `src/index.ts` and the real build happens in each app (Metro for demo, webpack for website).
- `examples/` is the **single source of truth** for both the demo and the documentation: the demo renders the manifest and the docs embed the same files at build time — example code can never drift from what runs.
- `brand/` holds the vector logo; rasterized assets (icons, splash, favicon) are generated from it.

## Component anatomy

Every component lives in its own folder and is the unit of copying:

```text
components/typography/
├── typography.tsx   # implementation — compound pieces when the component is interactive
├── types.ts         # (optional) public types, colocated when the file would otherwise overflow
├── variants.ts      # (optional) variant maps, extracted when the dispatch outgrows the component file
└── index.ts         # barrel: the only public API of the slice
```

Rules that hold for every component:

- **Self-containment** — components never import each other. Allowed imports: `react`, `react-native`, the `core` barrel (via relative import to `../../core`) and own-folder relative files. Enforced by the `tessera/self-contained-components` ESLint rule.
- **Barrel only** — outside consumers (demo, examples, website) import the catalog through `tessera` (the package main), never `tessera/src/**`. Enforced by `no-restricted-imports`.
- **Direction** — `core`, `hooks` and `utils` must not depend on `components`. Enforced by `no-restricted-imports`.
- **Naming** — files kebab-case (`button.tsx`, `use-controllable-state.ts`); exports PascalCase for components, camelCase for hooks/utils.

## Core styling system

`core/` is the only shared block:

- **`tokens.ts`** — raw design tokens: 50–900 color ramps (primary/secondary/success/info/warning/error), spacing scale, radius scale.
- **`theme.ts`** — `createAppTheme(mode)` resolves ramps into `palette` (light: deep ends + white contrast text; dark: 300–400 range + black contrast text; **`textColor`** token = the AA-safe variant of each color used as text), typography scale (`h1`…`overline`), spacing and radius. Contrast is verified with a WCAG AA script for both modes: text colors ≥ 4.5:1 on `background.default`, `contrastText` ≥ 4.5:1 on `main`, surfaces ≥ 3:1 against the background.
- **`theme-provider.tsx`** — `ThemeProvider` + `useTheme()` + `useThemeMode()` (light/dark state).
- **`variants.ts`** — `createVariants` typed helper; each component maps its variant/tone/size to theme styles.
- **`style.ts`** — `TesseraStyleProp`: the native RN `style` prop accepting plain styles or `(theme, state) => styles` where `state` extends pressable state (`pressed`, `focused`, `disabled`, `error`, `selected`, `busy`). Applied as the last layer after variant styles — property names never change.

Components never rely on RN default text colors — text always carries an explicit theme color so dark mode always works.

## Theme and brand are independent

The brand (logo greens) is separate from the catalog theme tokens (blue primary). Consumers customize their copied `core` tokens freely without touching the logo, and the brand does not drive component colors.

## Documentation surfaces

- `apps/website/docs/intro.mdx` — global guide: the copy model, how-to-copy, theming, versioning. Nothing else belongs there.
- `apps/website/docs/components/<x>.mdx` — component page only: intro, examples (code embedded from `examples/` at build time + live react-native-web previews), accessibility contract, dependencies table, version/changes, props API.
- `examples/<component>/` — full runnable examples + `index.ts` manifest (`{ id, title, description?, Component }` in display order), consumed by both demo and docs.
- Accessibility examples in docs are usable as written — the docs show the a11y props a consumer should keep when porting.
