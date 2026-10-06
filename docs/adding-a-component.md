# Adding a component

The canonical pattern lives in the Typography component — read its source, demo screen and docs page before adding anything new. This is the checklist for every new component.

## 1. Component folder

Create `packages/tessera/src/components/<name>/` (kebab-case):

- `<name>.tsx` — implementation. Interactive components use **compound pieces** (`Button.Root`, `Button.Icon`, `Button.Text`) sharing state through an internal context; simple components are a single piece.
- `types.ts` — optional, when the public types outgrow the component file.
- `variants.ts` — optional, when the variant dispatch outgrows the component file.
- `index.ts` — barrel exporting the public API only. This is what the catalog barrel (`src/index.ts`) re-exports.

Canonical reference: `components/typography/` — `typography.tsx` + `index.ts` with the type dispatch inline; split files only when they earn their keep.

Non-negotiables:

- Imports: `react`, `react-native`, `../../core`, own folder — **never another component** (the `tessera/self-contained-components` ESLint rule enforces it).
- Every text `Text` carries an explicit theme color (never the RN default black).
- Props over styles: semantics as props (`variant`, `tone`, `size`), per-instance escapes via `style` (plain RN styles or `(theme, state) => styles`). Prefer `Record`-based dispatch over `switch` for token mapping.
- Accessibility: `accessibilityRole`, `accessibilityState`, touch targets ≥ 48dp on interactive pieces, `hitSlop`/padding for spacing, announce-only flows documented.
- Export the component and its types from the catalog barrel.

## 2. Examples

`examples/<name>/` — one **complete, runnable file per example** + `index.ts` manifest. Each slice defines its own `CatalogExample` type (see `examples/typography/index.ts` for the reference):

```ts
export const nameExamples: CatalogExample[] = [
  {
    id: 'name/basic',
    title: 'Basic',
    description: '…',
    Component: NameBasicExample,
  },
];
```

- Re-export each example component from the slice barrel (the docs import them individually).
- Keep the examples usable in light and dark mode — the previews toggle both.
- Map the manifest order 1:1 between the demo screen and the docs page.

## 3. Demo screen

`apps/demo/src/app/<name>.tsx` rendering the manifest + registering the link in `apps/demo/src/app/index.tsx`:

- Root: `SafeAreaView` (`edges={['top', 'bottom']}`) with **flattened** styles; `<Link asChild>` children also flattened (expo-router Slot guard).
- Long content inside a `ScrollView` (`contentContainerStyle` with gap/padding).
- Descriptions through the manifest, titles via `Typography`.
- Add the workspace dep if the component introduces it (`apps/demo/package.json`).

## 4. Docs page

`apps/website/docs/components/<name>.mdx` — component-only content (the global guide lives in the intro):

1. Intro (what it solves + link to the [How to copy](/docs/intro#how-to-copy) guide).
2. Basic example: code fence with meta ` ```tsx tessera-example:<component>/<example>.tsx ` + `<ExamplePreview Component={…} />`.
3. All examples from the manifest, same order.
4. **Accessibility** — what the component sets, what the consumer must provide.
5. **Dependencies** table — every import and why (used to estimate porting effort).
6. **Version and changes** — point to `CHANGELOG.md` filtered by the component scope.
7. **Props API** table.

Add `sidebar_position` in frontmatter if the sidebar order matters.

## 5. Gate

- `pnpm validate` green (includes the boundaries lint).
- Manual run in the demo on device/simulator, light and dark, checking the a11y contract where applicable.
- `pnpm --filter website build` — code blocks populated and previews rendered.
- Commit with the component scope: `feat(<name>): add <name> component with examples, docs and previews`.
