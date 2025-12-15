# SauceDemo E2E Automation Framework (Playwright)

## 📌 Project Overview

This repository contains a **production-style end-to-end UI automation framework** built using **Playwright** for the SauceDemo application. The project is designed to demonstrate **real-world QA/SDET practices**, including scalable test design, Page Object Model (POM), environment-based configuration, and comprehensive positive and negative test coverage.

This project reflects hands-on upskilling in modern automation practices and mirrors how UI automation is implemented and maintained in professional QA teams.

---

## 🧪 Application Under Test

**SauceDemo** – a widely used demo e-commerce application for testing automation skills.

Tested user flows include:

* Authentication (positive & negative)
* Inventory validation
* Add-to-cart and cart management
* Checkout flow (overview → completion)
* Logout functionality

---

## 🏗️ Framework Structure

```
├── pages/                    # Page Objects (UI locators & actions)
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── CheckoutOverviewPage.js
│   ├── CheckoutCompletePage.js
│   └── LogoutPage.js
│
├── tests/                    # Test specifications
│   ├── login.spec.js
│   ├── loginNegative.spec.js
│   ├── addToCart.spec.js
│   └── addToCartNegative.spec.js
│
├── .env                      # Environment-specific configuration
├── playwright.config.js      # Playwright configuration
└── README.md
```

---

## 🧠 Design Principles & Practices

* **Page Object Model (POM)** for clean separation of test logic and UI interactions
* **Environment variables (.env)** for credentials and URLs (no hardcoding)
* **Explicit, condition-based waits** instead of static timeouts
* **Positive and negative test coverage** to validate functional and error scenarios
* **Readable, maintainable test structure** aligned with real QA automation standards

---

## ▶️ How to Run Tests

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

### Execute all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

---

## 🔐 Environment Configuration

Create a `.env` file at the root level:

```
BASE_URL=https://www.saucedemo.com/
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
```

Environment variables are consumed inside tests and page objects for flexibility across environments.

---

## 📊 What This Project Demonstrates

* Realistic E2E automation flows used in QA/SDET roles
* Strong understanding of test design, stability, and maintainability
* Hands-on Playwright experience beyond basic examples
* A portfolio-ready automation framework suitable for professional review

---

## 👤 Author

**S N**


---

## 📄 Notes

This repository is intentionally built as a **complete, finished automation project**, not a tutorial or proof-of-concept, and is intended to represent real-world QA automation practices.