import { test, expect } from './fixture';
import { CheckoutPage } from '../pages/CheckOutPage';
import { checkoutInfo } from '../data/TestData';

test('TC-CHKOUT-001: Complete a purchase with valid details @smoke', async ({ loggedInPage: page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.locator('[data-test="title"]')).toContainText('Your Information');

    await page.getByPlaceholder('First Name').fill(checkoutInfo.firstName);
    await page.getByPlaceholder('Last Name').fill(checkoutInfo.lastName);
    await page.getByPlaceholder('Zip/Postal Code').fill(checkoutInfo.postalCode);
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="title"]')).toContainText('Overview');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});

test('TC-CHKOUT-002: Checkout fails with empty first name', async ({ loggedInPage: page }) => {
    const checkoutPage = new CheckoutPage(page);

    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await checkoutPage.submitInformation('', checkoutInfo.lastName, checkoutInfo.postalCode);

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one/);
});