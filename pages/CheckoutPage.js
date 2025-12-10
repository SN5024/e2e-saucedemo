// pages/CheckoutPage.js
import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]'); // handles negative cases
    }

    // Happy path: fill all info and continue
    async enterCheckoutInfo(first, last, zip) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(zip);
        await this.continueButton.click();
        await this.page.waitForURL('**/checkout-step-two.html');
    }

    // Negative path: attempt checkout and return error message
    async enterCheckoutInfoExpectError(first, last, zip) {
        if (first !== undefined) await this.firstName.fill(first);
        if (last !== undefined) await this.lastName.fill(last);
        if (zip !== undefined) await this.postalCode.fill(zip);

        await this.continueButton.click();

        // Wait for error to appear and return text
        if (await this.errorMessage.isVisible()) {
            return await this.errorMessage.textContent();
        }
        return null; // no error visible
    }

    // Helper to check if error is visible
    async isErrorVisible() {
        return await this.errorMessage.isVisible();
    }
}