// pages/CartPage.js
import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async removeItem(itemName) {
        // Wait until the cart page is fully loaded
        await this.page.waitForURL('**/cart.html', { timeout: 5000 });

        // Re-locate the cart item row fresh from DOM
        const cartItem = this.page.locator(`.cart_item:has-text("${itemName}")`);
        await cartItem.waitFor({ state: 'visible', timeout: 5000 });

        // Re-locate the Remove button fresh from DOM
        const removeButton = cartItem.locator('button:has-text("Remove")');
        await removeButton.waitFor({ state: 'visible', timeout: 5000 });

        // Click the Remove button
        await removeButton.click();

        // Wait until the item row disappears from the DOM
        await cartItem.waitFor({ state: 'detached', timeout: 5000 });
    }

    async verifyItems(expectedItems) {
        const items = await this.cartItems.allTextContents();
        for (const item of expectedItems) {
            if (!items.some(text => text.includes(item))) {
                throw new Error(`Item "${item}" not found in cart`);
            }
        }
    }

    async clickCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForURL('**/checkout-step-one.html');
    }
}