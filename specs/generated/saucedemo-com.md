# Test plan: saucedemo.com

- **Target URL:** https://www.saucedemo.com/
- **Date:** 2026-11-09
- **Source of expected results:** Requirements provided by human (footer Facebook link); other cases: observed behaviour — needs human review

## Requirement

> Log in as standard_user. On /inventory.html the footer Facebook link must point to `https://www.facebook.com/saucedemo` and open in a new tab (`target="_blank"`). Assert href/target only; do not navigate to facebook.com.

### TC-SAUCEDEMO-001 Standard user can log in

- **Priority:** High
- **Type:** Functional
- **Preconditions:** Logged out
- **Steps:** 1. Open `/`. 2. Enter public demo credentials. 3. Click Login.
- **Expected result:** `/inventory.html` shows "Products" and 6 products.
- **Automated:** Yes

### TC-SAUCEDEMO-002 Wrong password is rejected

- **Priority:** High
- **Type:** Negative
- **Steps:** Login with `standard_user` and a wrong password.
- **Expected result:** Error "do not match any user"; stays on login page.
- **Automated:** Yes

### TC-SAUCEDEMO-003 Empty username

- **Priority:** Medium
- **Type:** Validation
- **Steps:** Submit with only the password filled.
- **Expected result:** "Username is required".
- **Automated:** Yes

### TC-SAUCEDEMO-004 Facebook link href

- **Priority:** High
- **Type:** Functional
- **Preconditions:** Logged in as standard_user, on `/inventory.html`
- **Steps:** Inspect the footer Facebook link href.
- **Expected result (requirement):** `https://www.facebook.com/saucedemo`
- **Observed:** `https://www.facebook.com/saucelabs` — **POTENTIAL BUG**
- **Traceability:** Requirement, footer Facebook link.
- **Automated:** Yes (`test.fixme`, POTENTIAL BUG)

### TC-SAUCEDEMO-005 Facebook link opens in a new tab

- **Priority:** High
- **Type:** Functional
- **Steps:** Inspect `target` of the footer Facebook link.
- **Expected result (requirement):** `_blank`. Observed: `_blank` (rel `noreferrer`).
- **Automated:** Yes

### TC-SAUCEDEMO-006 X and LinkedIn footer links

- **Priority:** Low
- **Type:** Functional
- **Expected result:** X → `https://x.com/saucelabs`, LinkedIn → `linkedin.com/company/sauce-labs/`, both `_blank`.
- **Automated:** Yes

### TC-SAUCEDEMO-007 Add product to cart

- **Priority:** High
- **Type:** Functional
- **Steps:** Click the first "Add to cart".
- **Expected result:** Cart badge shows 1; button becomes "Remove".
- **Automated:** Yes

### TC-SAUCEDEMO-008 Sort by price low to high

- **Priority:** Medium
- **Type:** Functional
- **Steps:** Choose "Price (low to high)".
- **Expected result:** First price $7.99, last $49.99.
- **Automated:** Yes

## Findings

- **POTENTIAL BUG:** TC-SAUCEDEMO-004 — Facebook footer link goes to `facebook.com/saucelabs`, requirement says `facebook.com/saucedemo`.
