import { test, expect, type Page } from '@playwright/test';

test.use({ baseURL: 'https://www.saucedemo.com' });

// Public demo credentials, shown on the login page itself.
const DEMO_USER = 'standard_user';
const DEMO_PASSWORD = 'secret_sauce';

async function loginAsStandardUser(page: Page) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(DEMO_USER);
  await page.getByPlaceholder('Password').fill(DEMO_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('Footer social links', () => {
  test(
    'TC-SAUCEDEMO-018 standard user lands on Products page',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);
      await expect(page.getByTestId('title'), 'Products page title').toHaveText('Products');
    },
  );

  test(
    'TC-SAUCEDEMO-019 footer Facebook link points to the Sauce Labs page',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);
      const facebook = page.getByRole('link', { name: 'Facebook' });
      await expect(facebook, 'Facebook footer link').toBeVisible();
      await expect(facebook, 'Facebook link href').toHaveAttribute(
        'href',
        'https://www.facebook.com/saucelabs',
      );
    },
  );

  test(
    'TC-SAUCEDEMO-020 footer Facebook link opens in a new tab',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);
      await expect(
        page.getByRole('link', { name: 'Facebook' }),
        'Facebook link target',
      ).toHaveAttribute('target', '_blank');
    },
  );

  test(
    'TC-SAUCEDEMO-021 all footer social links open in a new tab',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);
      const links = page.getByRole('contentinfo').getByRole('link');
      await expect(links, 'footer social links').toHaveCount(3);
      // One retrying assertion instead of a non-retrying links.all() loop.
      await expect(
        links.and(page.locator('[target="_blank"]')),
        'every footer link should have target="_blank"',
      ).toHaveCount(3);
    },
  );
});
