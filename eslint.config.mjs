import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'blob-report/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Node.js helper scripts (AI Explorer)
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly', URL: 'readonly' } },
  },
  {
    files: ['tests/**/*.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Best practices enforced automatically:
      'playwright/no-wait-for-timeout': 'error', // no hard waits
      'playwright/no-focused-test': 'error', // no test.only
      'playwright/no-force-option': 'warn', // force:true hides real UX bugs
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-page-pause': 'error',
    },
  },
  prettier,
);
