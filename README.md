<div align="center">

<img src="apps/website/static/img/logo.svg" alt="Tessera logo" width="112" />

<h3>Tessera</h3>

<p>
Copyable React Native components for Expo projects — shadcn-style: you copy the code, you don't install a package.
</p>

<a href="https://bryandms.github.io/tessera"><strong>Read the docs »</strong></a>

</div>

<!-- SHIELDS -->

<div align="center">

[![Expo](https://img.shields.io/badge/Expo%20SDK-57-000020?style=flat-square&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?style=flat-square&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![pnpm](https://img.shields.io/badge/pnpm-workspaces-F69220?style=flat-square&logo=pnpm)](https://pnpm.io)
[![Docusaurus](https://img.shields.io/badge/Docs-Docusaurus-3ECC5D?style=flat-square&logo=docusaurus)](https://docusaurus.io)
[![License](https://img.shields.io/badge/License-MIT-2E6B4A?style=flat-square)](LICENSE)

</div>

<!-- TOC -->

<details>
<summary>Table of contents</summary>
<ol>
  <li><a href="#about">About</a></li>
  <li><a href="#requirements">Requirements</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#using-the-components-in-your-app">Using the components in your app</a></li>
  <li><a href="#scripts">Scripts</a></li>
  <li><a href="#repository-documentation">Repository documentation</a></li>
  <li><a href="#releases">Releases</a></li>
</ol>
</details>

## About

Tessera is a catalog of self-contained React Native components that you **copy** into your Expo project instead of installing a package, the way [shadcn/ui](https://ui.shadcn.com) does it for the web.

- **Self-contained** — a component never imports another component, so fixes port as file-level diffs between projects.
- **Composition over props** — interactive components expose compound pieces (like `Button.Root` / `Button.Icon` / `Button.Text` / `Button.Spinner`) instead of mega-prop lists.
- **Theme-aware `style`** — every component accepts the native RN `style` prop with two shapes: plain RN styles, or a function `(theme, state) => styles` that reads design tokens and component state (`pressed`, `focused`, `disabled`…). No NativeWind, no styled-components — just `StyleSheet`, design tokens, theme and variants.
- **Accessible by default** — touch targets ≥ 48dp, semantic roles, `accessibilityState`, screen reader flows and WCAG AA contrast verified per component.

**Catalog status:** [Typography](https://bryandms.github.io/tessera/docs/components/typography) and [Button](https://bryandms.github.io/tessera/docs/components/button) are copy-ready. The [changelog](CHANGELOG.md) and release tags track what is copy-ready.

## Requirements

| Tool | Version                            |
| ---- | ---------------------------------- |
| Node | ≥ 20                               |
| pnpm | ≥ 11 (pinned via `packageManager`) |

VS Code gets Prettier + ESLint recommendations from `.vscode/extensions.json`; format-on-save ships configured.

## Installation

```bash
git clone https://github.com/bryandms/tessera.git
cd tessera
corepack enable pnpm
pnpm install
```

`pnpm install` also runs the `prepare` script, which installs the Git hooks — no extra step after a fresh clone.

Run the apps locally:

```bash
pnpm --filter demo start        # Expo demo (press i for iOS / a for Android)
pnpm --filter website start     # Docs site at http://localhost:3000
```

## Using the components in your app

Do **not** add tessera as a dependency. Follow the docs instead:

1. [How to copy](https://bryandms.github.io/tessera/docs/intro#how-to-copy) — copy `core` once plus the component folders you need into `src/shared/ui/tessera/`.
2. Mount `ThemeProvider` at your app root (snippet included in the guide).
3. Import each component from its page.

When new versions land, filter the [changelog](CHANGELOG.md) by the components you copied and port the diffs — the "Version and changes" section of each component page lists what to check.

## Scripts

| Script                                     | What it does                                                     |
| ------------------------------------------ | ---------------------------------------------------------------- |
| `pnpm --filter demo start`                 | Expo demo (development build; also `ios`/`android` run scripts)  |
| `pnpm --filter website start`              | Docusaurus dev server                                            |
| `pnpm lint` / `pnpm lint:fix`              | ESLint flat config, including the self-containment boundaries    |
| `pnpm format` / `pnpm format:check`        | Prettier over the repo (with import sorting)                     |
| `pnpm typecheck`                           | `tsc --noEmit` in all workspaces                                 |
| `pnpm madge`                               | Circular dependency detection                                    |
| `pnpm validate`                            | Full local gate: `format:check` + `lint` + `typecheck` + `madge` |
| `pnpm release`                             | Release flow (version bump, changelog, tag, push)                |
| `pnpm alpha-release` / `pnpm beta-release` | Pre-release variants                                             |

## Repository documentation

| Doc                                                        | Content                                                               |
| ---------------------------------------------------------- | --------------------------------------------------------------------- |
| [Architecture](docs/architecture.md)                       | Monorepo layout, component anatomy, boundaries, core styling system   |
| [Tools](docs/tools.md)                                     | Every tool of the stack: version, role and official link              |
| [Development workflow](docs/development-workflow.md)       | Conventional Commits, Git hooks, `pnpm validate`, troubleshooting     |
| [Versioning and releases](docs/versioning-and-releases.md) | release-it step by step, synchronized versions, changelog conventions |
| [Adding a component](docs/adding-a-component.md)           | How to add a new component to the catalog                             |

## Releases

Releases are tagged `v{version}` from Conventional Commits and recorded in the [changelog](CHANGELOG.md). The full flow lives in [Versioning and releases](docs/versioning-and-releases.md).

## License

Distributed under the [MIT License](LICENSE) — that is what defines the terms for copying the components.
