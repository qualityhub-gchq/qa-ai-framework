# Example: before → after

A real promotion from this repo (PR #3): TC-SAUCEDEMO-008 became TC-CART-002.

## Before — `tests/generated/saucedemo-com/saucedemo.spec.ts`

```ts
test(
  'TC-SAUCEDEMO-008 removing a product decrements the cart count and cart lists the item',
  { tag: '@generated' },
  async ({ page }) => {
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
    await page.getByTestId('remove-sauce-labs-bike-light').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    await page.getByTestId('shopping-cart-link').click();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeHidden();
  },
);
```

## After — `tests/ui/cart.spec.ts`

```ts
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
```

What changed and why:

- Login comes from the `loggedInInventory` fixture, not a local helper with a hard-coded password.
- Actions use readable Page Object methods by product name (`addToCart`, `removeFromCart`, `openCart`).
- A new `CartPage` holds the cart screen's locator, because each screen gets its own class.
- The cart check became **stricter**: the item list must be exactly `['Sauce Labs Backpack']`.
