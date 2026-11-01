import { test, expect } from '../../fixtures/test-fixtures';

/** Test cases: specs/cart.md */
test.describe('Cart', () => {
  test(
    'TC-CART-001 adding a product updates the cart badge',
    { tag: ['@smoke', '@regression'] },
    async ({ loggedInInventory }) => {
      await expect(loggedInInventory.items.first()).toBeVisible();

      await loggedInInventory.addToCart('Sauce Labs Backpack');

      await expect(loggedInInventory.cartBadge).toHaveText('1');
    },
  );
});
