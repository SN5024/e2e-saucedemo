// tests/addToCart.spec.js
import { test } from '@playwright/test';
import { login } from '../helpers/helperLogin.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';
import { LogoutPage } from '../pages/LogoutPage.js';
import dotenv from 'dotenv';
dotenv.config();

let context;
let page;
let inventoryPage;
let cartPage;
let checkoutPage;
let overviewPage;
let completePage;
let logoutPage;

test.describe.serial('Full Add to Cart and Checkout Flow', () => {
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        await login(page);

        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        overviewPage = new CheckoutOverviewPage(page);
        completePage = new CheckoutCompletePage(page);
        logoutPage = new LogoutPage(page);
    });

    test('Add products to cart and verify count', async () => {
        await inventoryPage.addProductToCartById('sauce-labs-backpack');
        await inventoryPage.verifyProductAddedToCart('1');
        await inventoryPage.addProductToCartById('sauce-labs-bike-light');
        await inventoryPage.verifyProductAddedToCart('2');
    });

    test('Go to cart and verify items', async () => {
        await inventoryPage.goToCart();
        await cartPage.verifyItems(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    });

    test('Remove first product and verify remaining items', async () => {
        await cartPage.removeItem('Sauce Labs Backpack');
        await cartPage.verifyItems(['Sauce Labs Bike Light']);
    });

    test('Proceed to checkout', async () => {
        await cartPage.clickCheckout();
        await checkoutPage.enterCheckoutInfo('Srishti', 'N', '12345');
        await overviewPage.verifyItems(['Sauce Labs Bike Light']);
        await overviewPage.finishCheckout();
        await completePage.verifyOrderComplete();
    });

    test('Logout', async () => {
        await logoutPage.logout();
    });

    test.afterAll(async () => {
        await context.close();
    });
});