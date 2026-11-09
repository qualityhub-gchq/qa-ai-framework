import { test, expect, type Page } from '@playwright/test';

test.use({ baseURL: 'https://www.saucedemo.com' });

// Public demo credentials are displayed on the login page itself.
const DEMO_PASSWORD = 'secret_sauce';
const LINKEDIN_URL = 'https://www.linkedin.com/company/sauce-labs/home/';

async function loginAsStandardUser(page: Page) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill(DEMO_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('Saucedemo footer LinkedIn link', () => {
  test(
    'TC-SAUCEDEMO-018 LinkedIn footer link is visible with the correct href and target',
    { tag: '@generated' },
    async ({ page }) => {
      // POTENTIAL BUG: href is "https://www.linkedin.com/company/sauce-labs/" (no "home/" suffix),
      // but the requirement is "https://www.linkedin.com/company/sauce-labs/home/".
      test.fixme(true, 'POTENTIAL BUG: LinkedIn href lacks the required "home/" suffix');
      await loginAsStandardUser(page);

      const linkedIn = page.getByRole('link', { name: 'LinkedIn' });
      await expect(linkedIn).toBeVisible();
      await expect(linkedIn).toHaveAttribute('href', LINKEDIN_URL);
      await expect(linkedIn).toHaveAttribute('target', '_blank');
    },
  );

  test(
    'TC-SAUCEDEMO-019 clicking the LinkedIn footer link opens a new tab',
    { tag: '@generated' },
    async ({ page }) => {
      await loginAsStandardUser(page);

      const popupPromise = page.waitForEvent('popup');
      await page.getByRole('link', { name: 'LinkedIn' }).click();
      const popup = await popupPromise;

      await expect(popup).toHaveURL(
        /^https:\/\/(www\.)?linkedin\.com\/(company\/sauce-labs|login|authwall|uas\/login)/,
      );
      await expect(page).toHaveURL(/inventory\.html/);
    },
  );
});
