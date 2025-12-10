// pages/CheckoutOverviewPage.js
import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
        this.items = page.locator('.cart_item');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async verifyItems(expectedItems) {
        const texts = await this.items.allTextContents();
        for (const item of expectedItems) {
            if (!texts.some(text => text.includes(item))) {
                throw new Error(`Item "${item}" not found in overview`);
            }
        }
    }

    async finishCheckout() {
        await this.finishButton.click();
        await this.page.waitForURL('**/checkout-complete.html');
    }
}