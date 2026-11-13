import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
});

test('TC-PROD-001: Product list loads after login @smoke', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('.inventory_item_name')).toHaveCount(6);
    await expect(page.locator('.inventory_item_desc')).toHaveCount(6);
    await expect(page.locator('.inventory_item_price')).toHaveCount(6);
    await expect(page.locator('.inventory_item_img img')).toHaveCount(6);
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);
});

test('TC-PROD-004: Sort Price (low to high) @smoke', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('lohi');

    await expect(page.locator('.inventory_item_price')).toHaveText(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']);
});