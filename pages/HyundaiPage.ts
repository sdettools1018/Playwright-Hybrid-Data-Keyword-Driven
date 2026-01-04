import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HyundaiPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }
}