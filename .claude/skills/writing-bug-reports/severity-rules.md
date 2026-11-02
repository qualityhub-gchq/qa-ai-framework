# Severity rules

Pick the first level that matches. Severity = impact on the user, not how hard the fix is.

| Severity | Use when                                                                                            | Example from this project                                        |
| -------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Critical | A core flow (login, checkout, payment) is blocked with no workaround, or data loss / security issue | Checkout cannot continue because Last Name overwrites First Name |
| High     | A core feature gives wrong results or wrong data, and the workaround is hard or unclear             | Cart badge still shows an item after Remove                      |
| Medium   | A feature is wrong but a reasonable workaround exists, or the UI misleads without blocking          | Sorting does not work; all products show the same image          |
| Low      | Cosmetic only: text, alignment, styling, with no effect on what the user can do                     | A typo in a button label                                         |

Notes:

- When unsure between two levels, pick the higher one and say why in the reason line; a human confirms (`ai-triaged`).
- Automation issues get no severity; use the `automation-issue` label instead.
