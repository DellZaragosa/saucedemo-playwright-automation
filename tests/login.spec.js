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

test('TC-LOGIN-004: Login fails with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', users.standard.password);

    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-005: Login fails with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, '');

    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-006: Login fails with both fields empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-007: Locked-out user cannot log in', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(page.locator('[data-test="error"]')).toContainText('user has been locked out');
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-008: Username is case sensitive', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username.toUpperCase(), users.standard.password);

    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-009: Password is case sensitive', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password.toUpperCase());

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
