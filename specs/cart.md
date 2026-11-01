# Cart — Test Plan

**Application:** Sauce Demo · **Feature:** Shopping cart

### TC-CART-001 Adding a product updates the cart badge

- **Priority:** High
- **Type:** Functional
- **Preconditions:** Logged in as `standard_user`, cart empty
- **Steps:** 1. On "Products", click **Add to cart** for "Sauce Labs Backpack"
- **Expected result:** Cart badge shows `1`; button changes to **Remove**
- **Automated:** Yes (`tests/ui/cart.spec.ts`) — @smoke (badge only; button state is a TODO)

### TC-CART-002 Removing a product clears the badge

- **Priority:** Medium
- **Automated:** No — to be generated in Phase 3
