import { expect } from '@playwright/test';

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async addProductToCartById(productId) {
        const button = this.page.locator(`button[data-test="add-to-cart-${productId}"]`);
        await button.click();
    }

    async getCartCount() {
        const text = await this.cartBadge.textContent();
        return text ? parseInt(text.trim(), 10) : 0;
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async verifyProductAddedToCart(expectedCount) {
        await expect(this.cartBadge).toHaveText(String(expectedCount));
    }
}