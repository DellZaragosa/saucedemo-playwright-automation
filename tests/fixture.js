import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

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
});

export  { expect };