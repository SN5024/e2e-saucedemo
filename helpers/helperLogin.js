import { LoginPage } from '../pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config(); // Load variables from .env file

export async function login(page) {
    const BASE_URL = process.env.BASE_URL;
    // const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com/'; => fallback if needed
    const USERNAME = process.env.SAUCE_USERNAME;
    const PASSWORD = process.env.SAUCE_PASSWORD;

    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
}
