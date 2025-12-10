// pages/LoginPage.js
import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page, baseURL) {
        this.page = page;
        this.baseURL = baseURL;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]'); // added for negative login
    }

    async goto() {
        await this.page.goto(this.baseURL);
    }

    // Happy path login
    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    // Negative / edge cases
    async loginExpectError(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
        return this.errorMessage.textContent(); // returns the error text
    }

    async isErrorVisible() {
        return await this.errorMessage.isVisible();
    }
}
