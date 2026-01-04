// import {test, expect} from '@playwright/test';
// import { HomePage } from '../pages/HomePage';
// import { NewCarsPage } from '../pages/NewCarsPage';
import {test, expect} from '../utils/test-base';
import {readCSVData} from '../utils/readCSVData';
//import path from 'path';
interface CarData {
    carBrand: string;
    [key: string]: string;
}

const testData = readCSVData('data/testdata.csv') as CarData[];
test.describe('Find New Car Tests', () => {
    // let homePage: HomePage;
    // let newCarsPage: NewCarsPage;
    test.beforeEach(async ({pages}) => {
        // homePage = new HomePage(page);
        // newCarsPage = new NewCarsPage(page);
        await pages.homePage.navigateToHomePage();
    });

    test('Navigate to Find New Car Page', async ({pages}) => {
        await pages.homePage.findNewCar();
        // Add assertions here to verify navigation if needed
        await expect(pages.page).toHaveURL(/.*new-cars/);
        console.log(await pages.newCarsPage.getHeaderText());
        expect(await pages.newCarsPage.getHeaderText()).toContain('New Cars');
        await pages.newCarsPage.gotoBMWCars();
        expect(pages.page).toHaveURL(/.*bmw/);

    });
    
    
    test('Parameterized Find New Car Page', async ({pages}) => {

        for (const data of testData) {
            await pages.homePage.findNewCar();
            // Add assertions here to verify navigation if needed
            await expect(pages.page).toHaveURL(/.*new-cars/);
            console.log(await pages.newCarsPage.getHeaderText());
            expect(await pages.newCarsPage.getHeaderText()).toContain('New Cars');
            if (data.carBrand === 'bmw') {
                await pages.newCarsPage.gotoBMWCars();
                expect(pages.page).toHaveURL(/.*bmw/);
            } else if (data.carBrand === 'honda') {
                await pages.newCarsPage.gotoHondaCars();
                expect(pages.page).toHaveURL(/.*honda/);
            } else if (data.carBrand === 'toyota') {
                await pages.newCarsPage.gotoToyotaCars();
                expect(pages.page).toHaveURL(/.*toyota/);
            } else if (data.carBrand === 'hyundai') {
                await pages.newCarsPage.gotoHyundaiCars();
                expect(pages.page).toHaveURL(/.*hyundai/);
            }

            const carTitle = await pages.carBase.getCarTitle();
            console.log(`Car Title for ${data.carBrand}: ${carTitle}`);
            expect(carTitle).toContain(data.carTitle);

            const carNameandPrices = await pages.carBase.getCarName();
            // Additional assertions can be added here based on requirements
            console.log(carNameandPrices);

        }

    });

});