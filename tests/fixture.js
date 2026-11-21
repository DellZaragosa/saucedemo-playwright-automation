import { test as base, expect } from '@playwright/test'

export const test = base.extend({
    loggedInPage: async ({ page }, use) => {
        await page.goto('/');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/inventory/);
        await use(page);
    },
});

export  { expect };