import { test, expect } from './fixture';

test('TC-LOGIN-001: Login with valid credentials @smoke', async ({ loggedInPage: page }) => {
    await expect(page.locator('.title')).toHaveText('Products');
});

test('TC-LOGIN-002: Login fails with wrong password @smoke', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_pass');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-014: Direct URL access without login @smoke', async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/inventory.html' when you are logged in.");
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-015: Logout returns to login page @smoke', async ({ loggedInPage: page }) => {
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    
    await page.goBack();

    await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/inventory.html' when you are logged in.");
    await expect(page).toHaveURL('/');
});
