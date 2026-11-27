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

test('TC-LOGIN-010: Trailing space in username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username + ' ', users.standard.password);

    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-011: Very long input in both fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('a'.repeat(200), 'a'.repeat(200));
    
    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-012: Special characters and injection-style text', async ({ page }) => {
    const loginPage = new LoginPage(page);
    let alertShown = false;

    page.on('dialog', async (dialog) => {
        alertShown = true;
        await dialog.dismiss();
    });

    await loginPage.goto();
    await loginPage.login("' OR 1=1 --", '<script>');
    
    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    await expect(loginPage.usernameInput).toBeEditable();
    expect(alertShown).toBe(false);
    await expect(page).toHaveURL('/');
});

test('TC-LOGIN-013: Dismiss the login error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const errorMessage = page.locator('[data-test="error"]');
    const usernameIcon = page.getByPlaceholder('Username').locator('..').locator('svg');
    const passwordIcon = page.getByPlaceholder('Password').locator('..').locator('svg');

    await loginPage.goto();
    await loginPage.login('invalid', 'invalid');

    await expect(errorMessage).toBeVisible();
    await expect(usernameIcon).toBeVisible();
    await expect(passwordIcon).toBeVisible();
    await expect(loginPage.usernameInput).toHaveClass(/\berror\b/);
    await expect(loginPage.passwordInput).toHaveClass(/\berror\b/);

    await page.locator('[data-test="error-button"]').click();

    await expect(errorMessage).toBeHidden();
    await expect(usernameIcon).toHaveCount(0);
    await expect(passwordIcon).toHaveCount(0);
    await expect(loginPage.usernameInput).not.toHaveClass(/\berror\b/);
    await expect(loginPage.passwordInput).not.toHaveClass(/\berror\b/);
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
