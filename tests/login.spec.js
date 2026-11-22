import { test, expect } from './fixture';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/TestData';

test('TC-LOGIN-001: Login with valid credentials @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('TC-LOGIN-002: Login fails with wrong password @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, 'wrong_pass');

    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-003: Login fails with unregistered username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('fake_user', users.standard.password);

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
