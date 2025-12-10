// pages/LogoutPage.js
export class LogoutPage {
    constructor(page) {
        this.page = page;
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async logout() {
        await this.menuButton.click();
        await Promise.all([
            this.page.waitForURL('https://www.saucedemo.com/'),
            this.logoutLink.click()
        ]);
    }
}