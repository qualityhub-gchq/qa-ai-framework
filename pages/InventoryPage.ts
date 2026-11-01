import { type Locator, type Page } from '@playwright/test';

/** Page Object for the Sauce Demo product list ("Products") screen. */
export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  /** Adds a product to the cart using its visible name, e.g. "Sauce Labs Backpack". */
  async addToCart(productName: string): Promise<void> {
    await this.items
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  /** Removes a product from the cart using its visible name, e.g. "Sauce Labs Backpack". */
  async removeFromCart(productName: string): Promise<void> {
    await this.items
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
