import { test, expect } from '@playwright/test';

test('TC-LOGIN-001: Login with valid credentials @smoke', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
});

test('TC-LOGIN-002: Login fails with wrong password @smoke', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_pass');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    await expect(page).toHaveURL('https://www.saucedemo.com');
});

test('TC-LOGIN-014: Direct URL access without login @smoke', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/inventory.html' when you are logged in.");
    await expect(page).toHaveURL('https://www.saucedemo.com');
});
