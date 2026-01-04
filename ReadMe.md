# CarWale Test Automation Framework

A comprehensive Playwright-based test automation framework for the CarWale automotive e-commerce platform, built with TypeScript for type-safe test development using Page Object Model (POM) pattern.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Quick Setup](#quick-setup)
- [Project Structure](#project-structure)
- [Framework Components](#framework-components)
  - [Locators](#locators)
  - [Page Objects](#page-objects)
  - [Fixtures](#fixtures)
  - [Utilities](#utilities)
  - [Tests](#tests)
- [Playwright Configuration](#playwright-configuration)
- [Running Tests](#running-tests)
- [Test Results & Reports](#test-results--reports)
- [Best Practices](#best-practices)

---

## 🎯 Project Overview

This project automates testing for [CarWale](https://www.carwale.com), India's leading online automotive marketplace. The framework provides:

- **Page Object Model (POM)** — Maintainable and scalable test structure
- **Centralized Locators** — JSON-based element management
- **Custom Fixtures** — Reusable test setup and teardown
- **Data-Driven Testing** — CSV-based test data management
- **Comprehensive Reporting** — Playwright HTML and Allure reports
- **Type Safety** — Full TypeScript implementation

---

## 🛠 Tech Stack

- **Playwright** v1.57.0 — Modern cross-browser automation
- **TypeScript** — Type-safe test development
- **Node.js** v14+ — Runtime environment
- **Allure Playwright** v3.4.3 — Advanced test reporting
- **CSV Parse** v6.1.0 — Data-driven test support

See [package.json](package.json) for complete dependencies.

---

## 📦 Quick Setup

### Prerequisites

- Node.js v14 or higher
- npm or yarn package manager
- Git for version control
- Modern browser (Chrome/Firefox/Safari)

### Installation Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd Project_1

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Install Chrome browser distribution (optional)
npx playwright install chrome

# 5. Verify installation
npx playwright --version
npm --version
node --version
```

---

## 📁 Project Structure

```
Project_1/
├── fixtures/
│   └── page-fixtures.ts              # Custom page object fixtures
├── pages/
│   ├── BasePage.ts                  # Base class with common methods
│   ├── HomePage.ts                  # Home page object model
│   ├── NewCarsPage.ts               # New cars listing page
│   ├── BMWPage.ts                   # BMW brand specific page
│   ├── HondaPage.ts                 # Honda brand specific page
│   ├── HyundaiPage.ts               # Hyundai brand specific page
│   ├── ToyotaPage.ts                # Toyota brand specific page
│   └── carBase.ts                   # Base car page object
├── locators/
│   └── locators.json                # Centralized element locators
├── utils/
│   ├── test-base.ts                 # Extended test fixture utilities
│   └── readCSVData.ts               # CSV data reader utility
├── tests/
│   ├── example.spec.ts              # Example test suite
│   └── findnewcar-test.spec.ts      # Car search test suite
├── data/
│   └── testdata.csv                 # Test data in CSV format
├── allure-results/                  # Allure report data files
├── playwright-report/               # Playwright HTML report output
├── test-results/                    # Test artifacts (videos, screenshots)
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
└── ReadMe.md                        # This file
```

---

## 🔧 Framework Components

### 1. Locators (`locators/locators.json`)

**Purpose:** Centralize all element selectors for easy maintenance and updates.

**Structure & Usage:**

```json
{
  "homePage": {
    "searchInput": "input[placeholder='Search cars']",
    "searchButton": "button:has-text('Search')",
    "exploreButton": "[data-testid='explore-btn']"
  },
  "newCarsPage": {
    "filterButton": ".filter-section",
    "carListing": ".car-card",
    "priceRange": "input[name='price']"
  },
  "brandPages": {
    "bmw": {
      "modelGrid": ".model-grid",
      "compareButton": "button:has-text('Compare')"
    }
  }
}
```

**Usage in Page Objects:**

```typescript
// In HomePage.ts
private locators = require('../locators/locators.json');
private searchInput = this.locators.homePage.searchInput;

async search(carName: string) {
  await this.page.fill(this.searchInput, carName);
}
```

**Best Practices:**
- Use semantic naming (e.g., `searchInput` instead of `input1`)
- Group locators by page/component
- Prefer data-testid attributes for stability
- Use CSS selectors for better performance
- Avoid XPath unless absolutely necessary

---

### 2. Page Objects (`pages/`)

**Purpose:** Encapsulate page-specific interactions and element interactions using POM pattern.

#### Base Page (`pages/BasePage.ts`)

The foundation class providing common functionality:

```typescript
// Common methods available to all pages:
- goto(path: string): Navigate to URL
- click(selector: string): Click element
- fill(selector: string, text: string): Enter text
- getText(selector: string): Extract text
- isVisible(selector: string): Check visibility
- waitFor(selector: string): Wait for element
- takeScreenshot(): Capture page screenshot
- reload(): Refresh page
```

#### Specific Page Objects (HomePage, NewCarsPage, etc.)

**Example: HomePage.ts**

```typescript
import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private locators = require('../locators/locators.json').homePage;

  async navigateToHome() {
    await this.goto('/');
  }

  async searchCar(carName: string) {
    await this.fill(this.locators.searchInput, carName);
    await this.click(this.locators.searchButton);
  }

  async exploreNewCars() {
    await this.click(this.locators.exploreButton);
  }

  async getPageTitle() {
    return await this.page.title();
  }
}
```

**Usage in Tests:**

```typescript
const homePage = new HomePage(page);
await homePage.navigateToHome();
await homePage.searchCar('BMW');
```

**Page Object Best Practices:**
- One class per page/component
- Methods return page objects for chaining
- Hide element details (locators are private)
- Use descriptive method names
- Return results, not locators
- Keep methods focused and single-responsibility

---

### 3. Fixtures (`fixtures/page-fixtures.ts`)

**Purpose:** Provide reusable, pre-configured page objects and browser instances for tests.

**Setup:**

```typescript
// filepath: fixtures/page-fixtures.ts
import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NewCarsPage } from '../pages/NewCarsPage';
import { BMWPage } from '../pages/BMWPage';

type TestFixtures = {
  homePage: HomePage;
  newCarsPage: NewCarsPage;
  bmwPage: BMWPage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    await use(homePage);
  },

  newCarsPage: async ({ page }, use) => {
    const newCarsPage = new NewCarsPage(page);
    await newCarsPage.navigateToNewCars();
    await use(newCarsPage);
  },

  bmwPage: async ({ page }, use) => {
    const bmwPage = new BMWPage(page);
    await bmwPage.navigateToBMWPage();
    await use(bmwPage);
  },
});

export { expect };
```

**Usage in Tests:**

```typescript
import { test } from '../fixtures/page-fixtures';

test('should search for BMW cars', async ({ homePage, newCarsPage }) => {
  await homePage.searchCar('BMW');
  const results = await newCarsPage.getCarListings();
  expect(results.length).toBeGreaterThan(0);
});
```

**Fixture Benefits:**
- Automatic setup and teardown
- Reusable across multiple tests
- Cleaner test code
- Consistent test data
- Easy dependency injection

---

### 4. Utilities (`utils/`)

#### Test Base (`utils/test-base.ts`)

Extended test configuration with common assertions and helpers:

```typescript
// filepath: utils/test-base.ts
import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  // Add custom utilities
});

// Custom assertion helpers
export async function expectUrlContains(page, text: string) {
  expect(page.url()).toContain(text);
}

export async function expectElementCount(page, selector: string, count: number) {
  const elements = await page.locator(selector).count();
  expect(elements).toBe(count);
}

export async function expectTextInPage(page, text: string) {
  await expect(page.locator('body')).toContainText(text);
}
```

#### CSV Data Reader (`utils/readCSVData.ts`)

Manage test data from CSV files for data-driven testing:

```typescript
// filepath: utils/readCSVData.ts
import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class CSVDataReader {
  static readTestData(filePath: string): any[] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
  }

  static getDataByKey(filePath: string, key: string, value: string): any {
    const data = this.readTestData(filePath);
    return data.find(row => row[key] === value);
  }
}
```

**Sample CSV File (`data/testdata.csv`):**

```csv
carBrand,carModel,expectedPrice,testScenario
BMW,X5,60 Lakh,premium
Honda,City,8 Lakh,budget
Hyundai,Creta,10 Lakh,mid-range
Toyota,Fortuner,25 Lakh,premium
```

**Usage in Tests:**

```typescript
import { CSVDataReader } from '../utils/readCSVData';

const testData = CSVDataReader.readTestData('./data/testdata.csv');

test.describe.each(testData)('Car Search Tests', (data) => {
  test(`should find ${data.carModel}`, async ({ homePage }) => {
    await homePage.searchCar(data.carModel);
    // assertions...
  });
});
```

---

### 5. Tests (`tests/`)

**Purpose:** Define test cases using fixtures and page objects.

**Test Structure Example:**

```typescript
// filepath: tests/findnewcar-test.spec.ts
import { test, expect } from '../fixtures/page-fixtures';
import { CSVDataReader } from '../utils/readCSVData';

test.describe('CarWale - Find New Cars', () => {
  const testData = CSVDataReader.readTestData('./data/testdata.csv');

  test.beforeEach(async ({ homePage }) => {
    // Setup before each test
    await homePage.navigateToHome();
  });

  test('should display new cars page', async ({ newCarsPage }) => {
    const isVisible = await newCarsPage.isNewCarsPageVisible();
    expect(isVisible).toBeTruthy();
  });

  test.describe.each(testData)('Search tests', (data) => {
    test(`should search for ${data.carModel}`, async ({ homePage, newCarsPage }) => {
      await homePage.searchCar(data.carModel);
      const results = await newCarsPage.getCarListings();
      expect(results.length).toBeGreaterThan(0);
    });
  });

  test('should filter by price range', async ({ newCarsPage }) => {
    await newCarsPage.filterByPriceRange('5 Lakh', '15 Lakh');
    const results = await newCarsPage.getCarListings();
    expect(results.length).toBeGreaterThan(0);
  });

  test('should compare two cars', async ({ newCarsPage }) => {
    await newCarsPage.selectCar('BMW X5');
    await newCarsPage.selectCar('Mercedes S-Class');
    await newCarsPage.clickCompareButton();
    const comparisonVisible = await newCarsPage.isComparisonVisible();
    expect(comparisonVisible).toBeTruthy();
  });
});
```

**Test Best Practices:**
- One logical test per `test()` function
- Descriptive test names (what, not how)
- Use `test.describe` for test grouping
- Set up data in `beforeEach`, not in each test
- Use fixtures instead of manual setup
- Assert one primary condition per test
- Keep tests independent

---

## ⚙️ Playwright Configuration

**File:** `playwright.config.ts`

### Base Configuration

```typescript
// Base URL for all tests
baseURL: 'https://www.carwale.com',

// Global test timeout (60 seconds)
timeout: 60 * 1000,

// Expect assertion timeout
expect: { timeout: 5000 },

// Run tests in parallel
fullyParallel: true,

// Stop on first failure (optional)
forbidOnly: !!process.env.CI,

// Abort on failure percentage
maxFailures: process.env.CI ? 1 : undefined,
```

### Browser Configuration

```typescript
use: {
  // Browser name
  browserName: 'chromium',
  
  // Use Chrome distribution
  channel: 'chrome',
  
  // Run headless or headed
  headless: false,
  
  // Base URL
  baseURL: 'https://www.carwale.com',
  
  // Trace recording (on, off, or retain-on-failure)
  trace: 'on',
  
  // Video capture (on, off, or retain-on-failure)
  video: 'on',
  
  // Screenshots (on, off, or only-on-failure)
  screenshot: 'only-on-failure',
  
  // Slow down actions (ms)
  slowMo: 0,
  
  // Extra HTTP headers
  extraHTTPHeaders: {
    'Accept-Language': 'en-US',
  },
}
```

### Available Browsers

The framework supports multiple browser configurations:

```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
  // Optional: Uncomment for additional browsers
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },
]
```

### Reporters Configuration

```typescript
reporter: [
  ['html'],                           // Playwright HTML report
  ['allure-playwright'],              // Allure report
  ['json', { outputFile: 'test-results/results.json' }],
  ['junit', { outputFile: 'test-results/junit.xml' }],
  ['list'],                           // Console output
]
```

### Retry and Parallelization

```typescript
// Retry failed tests (only in CI)
retries: process.env.CI ? 2 : 0,

// Number of parallel workers
workers: process.env.CI ? 1 : undefined,

// Parallel execution settings
fullyParallel: true,
```

### Web Server Configuration

```typescript
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  timeout: 120000,
}
```

---

## ▶️ Running Tests

### Run All Tests

```bash
# Run all tests in headed mode
npm test

# Run all tests in headless mode
npx playwright test --headed=false
```

### Run Specific Test File

```bash
# Run specific test file
npx playwright test tests/findnewcar-test.spec.ts

# Run tests matching pattern
npx playwright test --grep "search"
```

### Run Tests in Specific Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit
```

### Debug Tests

```bash
# Interactive debug mode
npx playwright test --debug

# Run in debug mode with inspector
npx playwright test --debug --headed

# UI mode (visual test runner)
npx playwright test --ui
```

### Run Tests with Options

```bash
# Verbose output
npx playwright test --reporter=list

# Update snapshots
npx playwright test --update-snapshots

# Run with specific workers
npx playwright test --workers=4

# Fail on console errors
npx playwright test --reporter=list
```

---

## 📊 Test Results & Reports

### Playwright HTML Report

**Auto-generated after test run:**

```bash
# Generate and open report
npx playwright show-report

# Report location
playwright-report/index.html
```

**Report Contains:**
- Test execution summary
- Pass/fail status per test
- Execution time
- Screenshots on failure
- Video recordings
- Browser traces
- Error messages

### Allure Report

**Generate Allure Report:**

```bash
# Install Allure (if not installed)
npm install -g allure-commandline

# Generate Allure report
allure generate allure-results -o allure-report

# Open Allure report
allure open allure-report
```

**Allure Features:**
- Interactive test timeline
- Detailed failure analysis
- Test history
- Trend analysis
- Environment information

### Test Artifacts

**Location:** `test-results/` directory

```
test-results/
├── example.spec.ts-chromium/
│   ├── test-1.png              # Screenshot
│   ├── video.webm              # Video recording
│   └── trace.zip               # Browser trace
```

**Artifact Types:**
- **Screenshots** — Visual state capture
- **Videos** — Full test execution recording
- **Traces** — Detailed browser activity trace
- **Logs** — Console and network logs

---

## ✅ Best Practices

### Code Organization
- Keep page objects focused and single-purpose
- Use consistent naming conventions
- Organize locators by page/component
- Create reusable utility functions
- Use fixtures for common setup

### Test Writing
- Write descriptive test names
- Use `test.describe` for logical grouping
- Keep tests independent
- Use data-driven testing for multiple scenarios
- Avoid hard-coded delays (use waits instead)

### Locator Strategy
- Prefer data-testid attributes
- Use semantic HTML selectors
- Avoid XPath when possible
- Keep selectors simple and stable
- Document complex selectors

### Maintenance
- Update locators immediately when UI changes
- Review and refactor tests regularly
- Keep test data updated
- Monitor test flakiness
- Use version control effectively

### Performance
- Run tests in parallel when possible
- Use headless mode for CI
- Optimize wait times
- Clean up test data
- Monitor resource usage

### CI/CD Integration

**.github/workflows/playwright.yml:**

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Fixtures Guide](https://playwright.dev/docs/test-fixtures)
- [Allure Reports](https://docs.qameta.io/allure/)

---

## 🤝 Contributing

1. Create a new branch for features/fixes
2. Follow the project structure
3. Write tests for new functionality
4. Update README if adding new components
5. Submit pull request with description

---

**Last Updated:** 2024
**Framework Version:** 1.0.0
**Playwright Version:** 1.57.0+

