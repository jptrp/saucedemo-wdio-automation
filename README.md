# 🚀 SauceDemo WebDriverIO Test Automation Framework

[![WebDriverIO](https://img.shields.io/badge/WebDriverIO-v8-ea5906?logo=webdriverio)](https://webdriver.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Mocha](https://img.shields.io/badge/Mocha-Test%20Framework-8D6748?logo=mocha)](https://mochajs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> A comprehensive, enterprise-grade end-to-end test automation framework built with WebDriverIO, TypeScript, and modern testing best practices.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Test Reports](#-test-reports)
- [CI/CD Integration](#-cicd-integration)
- [Best Practices](#-best-practices)
- [Contributing](#-contributing)

## ✨ Features

- 🎯 **Page Object Model (POM)** - Maintainable and scalable test architecture
- 📝 **TypeScript** - Type safety and enhanced IDE support
- 🔄 **Data-Driven Testing** - Parameterized tests with external data sources
- 📊 **Advanced Reporting** - Detailed test reports with Allure and Spec Reporter
- 🔍 **Intelligent Waits** - Custom wait utilities for reliable test execution
- 🌐 **Multi-Environment Support** - Easy configuration for different environments
- 🎨 **Code Quality** - ESLint + Prettier for consistent code style
- 🔐 **Secure Configuration** - Environment variables for sensitive data
- 🚀 **CI/CD Ready** - GitHub Actions workflow included
- 📸 **Screenshot on Failure** - Automatic visual debugging
- 🔄 **Retry Logic** - Configurable test retry for flaky test handling
- 🧪 **Multiple Test Suites** - Organized smoke, regression, and E2E tests

## 🏗 Architecture

This framework follows the **Page Object Model (POM)** design pattern with a modular architecture:

```
├── pages/              # Page Object classes
│   ├── base.page.ts    # Base page with common methods
│   └── *.page.ts       # Specific page objects
├── tests/              # Test specifications
│   ├── smoke/          # Smoke test suite
│   ├── regression/     # Regression test suite
│   └── e2e/            # End-to-end test suite
├── utils/              # Helper utilities
│   ├── waits.ts        # Custom wait strategies
│   ├── data.ts         # Test data generators
│   └── helpers.ts      # Common helper functions
├── config/             # Configuration files
│   ├── test-data/      # Test data fixtures
│   └── environments/   # Environment configs
└── reports/            # Test execution reports
```

### Design Patterns

- **Page Object Model**: Encapsulates UI interactions
- **Factory Pattern**: For test data generation
- **Singleton Pattern**: For configuration management
- **Builder Pattern**: For complex object creation

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v9.x or higher) - Comes with Node.js
- **Google Chrome** (latest stable version)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/saucedemo-wdio-automation.git
   cd saucedemo-wdio-automation
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)

   ```bash
   cp .env.example .env
   # Edit .env with your configurations
   ```

4. **Verify installation**
   ```bash
   npm test
   ```

## 🎯 Usage

### Run All Tests

```bash
npm test
```

### Run Specific Test Suite

```bash
npm run test:smoke          # Run smoke tests
npm run test:regression     # Run regression tests
npm run test:e2e            # Run end-to-end tests
```

### Run Tests by Tag

```bash
npm run test:login          # Run login-related tests
npm run test:cart           # Run cart tests
npm run test:checkout       # Run checkout tests
```

### Run in Headless Mode

```bash
npm run test:headless
```

### Run with Specific Browser

```bash
npm run test:chrome         # Chrome browser
npm run test:firefox        # Firefox browser
npm run test:edge           # Edge browser
```

### Generate and View Reports

```bash
npm run report              # Generate Allure report
npm run report:open         # Open Allure report in browser
```

### Code Quality

```bash
npm run lint                # Run ESLint
npm run lint:fix            # Fix ESLint issues
npm run format              # Format code with Prettier
```

## 📁 Project Structure

```
saucedemo-wdio-automation/
│
├── .github/
│   └── workflows/
│       └── test.yml              # GitHub Actions CI/CD
│
├── config/
│   ├── environments/
│   │   ├── dev.config.ts         # Development environment
│   │   ├── staging.config.ts     # Staging environment
│   │   └── prod.config.ts        # Production environment
│   └── test-data/
│       ├── users.json            # User test data
│       └── products.json         # Product test data
│
├── pages/
│   ├── base.page.ts              # Base page with common methods
│   ├── login.page.ts             # Login page object
│   ├── inventory.page.ts         # Inventory page object
│   ├── cart.page.ts              # Cart page object
│   └── checkout.page.ts          # Checkout page object
│
├── tests/
│   ├── smoke/
│   │   └── login.spec.ts         # Quick smoke tests
│   ├── regression/
│   │   ├── cart.spec.ts          # Cart functionality tests
│   │   └── checkout.spec.ts      # Checkout flow tests
│   └── e2e/
│       └── complete-purchase.spec.ts  # Full user journey
│
├── utils/
│   ├── waits.ts                  # Custom wait utilities
│   ├── helpers.ts                # Helper functions
│   ├── data-generator.ts         # Test data generation
│   └── logger.ts                 # Custom logger
│
├── reports/
│   └── allure-results/           # Allure report data
│
├── .env.example                  # Environment variables template
├── .eslintrc.js                  # ESLint configuration
├── .prettierrc.js                # Prettier configuration
├── .gitignore                    # Git ignore rules
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── wdio.conf.ts                  # WebDriverIO configuration
└── README.md                     # This file
```

## ⚙️ Configuration

### WebDriverIO Configuration

The main configuration is in `wdio.conf.ts`. Key settings:

```typescript
- baseUrl: Application URL
- specs: Test file patterns
- capabilities: Browser configurations
- reporters: Test report formats
- mochaOpts: Mocha test framework options
- services: Browser driver services
```

### Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://www.saucedemo.com
BROWSER=chrome
HEADLESS=false
IMPLICIT_TIMEOUT=5000
EXPLICIT_TIMEOUT=10000
```

## 📊 Test Reports

### Spec Reporter (Console)

Real-time test execution results displayed in the console.

### Allure Reports

Beautiful, detailed HTML reports with:

- Test execution timeline
- Step-by-step test details
- Screenshots on failure
- Test history and trends
- Categories and suites

View reports:

```bash
npm run report:open
```

## 🔄 CI/CD Integration

### GitHub Actions

Automated test execution on:

- Push to main/develop branches
- Pull requests
- Scheduled runs (nightly)

Pipeline includes:

- ✅ Dependency installation
- ✅ Linting and formatting checks
- ✅ Test execution
- ✅ Report generation
- ✅ Artifact upload

### Other CI Tools

The framework can be easily integrated with:

- Jenkins
- GitLab CI
- CircleCI
- Azure DevOps
- Travis CI

## 🎓 Best Practices

### 1. Page Object Model

- Keep page objects focused on a single page
- Use getters for web elements
- Implement action methods, not assertions
- Avoid test logic in page objects

### 2. Test Design

- Follow AAA pattern (Arrange, Act, Assert)
- Keep tests independent and isolated
- Use descriptive test names
- One assertion concept per test
- Implement proper test data management

### 3. Waits and Synchronization

- Avoid fixed sleeps/pauses
- Use explicit waits over implicit waits
- Implement custom wait conditions
- Handle dynamic content properly

### 4. Code Quality

- Write clean, readable code
- Follow TypeScript best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### 5. Error Handling

- Implement proper error handling
- Take screenshots on failure
- Log relevant information
- Use custom error messages

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:

- All tests pass
- Code follows style guidelines
- Commit messages are clear
- Documentation is updated

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Dustin Braun**

- GitHub: [@dustinbraun](https://github.com/dustinbraun)
- LinkedIn: [Dustin Braun](https://linkedin.com/in/dustinbraun)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📚 Resources

- [WebDriverIO Documentation](https://webdriver.io/docs/gettingstarted)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Mocha Documentation](https://mochajs.org/)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [Allure Report](https://docs.qameta.io/allure/)

## 🔮 Roadmap

- [ ] Visual regression testing
- [ ] API testing integration
- [ ] Docker containerization
- [ ] Parallel execution
- [ ] Mobile testing support
- [ ] Performance testing
- [ ] Accessibility testing
- [ ] Database validation

---

**Happy Testing! 🎉**
