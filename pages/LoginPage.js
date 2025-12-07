export class LoginPage {
    constructor(page, baseURL) {
        this.page = page;
        this.baseURL = baseURL;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
    }

    async goto() {
        await this.page.goto(this.baseURL);
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}