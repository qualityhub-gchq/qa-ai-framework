# Test Plans (Specs)

This folder holds the **manual test cases** that drive the automation.

**Workflow**

1. The `playwright-test-planner` AI agent explores the app and drafts a plan here.
2. **A human QA reviews it**: adds IDs, priority, preconditions, removes duplicates, adds missing negative/edge cases.
3. The `playwright-test-generator` agent turns the approved plan into tests in `tests/`.
4. Every automated test name starts with its test case ID (e.g. `TC-LOGIN-001`) for **traceability**.

**Test case template**

```markdown
### TC-<AREA>-<NNN> <Title>

- **Priority:** High | Medium | Low
- **Type:** Functional | Negative | Boundary | API
- **Preconditions:** ...
- **Test data:** ...
- **Steps:**
  1. ...
- **Expected result:** ...
- **Automated:** Yes (`tests/...spec.ts`) | No (reason)
```
