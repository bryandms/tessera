# Versioning and releases

Releases are computed from Conventional Commits with release-it: every feat/fix produces a version, a tag and a changelog entry. What matters to component consumers is the **tag + changelog** — the update story of the copy model.

## What a release does

`pnpm release` (requires a clean working directory) executes, in order:

1. Computes the next version from commits since the last tag (feat → minor, fix → patch; `!` or BREAKING CHANGE → major).
2. Writes a **prepended** entry into `CHANGELOG.md`.
3. Bumps the root `package.json` and runs `node scripts/sync-versions.mjs` (hook `after:bump`), which syncs **all** workspace versions to the same value — they always move together.
4. Creates a single commit `chore: release v{version}` containing all of the above.
5. Creates the annotated tag `v{version}`.
6. Pushes commit + tag (`git push --follow-tags`).

Nothing is published to npm — the components are copied, not installed. GitHub Releases are disabled by default (`github.release: false`); enable them by adding a `GITHUB_TOKEN` to `.env` and setting `github.release: true` in `.release-it.json`.

## Scripts

| Script               | Effect                                |
| -------------------- | ------------------------------------- |
| `pnpm release`       | Next stable version                   |
| `pnpm alpha-release` | Preminor with `alpha` pre-release tag |
| `pnpm beta-release`  | Major with `beta` pre-release tag     |

The scripts wrap release-it with `dotenv -e .env`; the local `.env` is created from `.env.example` and is git-ignored.

## Changelog conventions

- Only `feat` and `fix` produce changelog sections (`Features`, `Bug Fixes`); tooling commits (`chore`) don't — consumers only port catalog content.
- **Never use `#` in commit bodies**: tokens like `#ABC123` (e.g. hex colors) become fake issue reference links in the generated changelog.
- The first curated entry is the **Baseline** — content shipped before versioning started. Version history begins at `0.1.0`.

## First release bootstrap (repository operations)

```bash
git tag -a v0.1.0 -m "Release 0.1.0"
git push origin main v0.1.0
```

With the tag anchored, the next `pnpm release` only counts new commits and will propose `v0.2.0` — no changelog duplication.

## Pre-release checks

- `pnpm validate` green (the repo is clean: release-it demands it).
- `pnpm release -- --dry-run --ci` to inspect the plan (version, tag, changelog sections) before executing for real.

## Where releases land

- Tag: `v{version}` on `main`.
- `CHANGELOG.md`: new section at the top, with commit links.
- Every consumer project: diff the components you copied (`git diff v{prev}..v{next} -- packages/tessera/src`) and port manually — each component page lists its exact file set to diff.
