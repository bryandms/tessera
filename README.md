# Tessera

> Copyable React Native components for Expo — shadcn-style. Copy the code, don't install a package.

Monorepo (pnpm workspaces):

| Workspace          | What it is                                             |
| ------------------ | ------------------------------------------------------ |
| `apps/demo`        | Expo app that renders the component examples on device |
| `apps/website`     | Docusaurus documentation site                          |
| `packages/tessera` | The component library (the copyable source)            |
| `examples/`        | The example apps/snippets shared by demo and docs      |

## Requirements

- Node >= 20
- pnpm >= 9 (`corepack enable pnpm`)

## Development

```bash
pnpm install

pnpm --filter demo start
pnpm --filter website start
```
