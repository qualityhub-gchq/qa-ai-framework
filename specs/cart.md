# Cart — Test Plan

**Application:** Sauce Demo · **Feature:** Shopping cart

### TC-CART-001 Adding a product updates the cart badge

- **Priority:** High
- **Type:** Functional
- **Preconditions:** Logged in as `standard_user`, cart empty
- **Steps:** 1. On "Products", click **Add to cart** for "Sauce Labs Backpack"
- **Expected result:** Cart badge shows `1`; button changes to **Remove**
- **Automated:** Yes (`tests/ui/cart.spec.ts`) — @smoke (badge only; button state is a TODO)

### TC-CART-002 Removing a product decrements the badge and removes it from the cart

- **Priority:** Medium
- **Type:** Functional
- **Preconditions:** Logged in as `standard_user`, cart empty
- **Steps:**
  1. Add "Sauce Labs Backpack" and "Sauce Labs Bike Light"
  2. Click **Remove** for "Sauce Labs Bike Light"
  3. Open the cart
- **Expected result:** Cart badge shows `1`; the cart lists only "Sauce Labs Backpack"
- **Automated:** Yes (`tests/ui/cart.spec.ts`)

### TC-CART-003 Adding multiple products updates the cart badge

- **Priority:** High
- **Type:** Functional
- **Preconditions:** Logged in as `standard_user`, cart empty
- **Steps:** 1. Add "Sauce Labs Backpack" 2. Add "Sauce Labs Bike Light"
- **Expected result:** Cart badge shows `2`
- **Automated:** Yes (`tests/ui/cart.spec.ts`)
