import { readFileSync, writeFileSync } from 'node:fs';

const version = process.argv[2];

if (!version) {
  throw new Error('Usage: node scripts/sync-versions.mjs <version>');
}

const root = new URL('../', import.meta.url);

const manifests = [
  'package.json',
  'packages/tessera/package.json',
  'apps/website/package.json',
  'apps/demo/package.json',
  'examples/package.json',
];

for (const manifest of manifests) {
  const path = new URL(manifest, root);
  const packageJson = JSON.parse(readFileSync(path, 'utf8'));
  packageJson.version = version;
  writeFileSync(path, `${JSON.stringify(packageJson, null, 2)}\n`);
}
