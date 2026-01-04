import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import allLocators from '../locators/locators.json';

export class HomePage extends BasePage {

private locators = allLocators.HomePage;
    constructor(page: Page) {
        super(page);
    }

    // private newCarMenu = () => this.page.locator('//div[normalize-space()="NEW CARS"]');
    // private findNewCarMenu = () => this.page.locator('text=Find New Cars');

    async navigateToHomePage() {
        await this.navigateToUrl('');
    }
    async findNewCar(){
        await this.hoverOn(this.locators.newCars);
        await this.clickOn(this.locators.findNewCars);
        await this.waitForTimeout(3000);
    }
    async upcomingCars(){}
    async searchCars(){}

}