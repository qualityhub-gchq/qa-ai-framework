import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import users from '../test-data/users.json';
import { env } from '../config/env';

/**
 * Custom fixtures: tests ask for what they need ({ loginPage }, { loggedInPage }) instead of
 * repeating setup code. This is Playwright's recommended alternative to beforeEach hooks.
 */
type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  /** An InventoryPage already logged in as the standard user. */
  loggedInInventory: InventoryPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  loggedInInventory: async ({ page }, use) => {
    // Phase 3 improvement: log in once and reuse it with storageState instead of logging in per test.
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, env.saucePassword);
    await use(new InventoryPage(page));
  },
});

export { expect };
