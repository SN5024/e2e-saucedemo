// pages/LogoutPage.js
export class LogoutPage {
    constructor(page) {
        this.page = page;
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async logout() {
        // Open the menu
        await this.menuButton.click();

        // Wait for logout link to be visible
        await this.logoutLink.waitFor({ state: 'visible' });

        // Click logout
        await this.logoutLink.click();

        // Wait for the login page URL
        await this.page.waitForURL('https://www.saucedemo.com/');
    }
}