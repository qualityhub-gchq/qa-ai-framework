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

## AI Explorer (generated tests)

- Generated tests live in `tests/generated/<site>/` and plans in `specs/generated/<site>.md`.
- They import from `@playwright/test`, set `test.use({ baseURL })` per file and are tagged `@generated` only.
- To promote a reviewed test: move it to `tests/ui/`, refactor it into Page Objects/fixtures, tag `@regression`.

## Skills (`.claude/skills/`)

- `writing-bug-reports`: failing or fixme test → GitHub issue (template, severity rules, duplicate check). Also used by the AI Bug Reporter workflow.
- `promoting-tests`: reviewed generated tests → regression suite (dedupe, Page Objects, IDs, specs).
- Change a Skill only through a Pull Request, and re-run its `evals.md` cases after the change.
