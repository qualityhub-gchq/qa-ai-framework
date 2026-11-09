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
      await expect(page.getByText('Products', { exact: true })).toBeVisible();
    },
  );

  test(
    'TC-SAUCEDEMO-019 footer Facebook link points to the SauceDemo page',
    { tag: '@generated' },
    async ({ page }) => {
      // POTENTIAL BUG: footer Facebook href is https://www.facebook.com/saucelabs, but the requirement says https://www.facebook.com/saucedemo.
      test.fixme(
        true,
        'POTENTIAL BUG: Facebook href is /saucelabs, requirement expects /saucedemo',
      );
      await loginAsStandardUser(page);
      const facebook = page.getByRole('link', { name: 'Facebook' });
      await expect(facebook).toBeVisible();
      await expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/saucedemo');
    },
  );

  test(
    'TC-SAUCEDEMO-020 footer Facebook link opens in a new tab',
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
    'TC-SAUCEDEMO-021 all footer social links open in a new tab',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);
      const links = page.getByRole('contentinfo').getByRole('link');
      await expect(links).toHaveCount(3);
      for (const link of await links.all()) {
        await expect(link).toHaveAttribute('target', '_blank');
      }
    },
  );

  test(
    'TC-SAUCEDEMO-022 invalid login is rejected and shows an error',
    { tag: '@generated' },
    async ({ page }) => {
      await page.goto('/');
      await page.getByPlaceholder('Username').fill(DEMO_USER);
      await page.getByPlaceholder('Password').fill('not-the-password');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByText('do not match')).toBeVisible();
      await expect(page).not.toHaveURL(/inventory\.html/);
    },
  );
});
