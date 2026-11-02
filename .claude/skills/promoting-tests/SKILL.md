---
name: promoting-tests
description: Promotes reviewed AI-generated Playwright tests from tests/generated/ into the regression suite in tests/ui/, deduplicating against existing test cases, refactoring into fixtures and Page Objects, assigning test case IDs and updating specs. Use when the user asks to promote, adopt or move generated or @generated tests into regression.
---

# Promoting generated tests to regression

Input: one or more generated test IDs (e.g. `TC-SAUCEDEMO-006`), optionally with the target ID or feature. Follow `CLAUDE.md` for all coding rules; this Skill adds only the promotion steps.

## Steps

1. **Read** the generated test, its entry in `specs/generated/<site>.md`, the target `specs/<feature>.md` and `tests/ui/<feature>.spec.ts`.
2. **Deduplicate by equivalence class**, not by title: same input class (user type, data) + same action + same expected result = duplicate.
   - Full duplicate → do not promote; explain which existing test covers it.
   - Adds a check the existing test lacks → add that assertion to the existing test instead of creating a new one, and update its spec.
   - New coverage → promote.
3. **Assign the ID**: the next free number in that feature's spec (`TC-LOGIN-006`, `TC-CART-004`). Never reuse or renumber IDs.
4. **Rewrite** in `tests/ui/<feature>.spec.ts`:
   - Fixtures from `fixtures/test-fixtures.ts` (`loggedInInventory`, `cartPage`, …); credentials only via fixtures or `config/env.ts`.
   - Locators and actions in Page Objects (`pages/`). Missing one? Add a method or locator to the right class; one class per screen; no assertions inside Page Objects.
   - Title starts with the new ID; tag `@regression` (`@smoke` only if the user asks).
   - Keep the generated test's assertions at least as strict. Never weaken one.
     See [example.md](example.md) for a before/after.
5. **Update the records**:
   - `specs/<feature>.md`: add or update the test case, `Automated: Yes (tests/ui/<feature>.spec.ts)`.
   - Delete the promoted test from the generated spec file; in `specs/generated/<site>.md` mark it `Promoted to <new ID>`.
6. **Validate, fix, repeat** until green:
   `npm run lint && npm run typecheck && npx playwright test tests/ui/<feature>.spec.ts`, then `npm test`.
   - Fails because of the test → fix the test and re-run.
   - Fails because the app is wrong → stop. Do not change the assertion. Report it as a potential bug (use the `writing-bug-reports` Skill).

## Report

End with:

| Generated | Decision | New/updated ID | File |
| --------- | -------- | -------------- | ---- |

Then the validation results, every file changed, and any interpretation you made (e.g. IDs and descriptions in the request disagreed and which one you followed).
