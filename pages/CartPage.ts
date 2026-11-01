import { type Locator, type Page } from '@playwright/test';

/** Page Object for the Sauce Demo "Your Cart" screen. */
export class CartPage {
  readonly itemNames: Locator;

  constructor(page: Page) {
    this.itemNames = page.getByTestId('inventory-item-name');
  }
}
