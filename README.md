<div align="center">
  <img src="brand/tessera-mark.svg" alt="Tessera logo" width="96" height="96">

  <h1>Tessera</h1>

  <p>
    Copy-paste React Native components for Expo projects.
  </p>

  <p>
    <a href="https://bryandms.github.io/tessera/"><strong>Documentation</strong></a>
    ·
    <a href="https://github.com/bryandms/tessera/releases"><strong>Releases</strong></a>
    ·
    <a href="https://github.com/bryandms/tessera/issues"><strong>Report an issue</strong></a>
  </p>
</div>

<details>
  <summary>Table of contents</summary>

- [About the project](#about-the-project)
- [Getting started](#getting-started)
- [Repository structure](#repository-structure)
- [Development](#development)
- [Releases](#releases)

</details>

## About the project

Tessera is a catalog of React Native components that you copy into your Expo project. Nothing is installed: you own the source code, adapt it, and keep it in your repository like any other code.

- **Copy, do not install.** Each component is a folder of source files that depends only on React, React Native and the shared `core` folder.
- **Themed by default.** A `ThemeProvider` supplies light and dark palettes, and every piece of text carries an explicit theme color.
- **Accessible.** Touch targets of at least 48 dp, accessibility roles and states, and WCAG AA contrast for text and interface elements.
- **No native modules.** Components work in a development build of Expo and need nothing beyond the APIs Expo already includes.

## Getting started

Read the [introduction](https://bryandms.github.io/tessera/) to see how to copy the source, wrap your app with `ThemeProvider`, and use a component.

Tessera publishes versions as Git tags named `v{version}`. To copy a specific release, check out its tag and read the documentation in the repository at that same tag. The [releases page](https://github.com/bryandms/tessera/releases) lists every version and its changes.

## Repository structure

| Path                   | Purpose                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `packages/tessera/src` | The catalog source: `core` tokens and theme, and one folder per component. This is what you copy. |
| `examples/`            | Runnable examples for each component, shared by the demo app and the documentation.               |
| `apps/demo/`           | Expo app that renders the examples on a device.                                                   |
| `apps/website/`        | Documentation site, built with Docusaurus.                                                        |
| `brand/`               | Logo and app icon sources.                                                                        |
| `scripts/`             | Repository scripts, such as the WCAG contrast check and the release helpers.                      |

## Development

Requirements: Node 22.22.2 or later and pnpm 11.

```bash
pnpm install
pnpm validate                       # format, lint, types, circular imports and contrast
pnpm --filter website start         # documentation at http://localhost:3000/tessera/
pnpm --filter demo exec expo run:ios      # demo as a development build (iOS)
pnpm --filter demo exec expo run:android  # demo as a development build (Android)
```

Commits follow [Conventional Commits](https://www.conventionalcommits.org) in English. Git hooks run the formatter, the linter and the commit message check, and `pnpm validate` runs before every push.

## Releases

Versions are calculated from the commit history: `feat` raises the minor version, `fix` raises the patch version, and a breaking change raises the major version. Each release updates `CHANGELOG.md`, which is generated from the commits and lists the new components and fixes.

```bash
pnpm release          # next stable version
pnpm alpha-release    # pre-release, alpha
pnpm beta-release     # major pre-release, beta
```

Releases use a `GITHUB_TOKEN` read from a local `.env` file. Copy `.env.example` to `.env` and add your token.
