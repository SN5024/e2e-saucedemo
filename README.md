# E2E Automation Framework (Playwright)

## 📌 Project Overview
This repository contains a **production-style end-to-end UI automation framework** built using Playwright for the **SauceDemo** application. It demonstrates real-world QA/SDET practices, including **scalable test design, Page Object Model (POM), environment-based configuration, and comprehensive positive & negative test coverage**.  


## 🧪 Application Under Test
**SauceDemo** – a widely used demo e-commerce application for testing automation skills.  

**Tested user flows:**
- Authentication (positive & negative)
- Inventory validation
- Add-to-cart and cart management
- Checkout flow (overview → completion)
- Logout functionality  


## 🏗️ Framework Structure
```text
├── pages/                    # Page Objects (UI locators & actions)
├── tests/                    # Test specifications
├── .env                      # Environment variables
├── playwright.config.js      # Playwright configuration
├── reports/                  # Test execution reports (HTML & Allure)
└── README.md

🧠 Design Principles
Page Object Model (POM) for clean separation of test logic and UI interactions

Environment variables (.env) for credentials and URLs

Explicit, condition-based waits instead of static timeouts

Positive and negative test coverage

Readable, maintainable test structure aligned with real QA automation standards

⚡ CI/CD Integration
GitHub Actions run tests on every push or pull request to main

Generates HTML reports and Allure reports

Supports custom reporting for advanced metrics

Sample GitHub Actions workflow:

yaml
Copy code
name: E2E Playwright Tests
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: '20' }
      - run: npm install
      - run: npx playwright install
      - run: npx playwright test --reporter=html,allure-playwright
      - run: npx allure generate reports/allure-results --clean -o reports/allure-report

▶️ How to Run Tests Locally
bash
Copy code
npm install
npx playwright install
npx playwright test
npx playwright test --headed
npx playwright test --reporter=html,allure-playwright
npx allure generate reports/allure-results --clean -o reports/allure-report

🔐 Environment Configuration
Create a .env file:

env
Copy code
BASE_URL=https://www.saucedemo.com/
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce

📊 What This Project Demonstrates
Realistic E2E automation flows

Strong test design and maintainability

Hands-on Playwright experience

CI/CD integration with GitHub Actions

Advanced reporting (HTML, custom, Allure)

Portfolio-ready QA/SDET showcase

👤 Author
S N


## 📄 Notes

This repository is intentionally built as a **complete, finished automation project**, not a tutorial or proof-of-concept, and is intended to represent real-world QA automation practices.