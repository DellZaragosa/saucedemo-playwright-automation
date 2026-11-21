import { test, expect } from './fixture';

test('TC-CART-001: Added item appears in cart with correct details @smoke', async ({ loggedInPage: page }) => {
    const product = page.locator('.inventory_item').first();
    const name = await product.locator('.inventory_item_name').textContent();
    const description = await product.locator('.inventory_item_desc').textContent();
    const price = await product.locator('.inventory_item_price').textContent();
    const cartItem = page.locator('.cart_item');
    
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible();
    await page.locator('.shopping_cart_link').click();
    
    await expect(cartItem).toHaveCount(1);
    await expect(cartItem.locator('.cart_quantity')).toHaveText('1');
    await expect(cartItem.locator('.inventory_item_name')).toHaveText(name);
    await expect(cartItem.locator('.inventory_item_desc')).toHaveText(description);
    await expect(cartItem.locator('.inventory_item_price')).toHaveText(price);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});