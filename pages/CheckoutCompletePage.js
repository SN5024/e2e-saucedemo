// pages/CheckoutCompletePage.js
import { expect } from '@playwright/test';

export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.confirmation = page.locator('.complete-header');
    }

    // Happy path: verify order is completed successfully
    async verifyOrderComplete() {
        await expect(this.confirmation).toHaveText(/thank you for your order!/i);
    }

    // Negative scenario: verify order did NOT complete
    async verifyOrderNotComplete() {
        const isVisible = await this.confirmation.isVisible();
        if (isVisible) {
            const text = await this.confirmation.textContent();
            throw new Error(`Order should not be complete, but found confirmation: "${text}"`);
        }
    }
}