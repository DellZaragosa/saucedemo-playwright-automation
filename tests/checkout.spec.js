import { test, expect } from './fixture';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutInfo } from '../data/TestData';

test('TC-CHKOUT-001: Complete a purchase with valid details @smoke', async ({ loggedInPage: page }) => {
    const checkoutPage = new CheckoutPage(page);

    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.locator('[data-test="title"]')).toContainText('Your Information');

    await checkoutPage.submitInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);

    await expect(page.locator('[data-test="title"]')).toContainText('Overview');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});

test('TC-CHKOUT-002: Checkout fails with empty first name', async ({ checkoutInfoPage: page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.submitInformation('', checkoutInfo.lastName, checkoutInfo.postalCode);

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one/);
});

test('TC-CHKOUT-003: Checkout fails with empty last name', async ({ checkoutInfoPage: page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.submitInformation(checkoutInfo.firstName, '', checkoutInfo.postalCode);

    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
    await expect(page).toHaveURL(/checkout-step-one/);
});

test('TC-CHKOUT-004: Checkout fails with empty postal code', async ({ checkoutInfoPage: page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.submitInformation(checkoutInfo.firstName, checkoutInfo.lastName, '');

    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
    await expect(page).toHaveURL(/checkout-step-one/);
});

test('TC-CHKOUT-005: Checkout fails with all fields empty', async ({ checkoutInfoPage: page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.submitInformation('', '', '');

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one/);
});

test('TC-CHKOUT-006: Cancel on information page returns to cart', async ({ checkoutInfoPage: page }) => {
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
});

test('TC-CHKOUT-010: Cancel on overview page', async ({ checkoutOverviewPage: page }) => {
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Open the cart to confirm the item is still there.
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
});

test('TC-CHKOUT-011: Cart is emptied after order completion', async ({ orderCompletePage: page }) => {
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);

    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
});

test('TC-CHKOUT-012: Back Home returns to the Products page', async ({ orderCompletePage: page }) => {
    await page.getByRole('button', { name: 'Back Home' }).click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    
    // Open the cart to confirm it is empty.
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
});

test('TC-CHKOUT-013: Unusual characters in information fields', async ({ checkoutInfoPage: page }) => {
    test.fail(true, 'BUG-005: Name fields accept digits and symbols');
    
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.submitInformation('12345', '@#$%', 'ABCDE');

    // Correct behavior: Names with digits and symbols are rejected.
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/checkout-step-one/);
});

test('TC-CHKOUT-014: Very long input in information fields', async ({ checkoutInfoPage: page }) => {
    const checkoutPage = new CheckoutPage(page);
    const longText = 'a'.repeat(200);

    await checkoutPage.submitInformation(longText, longText, longText);

    //Behavior recorded: Long input is accepted and no crash occurs. The Checkout Overview opens.
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('[data-test="title"]')).toContainText('Overview');
});