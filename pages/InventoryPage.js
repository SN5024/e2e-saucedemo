// pages/InventoryPage.js
import { expect } from '@playwright/test';

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async addProductToCartById(productId) {
        const selector = `[data-test="add-to-cart-${productId}"]`;
        const button = this.page.locator(selector);
        console.log("Clicking:", selector);
        await button.click();
        await this.page.waitForTimeout(300);
    }

    async verifyProductAddedToCart(expectedCount) {
        await expect(this.cartBadge).toHaveText(String(expectedCount, { timeout: 3000 }));
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForURL('**/cart.html');
    }
}