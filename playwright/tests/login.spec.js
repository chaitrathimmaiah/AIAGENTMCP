// @ts-check
/**
 * Login Tests
 * Tests for authentication and login page functionality
 * Uses Page Object Model (POM) architecture
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const { TEST_USERS } = require('./utils/testData');

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Should navigate to login page successfully', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    
    const url = await loginPage.getUrl();
    expect(url).toContain('saucedemo.com');
    console.log('✓ Successfully navigated to login page');
  });

  test('Should verify page title on login page', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    
    const title = await loginPage.verifyPageTitle();
    expect(title).toContain('Swag Labs');
    console.log('✓ Login page title verified');
  });

  test('Should login with valid credentials (standard user)', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(
      TEST_USERS.STANDARD_USER.username,
      TEST_USERS.STANDARD_USER.password
    );

    const url = await loginPage.getUrl();
    expect(url).toContain('inventory.html');
    console.log('✓ Successfully logged in as standard user');
  });

  test('Should login with problem user', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(
      TEST_USERS.PROBLEM_USER.username,
      TEST_USERS.PROBLEM_USER.password
    );

    const url = await loginPage.getUrl();
    expect(url).toContain('inventory.html');
    console.log('✓ Successfully logged in as problem user');
  });

  test('Should login with performance glitch user', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(
      TEST_USERS.PERFORMANCE_GLITCH_USER.username,
      TEST_USERS.PERFORMANCE_GLITCH_USER.password
    );

    const url = await loginPage.getUrl();
    expect(url).toContain('inventory.html');
    console.log('✓ Successfully logged in as performance glitch user');
  });

  test('Should display error for locked out user', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    
    await loginPage.enterUsername(TEST_USERS.LOCKED_OUT_USER.username);
    await loginPage.enterPassword(TEST_USERS.LOCKED_OUT_USER.password);
    await loginPage.clickLoginButton();

    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    console.log('✓ Error displayed for locked out user');
  });

  test('Should require username field', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    
    // Try to login without username
    await loginPage.enterPassword(TEST_USERS.STANDARD_USER.password);
    await loginPage.clickLoginButton();

    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username');
    console.log('✓ Username field is required');
  });

  test('Should require password field', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    
    // Try to login without password
    await loginPage.enterUsername(TEST_USERS.STANDARD_USER.username);
    await loginPage.clickLoginButton();

    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Password');
    console.log('✓ Password field is required');
  });

  test('Should display error for invalid credentials', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    
    await loginPage.login('invalid_user', 'invalid_password');

    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
    console.log('✓ Error displayed for invalid credentials');
  });
});
