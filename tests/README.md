# PawFinds Selenium Test Suite

## Overview
This directory contains automated Selenium tests for the PawFinds Pet Adoption System. The tests use headless Chrome and are designed to run in Docker containers, making them suitable for CI/CD pipelines including Jenkins on AWS EC2.

## Test Coverage
The test suite includes 15 automated test cases covering:

### Homepage Tests (4 tests)
1. Homepage loading
2. Navigation bar display
3. Navigation to Pets page
4. Footer information display

### Pet Browsing Tests (3 tests)
5. Pets list display
6. Pet card details rendering
7. Adoption form popup functionality

### Adoption Form Tests (2 tests)
8. Form field validation
9. Form close functionality

### Admin Panel Tests (3 tests)
10. Admin login page navigation
11. Admin login form display
12. Admin credentials validation

### Navigation & Services Tests (3 tests)
13. Services page navigation
14. Contact information display
15. Responsive design testing

## Running Tests Locally

### Prerequisites
- Node.js 18+
- Chrome browser
- ChromeDriver

### Install Dependencies
```bash
npm install
```

### Run Tests
```bash
npm test
```

### Generate HTML Report
```bash
npm run test:report
```

## Running Tests in Docker

### Build Test Container
```bash
docker-compose build selenium-tests
```

### Run Tests
```bash
docker-compose --profile testing up selenium-tests
```

## Running Tests in CI/CD (Jenkins)

The tests are configured to run in headless mode and are compatible with Jenkins pipelines on AWS EC2.

### Sample Jenkinsfile Stage
```groovy
stage('Run Selenium Tests') {
    steps {
        script {
            sh 'docker-compose --profile testing up --abort-on-container-exit selenium-tests'
        }
    }
}
```

## Configuration

Tests can be configured via environment variables:
- `BASE_URL`: Frontend URL (default: http://localhost:3000)
- `BACKEND_URL`: Backend API URL (default: http://localhost:5000)

## Test Reports

Test reports are generated in the `reports/` directory in HTML format using Mochawesome reporter.

## Technology Stack
- **Selenium WebDriver**: Browser automation
- **Mocha**: Test framework
- **Chai**: Assertion library
- **ChromeDriver**: Chrome browser driver
- **Mochawesome**: HTML test reporter
- **Headless Chrome**: For CI/CD environments
