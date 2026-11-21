import { test, expect } from './fixture';

test('TC-CART-001: Added item appears in cart with correct details @smoke', async ({ loggedInPage: page }) => {
    const product = page.locator('[data-test="inventory-item"]').first();
    const name = await product.locator('[data-test="inventory-item-name"]').textContent();
    const description = await product.locator('[data-test="inventory-item-desc"]').textContent();
    const price = await product.locator('[data-test="inventory-item-price"]').textContent();
    const cartItem = page.locator('[data-test="inventory-item"]');
    
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible();
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    await expect(cartItem).toHaveCount(1);
    await expect(cartItem.locator('[data-test="item-quantity"]')).toHaveText('1');
    await expect(cartItem.locator('[data-test="inventory-item-name"]')).toHaveText(name);
    await expect(cartItem.locator('[data-test="inventory-item-desc"]')).toHaveText(description);
    await expect(cartItem.locator('[data-test="inventory-item-price"]')).toHaveText(price);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});