# Prompt playbook

Reusable prompts for the AI-assisted workflow. Each one is a starting point: fill in the `<placeholders>`, run it in Claude Code, then **review the output like a PR**. AI drafts; a human owns the judgment.

All prompts rely on [CLAUDE.md](CLAUDE.md) for coding rules, so they don't repeat them. Where an agent or Skill already does the job, this file links to it instead of copying it.

| #   | Stage    | Tool                                                                                             |
| --- | -------- | ------------------------------------------------------------------------------------------------ |
| 1   | Plan     | [playwright-test-planner](.claude/agents/playwright-test-planner.md)                             |
| 2   | Generate | [playwright-test-generator](.claude/agents/playwright-test-generator.md)                         |
| 3   | Review   | prompt below                                                                                     |
| 4   | Heal     | [playwright-test-healer](.claude/agents/playwright-test-healer.md)                               |
| 5   | Report   | [writing-bug-reports](.claude/skills/writing-bug-reports/SKILL.md)                               |
| 6   | Promote  | [promoting-tests](.claude/skills/promoting-tests/SKILL.md)                                       |
| 7   | Explore  | [.github/prompts/ai-explorer.md](.github/prompts/ai-explorer.md) (used by the Explorer workflow) |

## 1. Plan: requirement to test cases

```text
Use the playwright-test-planner agent. Target: <url or feature>.
Requirements: <user story / acceptance criteria>.
Write the plan to specs/<feature>.md using the template in specs/README.md.
Cover happy path, negative, boundary and validation cases. Give each case an ID
(TC-<FEATURE>-NNN) and a priority. Where observed behaviour contradicts the
requirements, keep the requirement as the expected result.
```

**Human check:** trim duplicates and low-value cases before any code is written.

## 2. Generate: one test case to one test

```text
Use the playwright-test-generator agent for TC-<FEATURE>-<NNN> from specs/<feature>.md.
Explore the real page first; do not guess selectors. Reuse the existing Page Objects in
pages/ and fixtures in fixtures/test-fixtures.ts. Create data with builders in test-data/.
One test only. Follow CLAUDE.md.
```

**Human check:** does the assertion verify real behaviour, not just that the page loaded?

## 3. Review: check a draft against the rules

```text
Review <file> against CLAUDE.md. List every violation: missing test case ID in the title,
wrong import, locators outside Page Objects, weak locator choice, waitForTimeout or
force: true, shared state between tests, hard-coded URLs or credentials, missing tag.
Also flag assertions that cannot fail and tests that duplicate an existing one in
tests/ui/. Report findings only; do not edit.
```

## 4. Heal: a failing test

```text
Use the playwright-test-healer agent on <test file>.
First decide: is the TEST wrong (locator, timing, bad assumption) or the APP wrong?
Fix only test problems. If the app is wrong, do NOT change the assertion;
report it as a bug (see prompt 5).
```

**Human check:** read the diff. A healed test that quietly weakens its assertion is a missed bug.

## 5. Report: a failure to a GitHub issue

```text
Use the writing-bug-reports skill for <failing test or test.fixme>.
Draft only. Show me the issue before filing.
```

## 6. Promote: generated test to regression

```text
Use the promoting-tests skill for <TC-SITE-NNN>, target feature <feature>.
```

## 7. Explore: a new site

Run the **AI Explorer** workflow in GitHub Actions with a URL and optional requirements. The prompt it uses is [.github/prompts/ai-explorer.md](.github/prompts/ai-explorer.md). Output is a draft PR with `@generated` tests; nothing reaches the regression suite until a human promotes it (prompt 6).

---

## Before merging any AI-written test

```bash
npm run lint && npm run typecheck && npx playwright test
npx playwright test <file> --repeat-each=10   # flakiness check
```

If the test never fails when the feature is broken, it isn't a test. Break the feature on purpose once to prove it can fail.
