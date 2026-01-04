import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import allLocators from '../locators/locators.json';

export class CarBasePage extends BasePage {

    private carTitleLocator = allLocators.carBase;

    constructor(page: Page) {
        super(page);
    }

    async getCarTitle(): Promise<string | null> {
        return await this.getText(this.carTitleLocator.carTitle);
    }
    async getCarName() {
        const carName =  this.page.locator(this.carTitleLocator.carName);
        const carCount = await carName.count(); 
        for(let i=0; i<carCount; i++){ 
            const name = await carName.nth(i).innerText();
            console.log(`Car ${i + 1}: ${name}`);
            
        } 
       // use retrun always as iterarion will return undefined for lasat iteration
         return await this.getText(this.carTitleLocator.carName);
    }
    async getCarPrice() {
        return await this.getText(this.carTitleLocator.carPrice);
    }

    async getCarandPriceDetails(){
        const carName =  this.page.locator(this.carTitleLocator.carName);
        const carPrice = this.page.locator(this.carTitleLocator.carPrice);
        const carCount = await carName.count(); 
        for(let i=0; i<carCount; i++){ 
            const name = await carName.nth(i).innerText();
            const price = await carPrice.nth(i).innerText();
            console.log(`Car ${i + 1}: ${name} | Price: ${price}`);
        } 

    }

}