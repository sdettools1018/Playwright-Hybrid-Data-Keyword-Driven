import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HondaPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }
}