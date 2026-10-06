import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const root = JSON.parse(
  readFileSync(path.join(rootDir, 'package.json'), 'utf8'),
);
const workspaces = [
  'apps/demo',
  'apps/website',
  'packages/tessera',
  'examples',
];

for (const dir of workspaces) {
  const file = path.join(rootDir, dir, 'package.json');
  const pkg = JSON.parse(readFileSync(file, 'utf8'));
  if (pkg.version !== root.version) {
    pkg.version = root.version;
    writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`${dir}: ${root.version}`);
  }
}
