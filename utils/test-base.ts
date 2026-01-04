import {test as baseTest, Page, expect} from '@playwright/test';
import { PageFixtures } from '../fixtures/page-fixtures';

type Fixtures = {
    pages : PageFixtures
}
export const test = baseTest.extend<Fixtures>({
    pages: async ({page}, use) => {
        const pages = new PageFixtures(page);
        await use(pages);
    }
});


export {expect};
