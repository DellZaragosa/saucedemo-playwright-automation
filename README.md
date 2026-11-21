# saucedemo-playwright-automation
UI test automation for SauceDemo using Playwright and JavaScript. Each test maps to a manual case in saucedemo-qa-testing.

**Status:** In progress. All 9 smoke cases automated (login, product list, cart and checkout).

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

## Test cases
| Test | Manual case | Status |
|---|---|---|
| Login with valid credentials | TC-LOGIN-001 | Automated |
| Login fails with wrong password | TC-LOGIN-002 | Automated |
| Direct URL access without login | TC-LOGIN-014 | Automated |
| Logout returns to login page | TC-LOGIN-015 | Automated |
| Product list loads after login | TC-PROD-001 | Automated |
| Sort Price (low to high) | TC-PROD-004 | Automated |
| Add to cart button changes state | TC-PROD-009 | Automated |
| Added item appears in cart with correct details | TC-CART-001 | Automated |
| Complete a purchase with valid details | TC-CHKOUT-001 | Automated |

## Next

- Refactor repeated steps into Page Objects
- Add regression tests from the manual suite

## Links

Manual test plan, test cases and bug reports: [saucedemo-qa-testing](https://github.com/DellZaragosa/saucedemo-qa-testing)