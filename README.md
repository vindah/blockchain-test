# Blockchain - DeFi Test Automation Project

This repository contains automated tests for **API** and **UI** testing using Playwright. The project is focused on testing blockchain-related APIs and web interactions, including integration with MetaMask wallet for blockchain operations using Synpress.

The project includes tests for:
- **API Testing** – Blockchain transfer & routing APIs (Quote, Routes, Token, Tools endpoints)
- **UI Testing** – Blockchain-based web applications (Jumper protocol)
- **MetaMask Integration** – Wallet setup/connection

---

## Setup

### Prerequisites
- **Node.js** (v20.10.0 or later)
- **npm** (v10.2.1 or later)
- **.env file** with required environment variables (see [Environment Variables](#environment-variables) section)

### Clone and Install

1. Clone the repository and navigate to the project folder:
   ```bash
   git clone https://github.com/vindah/blockchain-test.git
   cd blockchain-test
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers (required for new installations):
   ```bash
   npx playwright install
   ```

### Environment Variables

Confirm and update the `.env` file in the project root with the following variables and their values:

```env
API_URL=
UI_URL = 
METAMASK_SEED_PHRASE=
METAMASK_PASSWORD=
```

### MetaMask Setup (Required for UI Tests)

Before running UI tests, you must set up the MetaMask wallet cache locally. This creates the `.cache-synpress/` folder that is required for MetaMask integration:

```bash
npx synpress setup
```

⚠️ **Important:** This step must be completed once on your local machine before running any UI tests. The cache generated is used for all subsequent UI test runs.

---

## Project Structure

```
.
├── .github/workflows/
│   └── ci-tests.yml                  # GitHub Actions CI/CD configuration
├── base/
│   ├── api-assertions.js             # Common API assertions and helpers
│   ├── base-page.js                  # Base Page Object with common utilities
│   └── fixture.js                    # Playwright fixtures setup
├── data/
│   ├── api-data/
│   │   ├── chain-data.js             # Blockchain chain IDs and token addresses
│   │   ├── quote-data.js             # Test data for Quote API
│   │   ├── routes-data.js            # Test data for Routes API
│   │   ├── tokens-data.js            # Test data for Token API
│   │   └── tools-data.js             # Test data for Tools API
│   └── ui-data/                      # UI-specific test data
├── pages/
│   ├── base-page.js                  # Base Page Object
│   ├── home-page.js                  # Home page object
│   ├── learn-page.js                 # Learn page object
│   └── missions-page.js              # Missions page object
├── setup/
│   └── metamask.setup.js             # MetaMask wallet initialization
├── tests/
│   ├── api-tests/                    # API test cases
│   │   ├── quote.spec.js             # Quote API tests
│   │   ├── routes.spec.js            # Routes API tests
│   │   ├── token.spec.js             # Token API tests
│   │   └── tools.spec.js             # Tools API tests
│   └── ui-tests/                     # UI test cases
│       └── jumper-test.spec.js       # Jumper protocol UI tests
├── utils/
│   └── device-helper.js              # Device detection utilities
├── playwright-report/                # Playwright HTML test reports (auto-generated)
├── test-results/                     # Test result artifacts (auto-generated)
├── .env                              # Environment variables (not committed)
├── .gitignore                        # Git ignore rules
├── package.json                      # Node.js dependencies and metadata
├── package-lock.json                 # Locked dependency versions
├── playwright.config.js              # Playwright configuration
└── README.md                         # Details on project
```

---

## Running Tests

### Run All Tests
Execute all API and UI tests:

```bash
npx playwright test
```

### Run API Tests Only
Execute only the API test suite:

```bash
npx playwright test tests/api-tests --project=api
```

Example to run a specific API test:
```bash
npx playwright test tests/api-tests/token.spec.js --project=api
```

### Run UI Tests Only
Execute only the UI test suite:

```bash
npx playwright test tests/ui-tests
```

### Run Tests in Headed Mode (Browser Visible)
View tests running in a visible browser window:

```bash
npx playwright test tests/ui-tests --headed --project=desktop-chrome
```

### Run Tests on Specific Devices
Tests are configured for multiple device types:

**Desktop Chrome:**
```bash
npx playwright test tests/ui-tests --project=desktop-chrome
```

**Mobile Chrome (using Pixel 7):**
```bash
npx playwright test tests/ui-tests --project=mobile-chrome
```


### Run Tests with UI Mode (Interactive)
Playwright UI mode allows you to inspect tests step-by-step:

```bash
npx playwright test --ui
```

### Debug Mode
Run tests with detailed debugging information:

```bash
npx playwright test --debug
```

---

## Viewing Test Results

### HTML Test Report
Playwright generates an interactive HTML report. After running tests, view the report:

```bash
npx playwright show-report
```

The report is automatically generated in the `playwright-report/` directory and includes:
- Test results (passed/failed/skipped)
- Execution time
- Screenshots and videos (if captured)
- Test traces for debugging

### Test Report Artifacts
- **Location:** `playwright-report/` (auto-generated)
- **Trace files:** Helpful for debugging failed tests
- **Screenshots:** Captured on test failure

---

## CI/CD Integration

### GitHub Actions
This project uses GitHub Actions for continuous integration. The workflow file (`ci-tests.yml`) is set up to run on:
- **Triggers:** Push or pull request to `main` or `master` branches

### Viewing CI Results
1. Navigate to the **Actions** tab in the GitHub repository
2. Select a workflow run from the list
3. View test results and download artifacts (HTML reports)

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Synpress MetaMask Automation](https://github.com/Synthetixio/synpress)
- [LiFi Protocol API Docs](https://li.quest)