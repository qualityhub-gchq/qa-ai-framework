#!/usr/bin/env node
/**
 * AI Explorer — step 1: validate the requested URL against the allowlist and prepare the run.
 *
 * Usage (CI):   node scripts/explorer-prepare.mjs
 *   reads env:  EXPLORER_URL, EXPLORER_REQUIREMENTS (optional), GITHUB_RUN_NUMBER (optional)
 *   writes:     explorer-input.json (read by Claude) and GITHUB_OUTPUT values (read by the workflow)
 *
 * Inputs are passed through environment variables (not pasted into shell commands) to avoid
 * script injection — a GitHub Actions security best practice.
 */
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Returns { ok: true, url } or { ok: false, reason }. Exported for unit testing. */
export function validateUrl(rawUrl, allowedDomains) {
  let url;
  try {
    url = new URL(String(rawUrl).trim());
  } catch {
    return { ok: false, reason: `Not a valid URL: "${rawUrl}"` };
  }
  if (url.protocol !== 'https:') {
    return { ok: false, reason: 'Only https:// URLs are allowed.' };
  }
  const host = url.hostname.toLowerCase();
  const allowed = allowedDomains.some((d) => host === d || host.endsWith(`.${d}`));
  if (!allowed) {
    return {
      ok: false,
      reason: `"${host}" is not in config/explorer.json allowedDomains (${allowedDomains.join(', ')}). Add it only if you own the site or it is a public practice site.`,
    };
  }
  return { ok: true, url };
}

/** "www.saucedemo.com" -> "saucedemo-com" */
export function slugFor(url) {
  return url.hostname
    .toLowerCase()
    .replace(/^www\./, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function main() {
  const config = JSON.parse(readFileSync('config/explorer.json', 'utf8'));
  const result = validateUrl(process.env.EXPLORER_URL ?? '', config.allowedDomains);

  if (!result.ok) {
    console.error(`::error::${result.reason}`);
    process.exit(1);
  }

  const { url } = result;
  const slug = slugFor(url);
  const input = {
    url: url.href,
    origin: url.origin,
    slug,
    requirements: (process.env.EXPLORER_REQUIREMENTS ?? '').trim() || null,
    maxTests: config.maxTests,
    planFile: `specs/generated/${slug}.md`,
    testsDir: `tests/generated/${slug}`,
  };
  writeFileSync('explorer-input.json', JSON.stringify(input, null, 2));
  console.log('Prepared AI Explorer run:', input);

  if (process.env.GITHUB_OUTPUT) {
    const run = process.env.GITHUB_RUN_NUMBER ?? 'local';
    appendFileSync(
      process.env.GITHUB_OUTPUT,
      `slug=${slug}\nhost=${url.hostname}\nbranch=ai-explorer/${slug}-${run}\n`,
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
