// pages/CheckoutCompletePage.js
import { expect } from '@playwright/test';

export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.confirmation = page.locator('.complete-header');
    }

    async verifyOrderComplete() {
        await expect(this.confirmation).toHaveText(/thank you for your order!/i);
    }
}