# Bug template

Use this exact structure. It matches `.github/ISSUE_TEMPLATE/bug_report.md`.

**Title:** `[<context>] <what is broken, in user terms>`

- `<context>` = the user role when the bug is specific to one (`problem_user`), otherwise the feature (`Checkout`, `Cart`, `Login`, `API`).
- Prefix `[Regression]` only when a previously fixed bug came back.

**Body:**

```markdown
## Summary

<One or two sentences: what is broken and the impact on the user.>

## Environment

- App URL: <base URL>
- User: <test user, if any>
- Browser / project: <Playwright project, e.g. ui (Chromium)>
- Build / commit: <commit SHA or "local">

## Steps to reproduce

1. <user action>
2. <user action>

## Expected result

<From the assertion or requirement.>

## Actual result

<From the error message or POTENTIAL BUG note. Include the key value seen.>

## Evidence

- Test: `<file path>` — <test case ID> (<failed in CI 3/3 attempts | marked test.fixme>)
- Run / report: <link, if from CI>

## Severity

<Critical | High | Medium | Low> — <one-line reason using severity-rules.md>

## Related test case

<TC-ID>
```
