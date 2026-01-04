import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import allLocators from '../locators/locators.json';

export class NewCarsPage extends BasePage {

    private locators = allLocators.newCarsPage;

    constructor(page: Page) {
        super(page);
    }

    async getHeaderText() : Promise<string | null> {
        return await this.getText(this.locators.newCarsHeading);
    }
    async gotoBMWCars(){
        await this.clickOn(this.locators.bmwCars);
        await this.waitForTimeout(3000);
    }
    async gotoHondaCars(){
        await this.clickOn(this.locators.hondaCars);
        await this.waitForTimeout(3000);
    }
    async gotoToyotaCars(){
        await this.clickOn(this.locators.toyotaCars);
        await this.waitForTimeout(3000);
    }
    async gotoHyundaiCars(){
        await this.clickOn(this.locators.hyundaiCars);
        await this.waitForTimeout(3000);
    }
}