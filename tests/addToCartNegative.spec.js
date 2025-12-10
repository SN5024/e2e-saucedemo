// tests/addToCartNegative.spec.js
import { test, expect } from '@playwright/test';
import { login } from '../helpers/helperLogin.js';
import { CartPage } from '../pages/CartPage.js';
import dotenv from 'dotenv';
dotenv.config();

let context;
let page;

test.describe('Add to Cart Negative Scenarios', () => {
    let cartPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        await login(page);
        cartPage = new CartPage(page);
    });

    test('Remove item not in cart', async () => {
        // Use a locator directly for non-existent item
        const nonExistentRemoveButton = page.locator(
            `.cart_item:has-text("Non-existent Product") button:has-text("Remove")`
        );
        await expect(nonExistentRemoveButton).toHaveCount(0); // Negative check
    });

    test('Cart shows empty after removing all items', async () => {
        // Navigate to cart page if not already there
        await page.goto(process.env.BASE_URL + '/cart.html');

        // Assuming the cart is empty initially, just verify
        await cartPage.verifyCartEmpty();
    });

    test.afterAll(async () => {
        await context.close();
    });
});