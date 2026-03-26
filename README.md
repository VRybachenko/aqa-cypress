# Cypress Test Automation Project

E2E test automation project built with Cypress, covering UI and API testing of a QAuto web application.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Cypress 15 | Test framework |
| Allure | Test reporting |
| Mochawesome | HTML reports |

---

## Project Structure

```
cypress/
├── e2e/
│   ├── initialHomeWork/              # Homework 1
│   ├── cypressQueriesHomeWork/       # Homework 2
│   ├── cypressAssertionsHomeWork/    # Homework 3
│   ├── сypressCliHomeWork/           # Homework 4
│   └── apiTestingHomeWork/           # Homework 5
├── pages/
│   ├── GaragePage.js
│   └── ExpensesPage.js
├── fixtures/
│   └── car.json
└── support/
    └── commands.js
```

---

## Homework Overview

### Homework 1 — Initial Setup
Basic smoke test verifying Cypress is configured and the example page loads correctly.

### Homework 2 — Cypress Queries
Tests for DOM queries and element visibility:
- Sign Up button is visible
- All 5 social media icons are visible in the footer
- Contact links (URL and mailto) are present in the footer

### Homework 3 — Cypress Assertions
Registration form validation tests:
- Required field errors on all inputs
- Min/max length validation for name fields
- Email format validation
- Password complexity and matching validation
- Register button state (disabled/enabled)
- Successful user registration flow
- Login via custom `cy.login()` command after registration

### Homework 4 — Cypress CLI
UI-based CRUD tests using Page Object Model:
- Add a car to the garage (`GaragePage`)
- Add a fuel expense to a car (`ExpensesPage`)
- Test data loaded from `fixtures/car.json`

### Homework 5 — API Testing
API interception and direct API request tests:
- Intercept `POST /api/cars`, validate status 201 and extract car ID
- Validate `GET /api/cars` contains newly created car with correct data
- Create expense via `POST /api/expenses`, validate response body
- Verify API-created expense is visible in the UI

---

## Custom Commands

| Command | Description |
|---------|-------------|
| `cy.login(email, password)` | Login via UI |
| `cy.loginByAPI()` | Login via API, sets session cookie |
| `cy.deleteAllCars()` | Delete all cars via API |
| `cy.createExpense(carId, expense)` | Create expense via API |

---

## Running Tests

```bash
# Open Cypress UI
npm run cy:open

# Run headless
npm run cy:run

# Run with Allure reporting
npm run cy:report:allure

# Run with Mochawesome reporting
npm run cy:report:mochawesome
```

---

## Running a Single Test File

### Allure report

```bash
# Run specific spec and generate Allure report
rimraf allure-results allure-report && cypress run --browser chrome --spec "cypress/e2e/apiTestingHomeWork/task1.cy.js"
npm run allure:generate && npm run allure:open
```

### Mochawesome report

```bash
# Run specific spec and generate Mochawesome report
rimraf mochawesome-report && cypress run --browser chrome --spec "cypress/e2e/apiTestingHomeWork/task1.cy.js" --reporter mochawesome --reporter-options reportDir=mochawesome-report,overwrite=false,html=false,json=true
npm run mocha:merge && npm run mocha:generate
```

Replace `cypress/e2e/apiTestingHomeWork/task1.cy.js` with the path to the desired spec file.
