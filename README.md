# saucedemo-playwright-automation
UI test automation for SauceDemo using Playwright and JavaScript. Each test maps to a manual case in saucedemo-qa-testing.

**Status:** In progress. Automated so far: TC-LOGIN-001, 002, 014 and 015 (login smoke).

## Tech stack
Playwright · JavaScript · Node.js · GitHub Actions

## Setup
```bash
git clone https://github.com/DellZaragosa/saucedemo-playwright-automation.git
npm install
npx playwright install chromium
```

## Run all tests:

```bash
npx playwright test
```

## Run only the smoke tests:

```bash
npx playwright test --grep @smoke
```

## Test cases
| Test | Manual case | Status |
|---|---|---|
| Login with valid credentials | TC-LOGIN-001 | Automated |
| Login fails with wrong password | TC-LOGIN-002 | Automated |
| Direct URL access without login | TC-LOGIN-014 | Automated |
| Logout returns to login page | TC-LOGIN-015 | Automated |

## Links

Manual test plan, test cases and bug reports: [saucedemo-qa-testing](https://github.com/DellZaragosa/saucedemo-qa-testing)