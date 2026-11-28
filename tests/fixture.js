import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutInfo } from '../data/TestData';

export const test = base.extend({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        
        await expect(page).toHaveURL(/inventory/);
        await use(page);
    },

    checkoutInfoPage: async ({ loggedInPage }, use) => {
        await loggedInPage.getByRole('button', { name: 'Add to cart' }).first().click();
        await loggedInPage.locator('[data-test="shopping-cart-link"]').click();
        await loggedInPage.getByRole('button', { name: 'Checkout' }).click();

        await expect(loggedInPage).toHaveURL(/checkout-step-one/);
        await use(loggedInPage);
    },

    checkoutOverviewPage: async ({ checkoutInfoPage }, use) => {
        const checkoutPage = new CheckoutPage(checkoutInfoPage);

        await checkoutPage.submitInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);
        
        await expect(checkoutInfoPage).toHaveURL(/checkout-step-two/);
        await use(checkoutInfoPage);
    },

    orderCompletePage: async ({ checkoutOverviewPage }, use) => {
        await checkoutOverviewPage.getByRole('button', { name: 'Finish' }).click();

        await expect(checkoutOverviewPage).toHaveURL(/checkout-complete/);
        await use(checkoutOverviewPage);
    },
});

export  { expect };