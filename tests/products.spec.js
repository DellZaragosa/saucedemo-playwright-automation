import { test, expect } from './fixture'

test('TC-PROD-001: Product list loads after login @smoke', async ({ loggedInPage: page }) => {
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveCount(6);
    await expect(page.locator('.inventory_item_img img')).toHaveCount(6);
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);
});

test('TC-PROD-004: Sort Price (low to high) @smoke', async ({ loggedInPage: page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']);
});

test('TC-PROD-009: Add to cart button changes state @smoke', async ({ loggedInPage: page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(1);
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(5);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});