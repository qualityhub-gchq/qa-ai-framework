# Instructions for Claude Code in this repo

This is a QA automation framework (Playwright + TypeScript). When writing or changing tests:

- Start every test title with its test case ID from `specs/` (e.g. `TC-LOGIN-005 ...`).
- Import `test` and `expect` from `fixtures/test-fixtures.ts` for UI tests (not from `@playwright/test`).
- Use Page Objects in `pages/`. Page objects hold locators and actions; assertions stay in tests.
- Locators: prefer `getByRole`, `getByLabel`, `getByPlaceholder`, then `getByTestId` (`data-test`). No XPath, no long CSS chains.
- Never use `waitForTimeout` or `force: true`. Use web-first assertions (`await expect(locator).toBeVisible()`).
- Tests must be independent and able to run in parallel. Create test data with builders in `test-data/`.
- Tag tests: `@smoke` (critical, fast) and/or `@regression`.
- Read secrets/URLs only through `config/env.ts`. Never hard-code real credentials.
- After changes run: `npm run lint && npm run typecheck && npx playwright test`.
- When a test fails because the APP is wrong (not the test), do not "fix" the assertion — report it as a bug.
