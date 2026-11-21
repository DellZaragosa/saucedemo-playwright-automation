import { test, expect } from './fixture';

test('TC-CHKOUT-001: Complete a purchase with valid details @smoke', async ({ loggedInPage: page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(page.locator('.cart_item')).toHaveCount(1);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.locator('.title')).toContainText('Your Information');

    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('.title')).toContainText('Overview');
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});