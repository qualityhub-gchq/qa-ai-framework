# Login — Test Plan

**Application:** Sauce Demo (https://www.saucedemo.com)
**Feature:** User authentication
**Techniques used:** equivalence partitioning (valid / locked / invalid users), negative testing, required-field validation.

### TC-LOGIN-001 Standard user can log in

- **Priority:** High
- **Type:** Functional
- **Preconditions:** User is on the login page
- **Test data:** `standard_user` / valid password
- **Steps:**
  1. Enter username and password
  2. Click **Login**
- **Expected result:** User lands on `/inventory.html` and the page title is "Products"
- **Automated:** Yes (`tests/ui/login.spec.ts`) — @smoke

### TC-LOGIN-002 Locked-out user sees an error

- **Priority:** High
- **Type:** Negative
- **Test data:** `locked_out_user` / valid password
- **Steps:** 1. Enter credentials 2. Click **Login**
- **Expected result:** Error message mentions the user is locked out; user stays on the login page
- **Automated:** Yes (`tests/ui/login.spec.ts`)

### TC-LOGIN-003 Invalid credentials are rejected

- **Priority:** High
- **Type:** Negative
- **Test data:** unknown username / wrong password
- **Expected result:** Error "Username and password do not match any user in this service"
- **Automated:** Yes (`tests/ui/login.spec.ts`)

### TC-LOGIN-004 Empty username shows a required-field error

- **Priority:** Medium
- **Type:** Negative / Validation
- **Test data:** empty username / valid password
- **Expected result:** Error "Username is required"
- **Automated:** Yes (`tests/ui/login.spec.ts`)

### TC-LOGIN-005 Empty password shows a required-field error

- **Priority:** Medium
- **Type:** Negative / Validation
- **Expected result:** Error "Password is required"
- **Automated:** No — candidate for the generator agent (good first exercise)
