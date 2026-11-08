# Evaluations for promoting-tests

Run each case on a throwaway branch in a **fresh** Claude Code session, check the result, then discard it (`git restore . && git clean -fd`) unless you want to keep the change. The Skill passes when every case meets its criteria.

| #   | Prompt                              | Pass criteria                                                                                                                                                                |
| --- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `/promoting-tests TC-SAUCEDEMO-001` | **Not promoted**: identified as a duplicate of TC-LOGIN-001; no test file changes                                                                                            |
| 2   | `/promoting-tests TC-SAUCEDEMO-006` | **Not promoted**: identified as a duplicate of TC-CART-001, which already checks the badge and the Remove button; no test file changes                                       |
| 3   | `/promoting-tests TC-SAUCEDEMO-002` | Promoted as **TC-LOGIN-006** (valid user + wrong password is a different equivalence class from TC-LOGIN-003's unknown user); uses `loginPage` fixture; tagged `@regression` |
| 4   | Any case above                      | Lint, typecheck and `npm test` all run and pass; report table present; generated spec and plan updated                                                                       |

Record results here when you run them:

| Date       | Skill version (commit) | 1    | 2    | 3    | 4    | Notes                                                                                                                                                                                                                                      |
| ---------- | ---------------------- | ---- | ---- | ---- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-11-08 | 7484c8f                | Pass | Pass | Pass | Pass | Run in fresh sub-agents on throwaway worktrees. Case 4 (from the TC-SAUCEDEMO-002 run): lint and typecheck clean, `npm test` 16 passed, 0 failed. No `.env` was present in the worktrees (a hook blocks copying it) and nothing needed it. |
