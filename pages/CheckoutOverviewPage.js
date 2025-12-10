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

    // Verify that all expected items are present
    async verifyItems(expectedItems) {
        const texts = await this.items.allTextContents();
        if (expectedItems.length === 0) {
            // Negative scenario: cart should be empty
            if (texts.length > 0) {
                throw new Error(`Expected no items in checkout, but found: ${texts.join(', ')}`);
            }
        } else {
            for (const item of expectedItems) {
                if (!texts.some(text => text.includes(item))) {
                    throw new Error(`Item "${item}" not found in checkout overview`);
                }
            }
        }
    }

    // Verify that a specific item is missing (negative check)
    async verifyItemNotPresent(itemName) {
        const texts = await this.items.allTextContents();
        if (texts.some(text => text.includes(itemName))) {
            throw new Error(`Item "${itemName}" should NOT be present in checkout overview`);
        }
    }

    // Finish checkout (happy path)
    async finishCheckout() {
        await this.finishButton.click();
        await this.page.waitForURL('**/checkout-complete.html');
    }

    // Optional: verify total amounts (negative: mismatch or empty cart)
    async verifyTotals(expectedSubtotal, expectedTotal) {
        if (expectedSubtotal != null) {
            await expect(this.itemTotal).toHaveText(`Item total: $${expectedSubtotal}`);
        }
        if (expectedTotal != null) {
            await expect(this.total).toHaveText(`Total: $${expectedTotal}`);
        }
    }
}