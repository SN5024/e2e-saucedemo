import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config(); // Load variables from .env file

const BASE_URL = process.env.BASE_URL;
// const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com/'; => fallback if needed
const USERNAME = process.env.SAUCE_USERNAME;
const PASSWORD = process.env.SAUCE_PASSWORD;

let context;        // Represents a browser context (like an incognito window)
let page;           // Single brower tab / a webpage
let loginPage;      // Instance of LoginPage

test.describe('Login page', () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page, BASE_URL);
        await loginPage.goto();   // open login page
    });

    test('Sign in button is visible', async () => {
        await expect(loginPage.loginBtn).toBeVisible();
    });

    test('Successful Login with valid credentials', async () => {
        // Enter valid username and password
        await loginPage.login(USERNAME, PASSWORD);

        // Wait 3 seconds to see the page
        await page.waitForTimeout(1000);

        // Verify you are redirected to inventory page
        await page.locator('.inventory_list').waitFor({ state: 'visible' });
        await expect(page).toHaveURL(/.*inventory.html/);
        
        // Check that products container is visible
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test.afterAll(async () => {
        // clean up and close browser context
        await context.close();
    });
});
