import { test, expect } from './fixture';

test('TC-CHKOUT-001: Complete a purchase with valid details @smoke', async ({ loggedInPage: page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.locator('[data-test="title"]')).toContainText('Your Information');

    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="title"]')).toContainText('Overview');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});