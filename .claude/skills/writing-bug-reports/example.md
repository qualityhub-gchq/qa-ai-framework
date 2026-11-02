# Example: input → expected output

## Input

`tests/generated/saucedemo-com/problem-user.spec.ts`:

```ts
// POTENTIAL BUG: after clicking Remove on the Backpack the cart badge is still shown
test.fixme(
  'TC-SAUCEDEMO-016 Remove button removes the product from the cart',
  { tag: '@generated' },
  async ({ page }) => {
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    await page.getByTestId('remove-sauce-labs-backpack').click();
    await expect(page.getByTestId('shopping-cart-badge')).toBeHidden();
  },
);
```

(`beforeEach` logs in as `problem_user` on https://www.saucedemo.com.)

## Output

**Title:** `[problem_user] Cart badge is not cleared after clicking Remove`

```markdown
## Summary

After adding a product and clicking Remove, the cart badge is still displayed, so the cart count is wrong.

## Environment

- App URL: https://www.saucedemo.com
- User: problem_user
- Browser / project: explorer (Chromium)
- Build / commit: local

## Steps to reproduce

1. Log in as `problem_user`
2. Click **Add to cart** on "Sauce Labs Backpack" (badge shows 1)
3. Click **Remove** on the same product

## Expected result

The cart badge disappears.

## Actual result

The cart badge is still shown after clicking Remove.

## Evidence

- Test: `tests/generated/saucedemo-com/problem-user.spec.ts` — TC-SAUCEDEMO-016 (marked test.fixme)

## Severity

High — the cart shows wrong data and there is no clear workaround.

## Related test case

TC-SAUCEDEMO-016
```

Why this is good: every step comes from the test, the expected result comes from the assertion, and the severity reason uses the rules.
