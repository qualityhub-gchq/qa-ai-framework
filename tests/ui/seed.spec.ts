import { test, expect } from '../../fixtures/test-fixtures';

/**
 * SEED TEST for the Playwright AI agents (planner / generator / healer).
 * The planner runs this first to get a ready-to-explore page: here, logged in on "Products".
 * It also shows the agents which fixtures and style to reuse when they write new tests.
 * Tagged @seed so it is not part of @smoke or @regression runs.
 */
test.describe('Seed', () => {
  test('seed: logged in as standard user', { tag: '@seed' }, async ({ loggedInInventory }) => {
    await expect(loggedInInventory.title).toHaveText('Products');
    // Agents continue exploring from here.
  });
});
