import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const examplesDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  '..',
  'examples',
);

const META_PREFIX = 'tessera-example:';

const visit = (node, visitor) => {
  if (Array.isArray(node.children)) {
    node.children.forEach(child => {
      visitor(child);
      visit(child, visitor);
    });
  }
};

const getExamplePath = meta => {
  if (!meta || !meta.startsWith(META_PREFIX)) {
    return null;
  }
  const relative = meta.slice(META_PREFIX.length).trim();
  const resolved = path.resolve(examplesDir, relative);
  if (!resolved.startsWith(examplesDir + path.sep)) {
    throw new Error(
      `tessera-example meta escapes the examples folder: ${relative}`,
    );
  }
  return resolved;
};

export default function remarkRegistryExample() {
  return tree => {
    visit(tree, node => {
      if (node.type !== 'code') {
        return;
      }
      const examplePath = getExamplePath(node.meta);
      if (!examplePath) {
        return;
      }
      node.value = fs.readFileSync(examplePath, 'utf8');
      node.meta = node.meta.slice(META_PREFIX.length).trim() || null;
    });
  };
}
