import { test, expect, type Page } from '@playwright/test';

test.use({ baseURL: 'https://www.saucedemo.com' });

// Public demo credentials are displayed on the login page itself.
const DEMO_PASSWORD = 'secret_sauce';

async function login(page: Page, username: string, password: string) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

test.describe('Saucedemo login', () => {
  test(
    'TC-SAUCEDEMO-001 standard user logs in with valid credentials',
    { tag: '@generated' },
    async ({ page }) => {
      await login(page, 'standard_user', DEMO_PASSWORD);

      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.getByText('Products')).toBeVisible();
    },
  );

  test(
    'TC-SAUCEDEMO-002 wrong password shows an error',
    { tag: '@generated' },
    async ({ page }) => {
      await login(page, 'standard_user', 'wrong_password');

      await expect(page.getByTestId('error')).toContainText('do not match');
      await expect(page).not.toHaveURL(/inventory\.html/);
    },
  );

  test(
    'TC-SAUCEDEMO-003 empty username shows a required-field error',
    { tag: '@generated' },
    async ({ page }) => {
      await login(page, '', DEMO_PASSWORD);

      await expect(page.getByTestId('error')).toContainText('Username is required');
    },
  );

  test(
    'TC-SAUCEDEMO-005 locked-out user cannot log in',
    { tag: '@generated' },
    async ({ page }) => {
      await login(page, 'locked_out_user', DEMO_PASSWORD);

      await expect(page.getByTestId('error')).toContainText('locked out');
      await expect(page).not.toHaveURL(/inventory\.html/);
    },
  );
});

test.describe('Saucedemo cart', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user', DEMO_PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test(
    'TC-SAUCEDEMO-006 adding a product shows 1 in the cart badge',
    { tag: '@generated' },
    async ({ page }) => {
      await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

      await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
      await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
    },
  );
});
