import { Page } from "@playwright/test";
export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async clickOn(locator: string) {
        await this.page.click(locator);
    }
    async typeText(locator: string, text: string) {
        await this.page.fill(locator, text);
    }
    async getText(locator: string) {
        return await this.page.textContent(locator);
    } 
    async hoverOn(locator: string) {
        await this.page.hover(locator);
    }


    async waitForTimeout(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }
    async navigateToUrl(url: string) {
        await this.page.goto(url);
    }
}   