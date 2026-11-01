import { test, expect } from '../../fixtures/test-fixtures';
import users from '../../test-data/users.json';
import { env } from '../../config/env';

/**
 * Test cases: specs/login.md
 * Tags: @smoke = fast PR gate, @regression = full nightly suite.
 */
test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test(
    'TC-LOGIN-001 standard user can log in',
    { tag: ['@smoke', '@regression'] },
    async ({ loginPage, inventoryPage, page }) => {
      await loginPage.login(users.standard.username, env.saucePassword);

      await expect(page).toHaveURL(/inventory\.html/);
      await expect(inventoryPage.title).toHaveText('Products');
    },
  );

  test(
    'TC-LOGIN-002 locked-out user sees an error',
    { tag: '@regression' },
    async ({ loginPage, page }) => {
      await loginPage.login(users.lockedOut.username, env.saucePassword);

      await expect(loginPage.errorMessage).toContainText('locked out');
      await expect(page).not.toHaveURL(/inventory\.html/);
    },
  );

  test(
    'TC-LOGIN-003 invalid credentials are rejected',
    { tag: '@regression' },
    async ({ loginPage }) => {
      await loginPage.login(users.invalid.username, 'wrong_password');

      await expect(loginPage.errorMessage).toContainText('do not match');
    },
  );

  test(
    'TC-LOGIN-004 empty username shows a required-field error',
    { tag: '@regression' },
    async ({ loginPage }) => {
      await loginPage.login('', env.saucePassword);

      await expect(loginPage.errorMessage).toContainText('Username is required');
    },
  );
});
