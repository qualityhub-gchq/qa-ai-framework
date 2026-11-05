#!/usr/bin/env node
/**
 * Claude Code PreToolUse hook: blocks edits that add patterns CLAUDE.md forbids in test code.
 * Runs before every Edit/Write. Exit code 2 = block the edit and show the message to Claude.
 * This turns "never use waitForTimeout / force: true" from a request into a rule.
 */
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const { file_path: filePath = '', new_string: newString, content } = input.tool_input ?? {};
const text = newString ?? content ?? '';

// Only guard test code (tests/, pages/, fixtures/), not docs or config.
const guarded = /(^|\/)(tests|pages|fixtures)\//.test(filePath) && filePath.endsWith('.ts');

const banned = [
  {
    pattern: /waitForTimeout\s*\(/,
    rule: 'waitForTimeout is banned. Use a web-first assertion: await expect(locator).toBeVisible().',
  },
  {
    pattern: /force:\s*true/,
    rule: 'force: true is banned. Fix the cause (visibility, overlay) instead of forcing the click.',
  },
];

if (guarded) {
  const hit = banned.find(({ pattern }) => pattern.test(text));
  if (hit) {
    console.error(`Blocked by project rule (CLAUDE.md): ${hit.rule}`);
    process.exit(2);
  }
}
