# Test Plan: Swag Labs (saucedemo.com)

- **Target URL:** https://www.saucedemo.com/
- **Date:** 2026-11-01
- **Source of expected results:** Requirements provided by human — "Users can log in with valid credentials, see an error with invalid ones, add products to the cart and see the cart count update."

Demo credentials (shown publicly on the login page): `standard_user`, `locked_out_user`, password `secret_sauce`.

### TC-SAUCEDEMO-001 Login with valid credentials

- **Priority:** High
- **Type:** Functional
- **Preconditions:** On the login page
- **Test data:** `standard_user` / `secret_sauce`
- **Steps:**
  1. Enter username and password.
  2. Click Login.
- **Expected result:** User lands on the inventory page showing "Products".
- **Traceability:** Requirement: valid login.
- **Automated:** Yes (`tests/generated/saucedemo-com/saucedemo.spec.ts`)

### TC-SAUCEDEMO-002 Wrong password shows an error

- **Priority:** High
- **Type:** Negative
- **Preconditions:** On the login page
- **Test data:** `standard_user` / `wrong_password`
- **Steps:**
  1. Enter credentials.
  2. Click Login.
- **Expected result:** Error "Username and password do not match any user in this service"; user stays on login page.
- **Traceability:** Requirement: error on invalid credentials.
- **Automated:** Yes — promoted to TC-LOGIN-006 (`tests/ui/login.spec.ts`)

### TC-SAUCEDEMO-003 Empty username

- **Priority:** Medium
- **Type:** Validation
- **Preconditions:** On the login page
- **Test data:** empty username, `secret_sauce`
- **Steps:**
  1. Leave username empty, enter password.
  2. Click Login.
- **Expected result:** Error "Username is required".
- **Traceability:** Requirement: error on invalid input.
- **Automated:** Yes (`tests/generated/saucedemo-com/saucedemo.spec.ts`)

### TC-SAUCEDEMO-004 Empty password

- **Priority:** Medium
- **Type:** Validation
- **Preconditions:** On the login page
- **Test data:** `standard_user`, empty password
- **Steps:**
  1. Enter username only.
  2. Click Login.
- **Expected result:** Error "Password is required".
- **Traceability:** Requirement: error on invalid input.
- **Automated:** Yes — promoted to TC-LOGIN-005 (`tests/ui/login.spec.ts`)

### TC-SAUCEDEMO-005 Locked-out user cannot log in

- **Priority:** Medium
- **Type:** Negative
- **Preconditions:** On the login page
- **Test data:** `locked_out_user` / `secret_sauce`
- **Steps:**
  1. Enter credentials.
  2. Click Login.
- **Expected result:** Error stating the user has been locked out; no access to inventory.
- **Traceability:** Requirement: error for non-permitted login.
- **Automated:** Yes (`tests/generated/saucedemo-com/saucedemo.spec.ts`)

### TC-SAUCEDEMO-006 Add one product updates cart badge

- **Priority:** High
- **Type:** Functional
- **Preconditions:** Logged in as `standard_user`
- **Steps:**
  1. Click "Add to cart" on Sauce Labs Backpack.
- **Expected result:** Cart badge shows 1; the button changes to "Remove".
- **Traceability:** Requirement: add to cart, count updates.
- **Automated:** Yes (`tests/generated/saucedemo-com/saucedemo.spec.ts`)

### TC-SAUCEDEMO-007 Add multiple products updates cart badge

- **Priority:** High
- **Type:** Functional
- **Preconditions:** Logged in as `standard_user`
- **Steps:**
  1. Add Sauce Labs Backpack.
  2. Add Sauce Labs Bike Light.
- **Expected result:** Cart badge shows 2.
- **Traceability:** Requirement: cart count updates.
- **Automated:** Yes — promoted to TC-CART-003 (`tests/ui/cart.spec.ts`)

### TC-SAUCEDEMO-008 Remove product decrements count; cart lists remaining item

- **Priority:** Medium
- **Type:** Functional
- **Preconditions:** Logged in as `standard_user`
- **Steps:**
  1. Add Backpack and Bike Light.
  2. Remove Bike Light.
  3. Open the cart.
- **Expected result:** Badge shows 1; cart page lists only the Backpack.
- **Traceability:** Requirement: cart count updates.
- **Automated:** Yes — promoted to TC-CART-002 (`tests/ui/cart.spec.ts`)

### TC-SAUCEDEMO-009 Direct access to inventory without login

- **Priority:** Medium
- **Type:** Negative
- **Preconditions:** Not logged in
- **Steps:**
  1. Navigate to `/inventory.html`.
- **Expected result:** Redirected to login with an access error.
- **Automated:** No (outside the requirements; lower priority)

## Result of the automated run

8 passed, 0 `fixme`, no potential bugs found.

---

## Run 2 — problem_user flows

- **Date:** 2026-11-01
- **Source of expected results:** Requirements provided by human — log in as `problem_user`; each product shows its own correct image; sorting by "Name (Z to A)" and "Price (low to high)" reorders products; adding any product updates the badge and "Remove" removes it; checkout accepts first name, last name and postal code and reaches the overview page.

All cases: **Preconditions:** logged in as `problem_user` / `secret_sauce` (public demo credentials). **Automated:** Yes (`tests/generated/saucedemo-com/problem-user.spec.ts`).

