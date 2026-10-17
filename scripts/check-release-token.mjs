import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const releaseConfig = JSON.parse(
  readFileSync(new URL('../.release-it.json', import.meta.url), 'utf8'),
);

if (!releaseConfig.github?.release) {
  process.exit(0);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

const token = process.env.GITHUB_TOKEN;

if (!token) {
  fail(
    'GITHUB_TOKEN is required because github.release is enabled in .release-it.json. Set it in .env (see .env.example).',
  );
}

const remote = execFileSync('git', ['remote', 'get-url', 'origin'], {
  encoding: 'utf8',
}).trim();
const repository = /github\.com[:/](.+?)(?:\.git)?$/.exec(remote)?.[1];

if (!repository) {
  fail(`The origin remote is not a GitHub repository: ${remote}`);
}

const response = await fetch(`https://api.github.com/repos/${repository}`, {
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
  },
});

if (!response.ok) {
  fail(
    `GITHUB_TOKEN cannot read ${repository} (HTTP ${response.status}). Check the value in .env.`,
  );
}

const { permissions } = await response.json();

if (!permissions?.push) {
  fail(
    `GITHUB_TOKEN has no write access to ${repository}. Releases need "Contents: read and write".`,
  );
}
