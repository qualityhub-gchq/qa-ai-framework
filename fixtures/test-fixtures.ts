// Shared setup for tests: creates the Page Objects and a logged-in page, so tests just ask for
// them by name (e.g. { loginPage }, { loggedInInventory }). UI tests import test and expect from
// this file instead of @playwright/test. Each test gets its own new objects, so tests stay independent.

import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

/**
 * Custom fixtures: tests ask for what they need ({ loginPage }, { loggedInInventory }) instead of
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
    // The session comes from tests/setup/auth.setup.ts (storageState), so no login is needed here.
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await use(inventoryPage);
  },
});

export { expect };
