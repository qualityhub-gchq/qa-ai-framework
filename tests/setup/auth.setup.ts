import { test as setup, expect } from '../../fixtures/test-fixtures';
import users from '../../test-data/users.json';
import { env } from '../../config/env';

/**
 * Logs in once before the UI tests and saves the session to a git-ignored file.
 * The ui project loads that file (storageState in playwright.config.ts), so each test starts
 * logged in, in its own browser context, without repeating the login steps.
 */
setup('log in as standard user', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, env.saucePassword);
  await expect(page).toHaveURL(/inventory\.html/);

  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
