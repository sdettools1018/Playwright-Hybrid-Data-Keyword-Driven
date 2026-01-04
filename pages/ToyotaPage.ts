import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ToyotaPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }
}