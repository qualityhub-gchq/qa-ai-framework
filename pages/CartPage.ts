// Page Object for the cart screen: locators and actions go here, assertions stay in the tests.
// If the screen changes, only this file needs updating. It has one locator and no actions yet,
// because tests only need to read the item names. Tests get it through the cartPage fixture.

import { type Locator, type Page } from '@playwright/test';

/** Page Object for the Sauce Demo "Your Cart" screen. */
export class CartPage {
  readonly itemNames: Locator;

  constructor(page: Page) {
    this.itemNames = page.getByTestId('inventory-item-name');
  }
}
