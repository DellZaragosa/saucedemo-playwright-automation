![Playwright Tests](https://github.com/DellZaragosa/saucedemo-playwright-automation/actions/workflows/playwright.yml/badge.svg)
# saucedemo-playwright-automation

UI test automation for SauceDemo using Playwright and JavaScript. Each test maps to a manual case in saucedemo-qa-testing.

**Status:** In progress. All 9 smoke cases and the full Login module (TC-LOGIN-001 to 015) are automated.

## Tech stack
Playwright · JavaScript · Node.js · GitHub Actions

## Setup
```bash
git clone https://github.com/DellZaragosa/saucedemo-playwright-automation.git
npm install
npx playwright install
```

## Run all tests:

```bash
npm test
```

## Run only the smoke tests:

```bash
npm run test:smoke
```

## Project structure

- `tests/` – test files, one per module, plus shared fixtures
- `pages/` – page objects (LoginPage, CheckoutPage)
- `data/` – test data such as users and checkout details

## Coverage

| Module | Manual cases | Automated | Smoke |
|---|---|---|---|
| Login | 15 | 15 | 4 |
| Products | 10 | 3 | 3 |
| Cart | 12 | 1 | 1 |
| Checkout | 14 | 1 | 1 |
| Navigation | 5 | 0 | 0 |
| **Total** | **56** | **20** | **9** |

Each test title starts with its manual case ID (for example `TC-LOGIN-003`), so tests can be matched to the cases in [saucedemo-qa-testing](https://github.com/DellZaragosa/saucedemo-qa-testing).

## Next

- Checkout validation cases (TC-CHKOUT-002 to 005)
- Cart and product list regression cases
- Page objects for the checkout and inventory pages

## Links

Manual test plan, test cases and bug reports: [saucedemo-qa-testing](https://github.com/DellZaragosa/saucedemo-qa-testing)