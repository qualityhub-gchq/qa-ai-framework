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

  test(
    'TC-CART-002 removing a product decrements the badge and removes it from the cart',
    { tag: '@regression' },
    async ({ loggedInInventory, cartPage, page }) => {
      await loggedInInventory.addToCart('Sauce Labs Backpack');
      await loggedInInventory.addToCart('Sauce Labs Bike Light');

      await loggedInInventory.removeFromCart('Sauce Labs Bike Light');

      await expect(loggedInInventory.cartBadge).toHaveText('1');

      await loggedInInventory.openCart();

      await expect(page).toHaveURL(/cart\.html/);
      await expect(cartPage.itemNames).toHaveText(['Sauce Labs Backpack']);
    },
  );

  test(
    'TC-CART-003 adding multiple products updates the cart badge',
    { tag: '@regression' },
    async ({ loggedInInventory }) => {
      await loggedInInventory.addToCart('Sauce Labs Backpack');
      await loggedInInventory.addToCart('Sauce Labs Bike Light');

      await expect(loggedInInventory.cartBadge).toHaveText('2');
    },
  );
});
