#!/usr/bin/env node
/**
 * Claude Code PostToolUse hook: formats (and lint-fixes) the file Claude just edited.
 * Keeps AI-written code consistent with .prettierrc and ESLint without anyone asking.
 * Never blocks: if formatting fails, CI (lint + format:check) is still the safety net.
 */
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const input = JSON.parse(readFileSync(0, 'utf8'));
const filePath = input.tool_input?.file_path;
if (!filePath || !existsSync(filePath)) process.exit(0);

const formattable = /\.(ts|mjs|json|md|yml|yaml)$/.test(filePath);
const lintable = /\.(ts|mjs)$/.test(filePath);
const skip = /(node_modules|playwright-report|test-results|package-lock\.json)/.test(filePath);
if (!formattable || skip) process.exit(0);

try {
  if (lintable) execFileSync('npx', ['eslint', '--fix', filePath], { stdio: 'ignore' });
  execFileSync('npx', ['prettier', '--write', filePath], { stdio: 'ignore' });
} catch {
  // Lint errors that --fix cannot repair are reported by `npm run lint` and CI.
}
