---
name: writing-bug-reports
description: Writes a GitHub issue for a failing or test.fixme (POTENTIAL BUG) Playwright test using the team bug template, severity rules and a keyword-based duplicate check. Use when a regression test fails, an AI Explorer run reports a POTENTIAL BUG, or the user asks to file or draft a bug report.
---

# Writing bug reports

Input: one or more failing tests (from `test-results/results.json`, an error message, or a `test.fixme` with a `// POTENTIAL BUG:` note). Work through each test separately.

## Steps

1. **Read the evidence.** The test code, its error or POTENTIAL BUG note, and `error-context.md` if present. If it failed in CI, use only tests that failed every retry; a test that passed on retry is flaky — report it in your summary, never as a bug.
2. **Classify.**
   - Product bug: the app does not match the test's expected result.
   - Automation issue: broken locator, bad test data, timeout from environment/network. Label `automation-issue`, no severity.
3. **Check for duplicates** (see "Duplicate check" below). A match means comment, not create.
4. **Write the issue** with [bug-template.md](bug-template.md). Steps to reproduce come from the test's actions, in user words (click, enter), never invented. Severity from [severity-rules.md](severity-rules.md). See [example.md](example.md) for the expected quality.
5. **Validate before filing** — every box must be true:
   - [ ] Title under 80 characters, says what is broken in user terms
   - [ ] Every step and value appears in the test or its evidence
   - [ ] Expected comes from the test assertion or requirement; actual from the error/note
   - [ ] Severity follows the rules, with a one-line reason
   - [ ] Related test case ID and test file path are included
6. **File it.** `gh issue create --title "…" --body-file <file> --label ai-triaged --label bug` (or `automation-issue`). If `gh` is not available, print the title and body for a human to paste and say so.

## Duplicate check

Exact-title search misses duplicates, so search by meaning:

1. Pick 2–3 keywords: the feature + the symptom (e.g. `cart badge remove`, `checkout last name`).
2. Run at least two searches with different keywords:
   `gh issue list --state all --search "<keywords> in:title,body" --limit 20`
3. Compare by **behaviour** (same screen, same action, same wrong result), not by wording.
4. Decide:
   - Open match → `gh issue comment <n> --body "Seen again in <run link or test>: <one line>"`. Do not create.
   - Closed as duplicate → comment on the original it points to, if open.
   - Closed as fixed → create a new issue titled `[Regression] …` and link the old one: the bug came back.
   - No match → create.

## Rules

- One issue per distinct bug. Two tests failing for the same reason = one issue that lists both.
- Never close, edit or relabel existing issues. Never change test code to make it pass.
- End with a summary table: test · decision (created #n / commented on #n / flaky / automation issue) · severity.
