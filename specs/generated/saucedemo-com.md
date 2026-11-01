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
- **Automated:** Yes (`tests/generated/saucedemo-com/saucedemo.spec.ts`)

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
