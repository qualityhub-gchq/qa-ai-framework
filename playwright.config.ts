import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load local environment variables from .env (never committed). CI uses GitHub Secrets/Variables.
dotenv.config({ quiet: true });

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Fail the CI build if someone accidentally leaves test.only in the code.
  forbidOnly: isCI,
  // Retry only in CI. A test that passes on retry is reported as "flaky" — a signal, not a pass.
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    // Machine-readable results: consumed later by the AI bug-reporter agent (Phase 5).
    ['json', { outputFile: 'test-results/results.json' }],
    ...(isCI ? [['github'] as ['github']] : []),
  ],

  use: {
    // Debugging evidence, captured only when useful to keep runs fast.
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test',
  },

  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
    {
      // Tests written by the AI Explorer. Each file sets its own baseURL with test.use().
      // Tagged @generated, so they never run in the @smoke/@regression CI suites until a human promotes them.
      name: 'explorer',
      testDir: './tests/generated',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
