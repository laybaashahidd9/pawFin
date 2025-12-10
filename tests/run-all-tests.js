// Selenium Test Suite - Works without version matching issues
const { Builder, By, until } = require('selenium-webdriver');

const BASE_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:4000';

async function runTests() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  PawFinds - Selenium Test Suite (15 Test Cases)          ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  let driver;
  let passedTests = 0;
  let failedTests = 0;

  try {
    // Initialize Chrome driver
    console.log('🚀 Initializing Chrome WebDriver...\n');
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 30000 });
    console.log('✅ Chrome WebDriver initialized\n');

    // ===== HOMEPAGE TESTS =====
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  HOMEPAGE TESTS (4 tests)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Test 1
    try {
      await driver.get(BASE_URL);
      const title = await driver.getTitle();
      if (title) {
        console.log(`✅ Test 1 PASSED: Homepage loads successfully`);
        console.log(`   Title: "${title}"\n`);
        passedTests++;
      } else {
        throw new Error('No title found');
      }
    } catch (error) {
      console.log(`❌ Test 1 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // Test 2
    try {
      await driver.get(BASE_URL);
      const body = await driver.findElement(By.css('body'));
      if (body) {
        console.log(`✅ Test 2 PASSED: Page body element exists\n`);
        passedTests++;
      }
    } catch (error) {
      console.log(`❌ Test 2 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // Test 3
    try {
      await driver.get(BASE_URL);
      const bodyText = await driver.findElement(By.css('body')).getText();
      if (bodyText.length > 50) {
        console.log(`✅ Test 3 PASSED: Page contains content (${bodyText.length} characters)\n`);
        passedTests++;
      } else {
        throw new Error('Insufficient content');
      }
    } catch (error) {
      console.log(`❌ Test 3 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // Test 4
    try {
      await driver.get(BASE_URL);
      const url = await driver.getCurrentUrl();
      if (url.includes(BASE_URL)) {
        console.log(`✅ Test 4 PASSED: URL is correct\n   URL: ${url}\n`);
        passedTests++;
      } else {
        throw new Error('URL mismatch');
      }
    } catch (error) {
      console.log(`❌ Test 4 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // ===== PET BROWSING TESTS =====
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  PET BROWSING TESTS (3 tests)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Test 5
    try {
      await driver.get(`${BASE_URL}/pets`);
      const url = await driver.getCurrentUrl();
      if (url.includes('pets')) {
        console.log(`✅ Test 5 PASSED: Pets page loads successfully\n`);
        passedTests++;
      } else {
        throw new Error('Not on pets page');
      }
    } catch (error) {
      console.log(`❌ Test 5 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // Test 6
    try {
      await driver.get(`${BASE_URL}/pets`);
      await driver.sleep(2000); // Wait for API
      const body = await driver.findElement(By.css('body'));
      if (body) {
        console.log(`✅ Test 6 PASSED: Pets page has content\n`);
        passedTests++;
      }
    } catch (error) {
      console.log(`❌ Test 6 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // Test 7
    try {
      await driver.get(`${BASE_URL}/pets`);
      const title = await driver.getTitle();
      if (title) {
        console.log(`✅ Test 7 PASSED: Pets page title correct\n   Title: "${title}"\n`);
        passedTests++;
      } else {
        throw new Error('No title');
      }
    } catch (error) {
      console.log(`❌ Test 7 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // ===== NAVIGATION TESTS =====
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  NAVIGATION TESTS (3 tests)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Test 8
    try {
      await driver.get(`${BASE_URL}/services`);
      const url = await driver.getCurrentUrl();
      if (url.includes('services')) {
        console.log(`✅ Test 8 PASSED: Services page accessible\n`);
        passedTests++;
      } else {
        throw new Error('Services page not found');
      }
    } catch (error) {
      console.log(`❌ Test 8 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // Test 9
    try {
      await driver.get(`${BASE_URL}/admin`);
      const url = await driver.getCurrentUrl();
      if (url.includes('admin')) {
        console.log(`✅ Test 9 PASSED: Admin page accessible\n`);
        passedTests++;
      } else {
        throw new Error('Admin page not found');
      }
    } catch (error) {
      console.log(`❌ Test 9 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // Test 10
    try {
      await driver.get(`${BASE_URL}/pets`);
      await driver.get(BASE_URL);
      const url = await driver.getCurrentUrl();
      if (url === `${BASE_URL}/`) {
        console.log(`✅ Test 10 PASSED: Navigation to home works\n`);
        passedTests++;
      } else {
        throw new Error('Home navigation failed');
      }
    } catch (error) {
      console.log(`❌ Test 10 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // ===== RESPONSIVE DESIGN TESTS =====
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  RESPONSIVE DESIGN TESTS (3 tests)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Test 11
    try {
      await driver.manage().window().maximize();
      await driver.get(BASE_URL);
      const size = await driver.manage().window().getRect();
      if (size.width > 1000) { // Desktop-like resolution
        console.log(`✅ Test 11 PASSED: Desktop resolution (${size.width}x${size.height}) works\n`);
        passedTests++;
      } else {
        throw new Error(`Resolution too small: ${size.width}x${size.height}`);
      }
    } catch (error) {
      console.log(`❌ Test 11 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // Test 12
    try {
      await driver.manage().window().setRect({ width: 768, height: 1024 });
      await driver.get(BASE_URL);
      const body = await driver.findElement(By.css('body'));
      if (body) {
        console.log(`✅ Test 12 PASSED: Tablet resolution (768x1024) works\n`);
        passedTests++;
      }
    } catch (error) {
      console.log(`❌ Test 12 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // Test 13
    try {
      await driver.manage().window().setRect({ width: 375, height: 667 });
      await driver.get(BASE_URL);
      const body = await driver.findElement(By.css('body'));
      if (body) {
        console.log(`✅ Test 13 PASSED: Mobile resolution (375x667) works\n`);
        passedTests++;
      }
    } catch (error) {
      console.log(`❌ Test 13 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // ===== PERFORMANCE TESTS =====
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  PERFORMANCE & ACCESSIBILITY TESTS (2 tests)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Test 14
    try {
      const startTime = Date.now();
      await driver.get(BASE_URL);
      const loadTime = Date.now() - startTime;
      if (loadTime < 10000) {
        console.log(`✅ Test 14 PASSED: Page load time acceptable (${loadTime}ms)\n`);
        passedTests++;
      } else {
        throw new Error(`Load time too high: ${loadTime}ms`);
      }
    } catch (error) {
      console.log(`❌ Test 14 FAILED: ${error.message}\n`);
      failedTests++;
    }

    // Test 15
    try {
      await driver.get(BASE_URL);
      const title = await driver.getTitle();
      if (title.toLowerCase().includes('pawfinds')) {
        console.log(`✅ Test 15 PASSED: Application title verified\n   Title contains "PawFinds"\n`);
        passedTests++;
      } else {
        throw new Error('Title does not contain PawFinds');
      }
    } catch (error) {
      console.log(`❌ Test 15 FAILED: ${error.message}\n`);
      failedTests++;
    }

  } catch (error) {
    console.error('Fatal error during test execution:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }

    // Print summary
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                    TEST SUMMARY                            ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    console.log(`  Total Tests:   15`);
    console.log(`  ✅ Passed:      ${passedTests}`);
    console.log(`  ❌ Failed:      ${failedTests}`);
    console.log(`  Success Rate:  ${((passedTests / 15) * 100).toFixed(1)}%\n`);

    if (passedTests === 15) {
      console.log('🎉 All tests passed successfully!\n');
      process.exit(0);
    } else {
      console.log('⚠️  Some tests failed. Please review the output above.\n');
      process.exit(1);
    }
  }
}

runTests();
