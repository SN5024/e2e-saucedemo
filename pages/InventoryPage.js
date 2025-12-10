// pages/InventoryPage.js
import { expect } from '@playwright/test';

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.inventoryItems = page.locator('.inventory_item'); // all products
    }

    // Happy path: add product by ID
    async addProductToCartById(productId) {
        const selector = `[data-test="add-to-cart-${productId}"]`;
        const button = this.page.locator(selector);

        // Check if product exists
        if (await button.count() === 0) {
            throw new Error(`Product with ID "${productId}" does not exist`);
        }

        console.log("Clicking:", selector);
        await button.click();

        // Wait for the cart badge to update (if exists)
        await expect(this.cartBadge).toHaveText(/\d+/, { timeout: 2000 }).catch(() => {});
    }

    // Verify number of items in cart badge
    async verifyProductAddedToCart(expectedCount) {
        if (expectedCount === 0) {
            // negative case: cart should be empty, badge may not exist
            const isVisible = await this.cartBadge.isVisible().catch(() => false);
            if (isVisible) {
                await expect(this.cartBadge).toHaveText('0');
            }
        } else {
            await expect(this.cartBadge).toHaveText(String(expectedCount), { timeout: 3000 });
        }
    }

    // Go to cart page
    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForURL('**/cart.html');
    }

    // Negative scenario helper: check if a product exists
    async isProductAvailable(productId) {
        const selector = `[data-test="add-to-cart-${productId}"]`;
        return (await this.page.locator(selector).count()) > 0;
    }

    // Negative scenario: try to remove all items and verify empty cart
    async removeAllItems() {
        const removeButtons = this.page.locator('[data-test^="remove-"]');
        const count = await removeButtons.count();
        for (let i = 0; i < count; i++) {
            await removeButtons.nth(0).click(); // always remove first in list
        }
    }

    // Check if cart is empty
    async isCartEmpty() {
        return !(await this.cartBadge.isVisible().catch(() => false));
    }
}