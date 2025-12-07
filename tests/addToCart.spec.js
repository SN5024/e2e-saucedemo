import { test } from '@playwright/test';
import { login } from '../helpers/helperLogin.js';
import { InventoryPage } from '../pages/InventoryPage';
import dotenv from 'dotenv';
dotenv.config(); // Load variables from .env file

let context;
let page;
let inventoryPage;

test.describe('Add Product to Cart Page', () => {

    test.beforeAll(async ({ browser }) => {
        // Create one context for all tests in this file
        context = await browser.newContext();
        // Create one shared page
        page = await context.newPage();
        // Login ONCE
        await login(page);
        // Initialize page objects
        inventoryPage = new InventoryPage(page);
    });

    test('Add product to cart and verify count in cart', async () => {
        // Step 2: Add a product to cart (by ID)
        await inventoryPage.addProductToCartById('sauce-labs-backpack');
        // Wait 3 seconds to see the page
        await page.waitForTimeout(1000);
        // Step 3: Verify cart count increased
        await inventoryPage.verifyProductAddedToCart('1');
    });

    test('Add second product to cart', async () => {
        await inventoryPage.addProductToCartById('sauce-labs-bike-light');
        // Wait 3 seconds to see the page
        await page.waitForTimeout(1000);
        // Step 3: Verify cart count increased
        await inventoryPage.verifyProductAddedToCart('2');
    });

    test.afterAll(async () => {
        await context.close();
    });
});