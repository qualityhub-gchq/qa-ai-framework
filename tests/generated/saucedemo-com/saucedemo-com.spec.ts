import { test, expect, type Page } from '@playwright/test';

test.use({ baseURL: 'https://www.saucedemo.com' });

// Public demo credentials shown on the login page of the practice site.
const DEMO_USER = 'standard_user';
const DEMO_PASSWORD = 'secret_sauce';

async function loginAsStandardUser(page: Page) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(DEMO_USER);
  await page.getByPlaceholder('Password').fill(DEMO_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('saucedemo.com', () => {
  test(
    'TC-SAUCEDEMO-001 standard user can log in and sees the Products page',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);

      await expect(page.getByText('Products', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);
    },
  );

  test(
    'TC-SAUCEDEMO-002 login with a wrong password shows an error',
    { tag: '@generated' },
    async ({ page }) => {
      await page.goto('/');
      await page.getByPlaceholder('Username').fill(DEMO_USER);
      await page.getByPlaceholder('Password').fill('wrong_password');
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.getByText('do not match any user')).toBeVisible();
      await expect(page).not.toHaveURL(/inventory\.html/);
    },
  );

  test(
    'TC-SAUCEDEMO-003 login with empty username shows a required-field error',
    { tag: '@generated' },
    async ({ page }) => {
      await page.goto('/');
      await page.getByPlaceholder('Password').fill(DEMO_PASSWORD);
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.getByText('Username is required')).toBeVisible();
    },
  );

  test(
    'TC-SAUCEDEMO-004 footer Facebook link points to facebook.com/saucedemo',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);

      const facebook = page.getByRole('link', { name: 'Facebook' });
      await expect(facebook).toBeVisible();
      // POTENTIAL BUG: the app links to https://www.facebook.com/saucelabs, the requirement says /saucedemo.
      test.fixme(
        true,
        'POTENTIAL BUG: Facebook href is /saucelabs, requirement expects /saucedemo',
      );
      await expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/saucedemo');
    },
  );

  test(
    'TC-SAUCEDEMO-005 footer Facebook link opens in a new tab',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);

      await expect(page.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
        'target',
        '_blank',
      );
    },
  );

  test(
    'TC-SAUCEDEMO-006 footer shows X and LinkedIn links that open in a new tab',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);

      const x = page.getByRole('link', { name: 'X', exact: true });
      const linkedin = page.getByRole('link', { name: 'LinkedIn' });
      await expect(x).toHaveAttribute('href', 'https://x.com/saucelabs');
      await expect(x).toHaveAttribute('target', '_blank');
      await expect(linkedin).toHaveAttribute('href', /linkedin\.com\/company\/sauce-labs/);
      await expect(linkedin).toHaveAttribute('target', '_blank');
    },
  );

  test(
    'TC-SAUCEDEMO-007 adding a product updates the cart badge',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);

      await page.getByRole('button', { name: 'Add to cart' }).first().click();

      await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
      await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(1);
    },
  );

  test(
    'TC-SAUCEDEMO-008 sorting by price (low to high) orders products ascending',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);

      await page
        .getByRole('combobox', { name: 'Sort products' })
        .selectOption('Price (low to high)');

      const prices = page.getByTestId('inventory-item-price');
      await expect(prices.first()).toHaveText('$7.99');
      await expect(prices.last()).toHaveText('$49.99');
    },
  );
});