### TC-SAUCEDEMO-010 problem_user can log in

- **Priority:** High · **Type:** Functional
- **Steps:** Log in as `problem_user`.
- **Expected result:** Products page with 6 products.
- **Result:** Pass.

### TC-SAUCEDEMO-011 Each product shows its own image

- **Priority:** High · **Type:** Functional
- **Steps:** Read the image `src` of all products.
- **Expected result:** 6 distinct images.
- **Traceability:** Requirement: each product shows its own correct image.
- **Result:** `fixme` — **POTENTIAL BUG:** all products show the same image.

### TC-SAUCEDEMO-012 Sort by Name (Z to A)

- **Priority:** High · **Type:** Functional
- **Steps:** Select "Name (Z to A)".
- **Expected result:** Products ordered Z to A.
- **Traceability:** Requirement: sorting reorders products.
- **Result:** `fixme` — **POTENTIAL BUG:** list stays in A–Z order.

### TC-SAUCEDEMO-013 Sort by Price (low to high)

- **Priority:** High · **Type:** Functional
- **Steps:** Select "Price (low to high)".
- **Expected result:** Prices ascending.
- **Traceability:** Requirement: sorting reorders products.
- **Result:** `fixme` — **POTENTIAL BUG:** order is 29.99, 9.99, 15.99, 49.99, 7.99, 15.99.

### TC-SAUCEDEMO-014 Add a product updates the badge

- **Priority:** High · **Type:** Functional
- **Steps:** Add Sauce Labs Backpack.
- **Expected result:** Badge shows 1; button becomes "Remove".
- **Result:** Pass.

### TC-SAUCEDEMO-015 Add other products updates the badge

- **Priority:** Medium · **Type:** Functional
- **Steps:** Add Bike Light and Onesie.
- **Expected result:** Badge shows 2.
- **Traceability:** Requirement: adding any product updates the badge.
- **Result:** Pass.

### TC-SAUCEDEMO-016 Remove button removes the product

- **Priority:** High · **Type:** Functional
- **Steps:** Add Backpack, click "Remove".
- **Expected result:** Badge disappears; button returns to "Add to cart".
- **Result:** `fixme` — **POTENTIAL BUG:** badge remains after Remove.

### TC-SAUCEDEMO-017 Checkout reaches the overview

- **Priority:** High · **Type:** Functional
- **Steps:** Add Backpack, open cart, Checkout, enter First Name `Test`, Last Name `User`, Postal Code `12345`, Continue.
- **Expected result:** Checkout: Overview page.
- **Traceability:** Requirement: checkout accepts first name, last name, postal code.
- **Result:** `fixme` — **POTENTIAL BUG:** typing the last name overwrites the First Name field; error "Last Name is required".

**Result of run 2:** 8 tests written, 3 passed, 5 `fixme` (potential bugs). Not explored: Remove buttons of other products, cart contents for other items.

---

## Run 3 — footer social links

- **Date:** 2026-11-09
- **Source of expected results:** Requirements provided by human — log in as `standard_user`; on `/inventory.html` the footer Facebook link must point to `https://www.facebook.com/saucelabs` (corrected: the first requirement wrongly said `/saucedemo`) and have `target="_blank"`. Assert href/target only; never navigate to facebook.com.

All cases: **Preconditions:** logged in as `standard_user` / `secret_sauce` (public demo credentials) unless stated. **Automated:** Yes (`tests/generated/saucedemo-com/footer-links.spec.ts`) unless stated.

### TC-SAUCEDEMO-018 Standard user lands on Products page

- **Priority:** High · **Type:** Functional
- **Steps:** Open `/`, log in.
- **Expected result:** URL is `/inventory.html`, "Products" visible.
- **Result:** Pass.

### TC-SAUCEDEMO-019 Facebook link href

- **Priority:** High · **Type:** Functional
- **Steps:** Read the href of the footer Facebook link.
- **Expected result:** `https://www.facebook.com/saucelabs`.
- **Traceability:** Requirement: Facebook link points to the Sauce Labs page (corrected from `/saucedemo`).
- **Result:** Pass.

### TC-SAUCEDEMO-020 Facebook link opens in a new tab

- **Priority:** High · **Type:** Functional
- **Steps:** Read `target` of the footer Facebook link.
- **Expected result:** `target="_blank"`.
- **Traceability:** Requirement: opens in a new tab.
- **Result:** Pass.

### TC-SAUCEDEMO-021 All footer social links open in a new tab

- **Priority:** Medium · **Type:** Functional
- **Steps:** Check `target` of all 3 footer links.
- **Expected result:** each is `_blank` (observed behaviour, needs human review).
- **Result:** Pass.

### TC-SAUCEDEMO-022 Invalid password is rejected

- **Priority:** Medium · **Type:** Negative
- **Preconditions:** Logged out
- **Steps:** Log in as `standard_user` with a wrong password.
- **Expected result:** "do not match" error; stays on login page.
- **Automated:** No (out of scope for footer links; covered by TC-LOGIN-006)

### TC-SAUCEDEMO-023 Empty username validation

- **Priority:** Medium · **Type:** Validation
- **Expected result:** "Username is required".
- **Automated:** No (covered by TC-SAUCEDEMO-003 / TC-LOGIN-004)

**Result of run 3:** 4 tests written, all passed.
