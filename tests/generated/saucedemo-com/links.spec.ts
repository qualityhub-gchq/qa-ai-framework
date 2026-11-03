import { test, expect, type Page } from '@playwright/test';

test.use({ baseURL: 'https://www.saucedemo.com' });

// Public demo credentials shown on the login page.
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

async function login(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(USERNAME);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

/** Collects same-origin and static-asset responses with an error status (>= 400). */
function trackFailedResponses(page: Page): string[] {
  const failed: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`);
  });
  return failed;
}

test.describe('Broken links check', () => {
  test(
    'TC-SAUCEDEMO-018 login page loads without failed requests or broken images',
    { tag: '@generated' },
    async ({ page }) => {
      const failed = trackFailedResponses(page);
      await page.goto('/');
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
      await page.waitForLoadState('load');

      expect(failed).toEqual([]);
      const images = page.getByRole('img');
      for (const image of await images.all()) {
        await expect(image).toHaveJSProperty('complete', true);
        expect(await image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
      }
    },
  );

  test(
    'TC-SAUCEDEMO-019 inventory page loads without failed requests',
    { tag: '@generated' },
    async ({ page }) => {
      const failed = trackFailedResponses(page);
      await login(page);
      await expect(page.getByText('Products', { exact: true })).toBeVisible();
      await page.waitForLoadState('load');

      expect(failed).toEqual([]);
    },
  );

  test(
    'TC-SAUCEDEMO-020 every product image on the inventory page loads',
    { tag: '@generated' },
    async ({ page }) => {
      await login(page);
      const images = page.getByTestId('inventory-list').getByRole('img');
      await expect(images).toHaveCount(6);
      for (const image of await images.all()) {
        await expect(image).toHaveJSProperty('complete', true);
        expect(await image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
      }
    },
  );

  test(
    'TC-SAUCEDEMO-021 every product link opens its own product details page',
    { tag: '@generated' },
    async ({ page }) => {
      await login(page);
      const names = await page.getByTestId('inventory-item-name').allTextContents();
      expect(names).toHaveLength(6);

      for (const name of names) {
        await page
          .getByRole('button', { name: `View details for ${name}` })
          .last()
          .click();
        await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
        const back = page.getByRole('button', { name: 'Back to products' });
        await expect(back).toBeVisible();
        await expect(page.getByTestId('inventory-item-name')).toHaveText(name);
        await back.click();
        await expect(page).toHaveURL(/inventory\.html/);
      }
    },
  );

  test(
    'TC-SAUCEDEMO-022 cart link opens the cart and Continue Shopping returns to the inventory',
    { tag: '@generated' },
    async ({ page }) => {
      await login(page);

      await page.getByTestId('shopping-cart-link').click();
      await expect(page).toHaveURL(/cart\.html/);
      await expect(page.getByText('Your Cart')).toBeVisible();

      await page.getByRole('button', { name: 'Continue Shopping' }).click();
      await expect(page).toHaveURL(/inventory\.html/);
    },
  );

  test(
    'TC-SAUCEDEMO-023 menu links All Items and Logout work, About points to the Sauce Labs site',
    { tag: '@generated' },
    async ({ page }) => {
      await login(page);
      await page.getByTestId('shopping-cart-link').click();
      await expect(page).toHaveURL(/cart\.html/);

      await page.getByRole('button', { name: 'Open Menu' }).click();
      // External link: only the target is verified, it is never followed.
      await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute(
        'href',
        'https://saucelabs.com/',
      );
      await page.getByRole('button', { name: 'All Items' }).click();
      await expect(page).toHaveURL(/inventory\.html/);

      await page.getByRole('button', { name: 'Open Menu' }).click();
      await page.getByRole('button', { name: 'Logout' }).click();
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    },
  );

  test(
    'TC-SAUCEDEMO-024 footer social links point to valid Sauce Labs profiles',
    { tag: '@generated' },
    async ({ page }) => {
      await login(page);

      // External links: only the href/target are verified, they are never followed.
      const social = [
        { name: 'X', href: /^https:\/\/(twitter|x)\.com\/saucelabs\/?$/ },
        { name: 'Facebook', href: /^https:\/\/www\.facebook\.com\/saucelabs\/?$/ },
        { name: 'LinkedIn', href: /^https:\/\/www\.linkedin\.com\/company\/sauce-labs\/?$/ },
      ];
      for (const { name, href } of social) {
        const link = page.getByRole('link', { name });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', href);
      }
    },
  );
});
