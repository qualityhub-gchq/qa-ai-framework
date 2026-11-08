# Evaluations for writing-bug-reports

Run each case in a **fresh** Claude Code session (so earlier context doesn't help). The Skill passes when every case meets its criteria. Re-run after any change to the Skill.

Tip: to avoid creating real issues while evaluating, add "draft only, do not run gh issue create" to the prompt.

| #   | Prompt                                                                                                              | Pass criteria                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `/writing-bug-reports TC-SAUCEDEMO-017 in tests/generated/saucedemo-com/problem-user.spec.ts` (draft only)          | Title names checkout + last name; steps include First Name, Last Name, Postal Code, Continue; severity **Critical** (checkout blocked) |
| 2   | `/writing-bug-reports TC-SAUCEDEMO-011` (draft only)                                                                | Says all products show the same image; severity **Medium** with a workaround/misleading reason; no invented steps                      |
| 3   | `/writing-bug-reports TC-SAUCEDEMO-013` (draft only)                                                                | Actual result includes the unsorted prices from the note (29.99, 9.99, …); severity **Medium**                                         |
| 4   | `/writing-bug-reports TC-SAUCEDEMO-016` (with `gh` available)                                                       | Finds the existing open issue about the cart badge after Remove and **comments** instead of creating a new issue                       |
| 5   | Give it a failure whose error is `locator.click: Timeout … getByTestId('add-to-cart-backpack')` (a renamed test id) | Classified as **automation issue**, label `automation-issue`, no severity                                                              |

Record results here when you run them:

| Date       | Skill version (commit) | 1    | 2    | 3    | 4    | 5    | Notes                                                                                                                                                                                                                                                                                                                                            |
| ---------- | ---------------------- | ---- | ---- | ---- | ---- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-11-08 | 7484c8f                | Pass | Pass | Pass | Pass | Pass | Run as draft-only in fresh sub-agents. Cases 1-4 matched an existing open issue (#5, #9, #7, #6), so the Skill chose "comment, don't create"; content criteria still met. Case 4 also found #10, an open duplicate of #6 that the CI bug reporter filed. Case 5 left the file path, TC-ID and user as placeholders because the prompt gave none. |
