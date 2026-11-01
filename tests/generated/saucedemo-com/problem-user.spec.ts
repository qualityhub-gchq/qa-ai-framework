import { test, expect, type Page } from '@playwright/test';

test.use({ baseURL: 'https://www.saucedemo.com' });

// Public demo credentials shown on the login page.
const PROBLEM_USER = 'problem_user';
const DEMO_PASSWORD = 'secret_sauce';

async function loginAsProblemUser(page: Page) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(PROBLEM_USER);
  await page.getByPlaceholder('Password').fill(DEMO_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('Swag Labs - problem_user', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsProblemUser(page);
  });

  test(
    'TC-SAUCEDEMO-010 problem_user can log in and sees the Products page',
    { tag: '@generated' },
    async ({ page }) => {
      await expect(page.getByTestId('title')).toHaveText('Products');
      await expect(page.getByTestId('inventory-item')).toHaveCount(6);
    },
  );

  // POTENTIAL BUG: all 6 products show the same image (1 distinct src instead of 6)
  test.fixme(
    'TC-SAUCEDEMO-011 each product shows its own distinct image',
    { tag: '@generated' },
    async ({ page }) => {
      const sources = await page
        .getByTestId('inventory-item')
        .getByRole('img')
        .evaluateAll((imgs) => imgs.map((img) => img.getAttribute('src')));
      expect(sources).toHaveLength(6);
      expect(new Set(sources).size).toBe(6);
    },
  );

  // POTENTIAL BUG: sorting by Name (Z to A) leaves the list in A-Z order
  test.fixme(
    'TC-SAUCEDEMO-012 sorting by Name (Z to A) reorders products',
    { tag: '@generated' },
    async ({ page }) => {
      await page.getByTestId('product-sort-container').selectOption('za');

      await expect(page.getByTestId('inventory-item-name')).toHaveText([
        'Test.allTheThings() T-Shirt (Red)',
        'Sauce Labs Onesie',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Bike Light',
        'Sauce Labs Backpack',
      ]);
    },
  );

  // POTENTIAL BUG: sorting by Price (low to high) gives an unsorted list (29.99, 9.99, 15.99, 49.99, 7.99, 15.99)
  test.fixme(
    'TC-SAUCEDEMO-013 sorting by Price (low to high) reorders products',
    { tag: '@generated' },
    async ({ page }) => {
      await page.getByTestId('product-sort-container').selectOption('lohi');

      const prices = (await page.getByTestId('inventory-item-price').allTextContents()).map((p) =>
        Number(p.replace('$', '')),
      );
      expect(prices).toEqual([...prices].sort((a, b) => a - b));
    },
  );

  test(
    'TC-SAUCEDEMO-014 adding a product updates the cart badge',
    { tag: '@generated' },
    async ({ page }) => {
      await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

      await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
      await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
    },
  );

  test(
    'TC-SAUCEDEMO-015 adding any product updates the cart badge (Bike Light, Onesie)',
    { tag: '@generated' },
    async ({ page }) => {
      await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
      await page.getByTestId('add-to-cart-sauce-labs-onesie').click();

      await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');
    },
  );

  // POTENTIAL BUG: after clicking Remove on the Backpack the cart badge is still shown
  test.fixme(
    'TC-SAUCEDEMO-016 Remove button removes the product from the cart',
    { tag: '@generated' },
    async ({ page }) => {
      await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
      await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

      await page.getByTestId('remove-sauce-labs-backpack').click();

      await expect(page.getByTestId('shopping-cart-badge')).toBeHidden();
      await expect(page.getByTestId('add-to-cart-sauce-labs-backpack')).toBeVisible();
    },
  );

  // POTENTIAL BUG: typing the last name overwrites the First Name field; Last Name stays empty and the page shows "Last Name is required"
  test.fixme(
    'TC-SAUCEDEMO-017 checkout accepts name and postal code and reaches the overview',
    { tag: '@generated' },
    async ({ page }) => {
      await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
      await page.getByTestId('shopping-cart-link').click();
      await page.getByRole('button', { name: 'Checkout' }).click();

      await page.getByPlaceholder('First Name').fill('Test');
      await page.getByPlaceholder('Last Name').fill('User');
      await page.getByPlaceholder('Zip/Postal Code').fill('12345');
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page).toHaveURL(/checkout-step-two\.html/);
      await expect(page.getByTestId('title')).toHaveText('Checkout: Overview');
    },
  );
});
