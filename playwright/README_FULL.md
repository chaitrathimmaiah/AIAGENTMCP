# Playwright Project with POM Architecture

## Overview

This is a comprehensive Playwright automation testing project for SauceDemo e-commerce platform with the following features:

### ✨ Key Features

1. **Page Object Model (POM) Architecture**
   - BasePage - Common functionality
   - LoginPage - Authentication
   - InventoryPage - Product browsing
   - CartPage - Shopping cart operations
   - CheckoutPage - Order completion

2. **Comprehensive Test Suite**
   - Login Tests (9 tests)
   - Add to Cart Tests (9 tests)
   - Checkout Tests (10 tests)
   - Combined Demo Tests (5 tests)
   - Total: 33+ tests

3. **Docker Support**
   - Dockerfile with all Playwright browsers
   - Docker Compose for test execution
   - UI Mode (port 3000)
   - Debug Mode with Inspector

4. **GitHub MCP Server**
   - Full GitHub API integration
   - 8 GitHub tools available
   - Token-based authentication

## Quick Start

### Prerequisites
- Node.js (v14+)
- Docker & Docker Compose (optional)
- Playwright (@playwright/test ^1.40.0)

### Installation

```bash
cd playwright
npm install
```

### Run Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:login        # Login tests
npm run test:addtocart    # Add to cart tests
npm run test:checkout     # Checkout tests
npm run test:pom          # All POM tests

# Run in headed mode (browser visible)
npm test -- --headed

# Run in UI mode
npm run test:ui

# Run in debug mode
npm run test:debug
```

### Docker

```bash
# Build Docker image
npm run docker:build

# Run tests in Docker
npm run docker:test

# Run in UI mode (accessible at http://localhost:3000)
npm run docker:ui

# Run in debug mode
npm run docker:debug
```

## Project Structure

```
playwright/
├── tests/
│   ├── pages/
│   │   ├── BasePage.js
│   │   ├── LoginPage.js
│   │   ├── InventoryPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   ├── utils/
│   │   └── testData.js
│   ├── login.spec.js
│   ├── addToCart.spec.js
│   ├── checkout.spec.js
│   ├── saucedemo-pom.spec.js
│   ├── POM_STRUCTURE.md
│   └── SEPARATE_TESTS_GUIDE.md
├── .mcp/
│   ├── github-mcp-server.js
│   ├── github-mcp.json
│   ├── .env (contains GitHub token)
│   ├── .env.example
│   ├── start-github-mcp.sh
│   └── start-github-mcp.ps1
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── docker-run.ps1
├── docker-run.sh
├── DOCKER_SETUP.md
├── package.json
├── playwright.config.js
├── tsconfig.json
├── README.md
└── .gitignore
```

## Test Files

### Login Tests (login.spec.js)
- Navigate to login page
- Verify page title
- Login with valid credentials
- Error handling for invalid accounts
- Field validation

### Add to Cart Tests (addToCart.spec.js)
- Add single product
- Add multiple products
- Cart count validation
- Remove items
- Navigate to cart

### Checkout Tests (checkout.spec.js)
- Proceed to checkout
- Fill checkout information
- Review order summary
- Complete purchase
- Cancel checkout
- Checkout with multiple items

## Page Objects

### BasePage
Base class with common methods:
- goto(url)
- click(selector)
- fill(selector, text)
- getText(selector)
- waitForSelector(selector)
- screenshot(path)

### LoginPage
- navigateToLoginPage()
- login(username, password)
- enterUsername(username)
- enterPassword(password)
- getErrorMessage()
- isErrorDisplayed()

### InventoryPage
- waitForPageLoad()
- addProductToCart(productId)
- getCartItemCount()
- openCart()
- getProductCount()
- removeProduct(productId)

### CartPage
- waitForPageLoad()
- getCartItemCount()
- verifyProductInCart(productName)
- removeItemFromCart(productName)
- clickCheckout()
- clickContinueShopping()

### CheckoutPage
- fillCheckoutInfo(firstName, lastName, postalCode)
- clickContinue()
- clickFinish()
- waitForOrderCompletion()
- getCompletionMessage()
- cancelCheckout()

## Test Data

Centralized test data in `utils/testData.js`:
- TEST_USERS (standard, locked out, problem, performance glitch)
- PRODUCTS (6 available products)
- CHECKOUT_INFO (default customer info)

## GitHub MCP Server

The project includes a GitHub MCP server with these tools:
- github.search-repos
- github.get-repo
- github.list-issues
- github.create-issue
- github.list-pulls
- github.get-user
- github.search-code
- github.list-commits

### Configuration

Token stored in `.mcp/.env`:
```
GITHUB_TOKEN=your_token_here
MCP_PORT=3001
GITHUB_API_URL=https://api.github.com
```

### Start Server

```bash
npm run mcp:github
# or
node .mcp/github-mcp-server.js
```

## Docker

### Dockerfile
Multi-stage build with:
- All Playwright browsers (Chromium, Firefox, WebKit)
- Node.js dependencies
- Test execution environment

### docker-compose.yml
Three services:
1. `playwright-tests` - Run test suite
2. `playwright-ui` - Interactive UI mode (port 3000)
3. `playwright-debug` - Debug mode with inspector

### Helper Scripts
- `docker-run.ps1` - PowerShell helper
- `docker-run.sh` - Bash helper

## npm Scripts

| Script | Purpose |
|--------|---------|
| `npm test` | Run all tests |
| `npm run test:ui` | Run in UI mode |
| `npm run test:debug` | Run in debug mode |
| `npm run test:headed` | Run with visible browser |
| `npm run test:login` | Run login tests |
| `npm run test:addtocart` | Run add to cart tests |
| `npm run test:checkout` | Run checkout tests |
| `npm run test:pom` | Run all POM tests |
| `npm run docker:build` | Build Docker image |
| `npm run docker:test` | Run tests in Docker |
| `npm run docker:ui` | Run UI mode in Docker |
| `npm run mcp:github` | Start GitHub MCP server |

## Configuration

### playwright.config.js
- Test directory: `./tests`
- Reporter: HTML
- Projects: Chromium, Firefox, WebKit
- Trace: on-first-retry

### tsconfig.json
TypeScript configuration for the project

## Best Practices

1. Use Page Objects for UI interactions
2. Centralize test data
3. Descriptive test names
4. Proper waits and assertions
5. Logging for debugging
6. Handle different user types
7. Validate error messages

## Troubleshooting

### Port conflicts
Change `MCP_PORT` in `.mcp/.env`

### Tests timeout
Increase timeout in playwright.config.js

### Docker issues
Ensure Docker Desktop is running

### Git issues
Make sure `.env` is in `.gitignore`

## References

- [Playwright Documentation](https://playwright.dev)
- [POM Pattern](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)
- [Docker Documentation](https://docs.docker.com)
- [GitHub API](https://docs.github.com/en/rest)

## License

ISC

## Author

Chaitrat
