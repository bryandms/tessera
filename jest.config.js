/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  roots: ['<rootDir>/packages/tessera/tests'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};
