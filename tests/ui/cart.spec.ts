import { test, expect } from '../../fixtures/test-fixtures';
import { PRODUCTS } from '../../test-data/products';

/** Test cases: specs/cart.md */
test.describe('Cart', () => {
  test(
    'TC-CART-001 adding a product updates the cart badge',
    { tag: ['@smoke', '@regression'] },
    async ({ loggedInInventory }) => {
      await expect(loggedInInventory.cartBadge).toBeHidden();

      await loggedInInventory.addToCart(PRODUCTS.backpack);

      await expect(loggedInInventory.cartBadge).toHaveText('1');
      await expect(loggedInInventory.removeButton(PRODUCTS.backpack)).toBeVisible();
    },
  );

  test(
    'TC-CART-002 removing a product decrements the badge and removes it from the cart',
    { tag: '@regression' },
    async ({ loggedInInventory, cartPage, page }) => {
      await loggedInInventory.addToCart(PRODUCTS.backpack);
      await loggedInInventory.addToCart(PRODUCTS.bikeLight);

      await loggedInInventory.removeFromCart(PRODUCTS.bikeLight);

      await expect(loggedInInventory.cartBadge).toHaveText('1');

      await loggedInInventory.openCart();

      await expect(page).toHaveURL(/cart\.html/);
      await expect(cartPage.itemNames).toHaveText([PRODUCTS.backpack]);
    },
  );

  test(
    'TC-CART-003 adding multiple products updates the cart badge',
    { tag: '@regression' },
    async ({ loggedInInventory }) => {
      await loggedInInventory.addToCart(PRODUCTS.backpack);
      await loggedInInventory.addToCart(PRODUCTS.bikeLight);

      await expect(loggedInInventory.cartBadge).toHaveText('2');
    },
  );
});
