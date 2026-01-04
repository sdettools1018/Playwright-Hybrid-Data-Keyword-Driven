import { Page } from "@playwright/test";
import { NewCarsPage } from "../pages/NewCarsPage";
import { HomePage } from "../pages/HomePage";
import { BMWPage } from "../pages/BMWPage";
import { HondaPage } from "../pages/HondaPage";
import { HyundaiPage } from "../pages/HyundaiPage";
import { ToyotaPage } from "../pages/ToyotaPage";
import { CarBasePage } from "../pages/carBase";

export class PageFixtures {
    readonly bmwPage: BMWPage;
    readonly hondaPage: HondaPage;
    readonly hyundaiPage: HyundaiPage;
    readonly toyotaPage: ToyotaPage;
    readonly homePage: HomePage;
    readonly newCarsPage: NewCarsPage;
    readonly page: Page;
    readonly carBase : CarBasePage;

    constructor(page: Page) {
        this.bmwPage = new BMWPage(page);
        this.hondaPage = new HondaPage(page);
        this.hyundaiPage = new HyundaiPage(page);
        this.toyotaPage = new ToyotaPage(page);
        this.homePage = new HomePage(page);
        this.newCarsPage = new NewCarsPage(page);
        this.page = page;
        this.carBase = new CarBasePage(page);
    }
    get basePage(): Page {
        return this.page;
    }
}