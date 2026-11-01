#!/usr/bin/env node
/**
 * Prints the accessibility tree (ARIA snapshot) of a page — the same view the AI agents use.
 * Fallback exploration tool for the AI Explorer, and handy for humans writing locators.
 * Usage: node scripts/page-snapshot.mjs https://www.saucedemo.com
 */
import { chromium } from '@playwright/test';

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/page-snapshot.mjs <url>');
  process.exit(1);
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  console.log(`# ${await page.title()}  (${page.url()})\n`);
  console.log(await page.locator('body').ariaSnapshot());
} finally {
  await browser.close();
}
