#!/usr/bin/env node
/**
 * Claude Code PreToolUse hook for Bash: closes shell loopholes around the other project rules.
 * Exit code 2 = block the command and show the message to Claude.
 *  1. Writing into test code (tests/, pages/, fixtures/) via the shell skips block-banned-patterns.mjs.
 *  2. Reading .env via the shell skips the Read(./.env) deny rule.
 * It looks at where a command writes, not at every word in it, so commit messages and PR
 * descriptions that merely mention these folders are fine. Best-effort guard, not a sandbox.
 */
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const command = input.tool_input?.command ?? '';

/** Remove text that is only data: heredoc bodies and quoted strings that contain spaces. */
function stripText(cmd) {
  return cmd
    .replace(/(<<-?\s*(['"]?)(\w+)\2[^\n]*\n)[\s\S]*?\n[ \t]*\3(?=\n|$)/g, '$1')
    .replace(/'([^']*)'|"((?:[^"\\]|\\.)*)"/g, (_m, single, double) => {
      const body = single ?? double;
      return /\s/.test(body) ? '""' : body; // keep quoted paths such as "tests/a.ts"
    })
    .replace(/\d*>&\d+/g, '') // 2>&1
    .replace(/\d*>>?\s*\/dev\/null/g, ''); // >/dev/null
}

const cleaned = stripText(command);

// A path inside tests/, pages/ or fixtures/ (one command argument).
const T = String.raw`[^\s;&|]*?(?<![\w.-])(?:tests|pages|fixtures)\/[^\s;&|]*`;
const rest = String.raw`[^;&|\n]*`;
const end = String.raw`(?=\s*(?:[;&|\n]|$))`;

const writesToTestCode = [
  new RegExp(String.raw`>>?\s*${T}`), //                 echo x > tests/a.ts
  new RegExp(String.raw`\btee\b${rest}\s${T}`), //       ... | tee pages/A.ts
  new RegExp(String.raw`\b(?:sed|perl)\b${rest}\s(?:-\w*i\w*|--in-place)\b${rest}${T}`), // sed -i
  new RegExp(String.raw`\b(?:cp|mv|install|ln)\b${rest}\s${T}${end}`), // destination is last
  new RegExp(String.raw`\b(?:rm|touch|truncate)\b${rest}\s${T}`), //   rm tests/a.ts
];
// Inline scripts hide their targets inside quotes, so check the original text.
const inlineScript = new RegExp(String.raw`\b(?:python3?|node|ruby)\s+-[ce]\b${rest}${T}`);

if (writesToTestCode.some((re) => re.test(cleaned)) || inlineScript.test(command)) {
  console.error(
    'Blocked by project rule (CLAUDE.md): do not modify tests/, pages/ or fixtures/ through the shell. ' +
      'Use the Edit/Write/MultiEdit tools so the banned-pattern and format hooks run.',
  );
  process.exit(2);
}

// Any mention of .env or .env.<name>, except the committed template .env.example.
const envFile = /(^|[\s'"=/])\.env(\.(?!example\b)[\w-]+)?(?![\w.-])/;
if (envFile.test(cleaned)) {
  console.error(
    'Blocked by project rule (CLAUDE.md): do not read .env files through the shell. ' +
      'Read config only through config/env.ts and never expose secrets.',
  );
  process.exit(2);
}
