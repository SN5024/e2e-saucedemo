// pages/CartPage.js
import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    // Remove an item from cart (positive scenario)
    async removeItem(itemName) {
        await this.page.waitForURL('**/cart.html', { timeout: 5000 });

        const cartItem = this.page.locator(`.cart_item:has-text("${itemName}")`);
        await cartItem.waitFor({ state: 'visible', timeout: 5000 });

        const removeButton = cartItem.locator('button:has-text("Remove")');
        await removeButton.waitFor({ state: 'visible', timeout: 5000 });

        await removeButton.click();
        await cartItem.waitFor({ state: 'detached', timeout: 5000 });
    }

    // Verify items present in cart (positive)
    async verifyItems(expectedItems) {
        const items = await this.cartItems.allTextContents();
        for (const item of expectedItems) {
            if (!items.some(text => text.includes(item))) {
                throw new Error(`Item "${item}" not found in cart`);
            }
        }
    }

    // Verify cart is empty (negative scenario)
    async verifyCartEmpty() {
        const count = await this.cartItems.count();
        if (count > 0) {
            const items = await this.cartItems.allTextContents();
            throw new Error(`Cart is expected to be empty, but found items: ${items.join(', ')}`);
        }
    }

    // Click checkout (positive)
    async clickCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForURL('**/checkout-step-one.html');
    }
}