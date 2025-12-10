// tests/loginNegative.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config(); // Load variables from .env file

const BASE_URL = process.env.BASE_URL;
// const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com/'; => fallback if needed

let context;        // Represents a browser context (like an incognito window)
let page;           // Single brower tab / a webpage

test.describe('Login Negative Scenarios', () => {
    let loginPage;
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page, BASE_URL);
        await loginPage.goto();   // open login page
    });

    test('Login with invalid credentials', async () => {
        await loginPage.login('wrong@example.com', 'wrongPassword');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('Login with empty username', async () => {
        await loginPage.login('', 'secret_sauce');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
    });

    test('Login with empty password', async () => {
        await loginPage.login('standard_user', '');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
    });

    test.afterAll(async () => {
        // clean up and close browser context
        await context.close();
    });
});