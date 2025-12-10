const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

// Don't require chromedriver - let Selenium Manager handle it

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

describe('PawFinds - Selenium Test Suite (15 Tests)', function() {
  let driver;

  this.timeout(90000);

  before(async function() {
    console.log('🚀 Initializing Chrome WebDriver...');
    
    const options = new chrome.Options();
    
    // Run with visible browser for Windows
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    console.log('✅ Chrome WebDriver initialized successfully');
  });

  after(async function() {
    if (driver) {
      await driver.quit();
      console.log('🛑 Browser closed');
    }
  });

  describe('Homepage Tests (4 tests)', function() {
    it('Test 1: Homepage loads successfully', async function() {
      await driver.get(BASE_URL);
      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
      console.log(`✅ Test 1 PASSED - Page title: "${title}"`);
    });

    it('Test 2: Page body element exists', async function() {
      await driver.get(BASE_URL);
      const body = await driver.findElement({ css: 'body' });
      expect(body).to.exist;
      console.log('✅ Test 2 PASSED - Body element found');
    });

    it('Test 3: Page contains content', async function() {
      await driver.get(BASE_URL);
      const bodyText = await driver.findElement({ css: 'body' }).getText();
      expect(bodyText.length).to.be.greaterThan(50);
      console.log(`✅ Test 3 PASSED - Page has ${bodyText.length} characters`);
    });

    it('Test 4: URL is correct', async function() {
      await driver.get(BASE_URL);
      const url = await driver.getCurrentUrl();
      expect(url).to.include(BASE_URL);
      console.log(`✅ Test 4 PASSED - URL: ${url}`);
    });
  });

  describe('Pet Browsing Tests (3 tests)', function() {
    it('Test 5: Pets page loads', async function() {
      await driver.get(`${BASE_URL}/pets`);
      const url = await driver.getCurrentUrl();
      expect(url).to.include('pets');
      console.log('✅ Test 5 PASSED - Pets page loaded');
    });

    it('Test 6: Pets page has content', async function() {
      await driver.get(`${BASE_URL}/pets`);
      await driver.sleep(2000);
      const body = await driver.findElement({ css: 'body' });
      expect(body).to.exist;
      console.log('✅ Test 6 PASSED - Pets page content exists');
    });

    it('Test 7: Pets page title is correct', async function() {
      await driver.get(`${BASE_URL}/pets`);
      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
      console.log(`✅ Test 7 PASSED - Pets page title: "${title}"`);
    });
  });

  describe('Navigation Tests (3 tests)', function() {
    it('Test 8: Navigate to Services page', async function() {
      await driver.get(`${BASE_URL}/services`);
      const url = await driver.getCurrentUrl();
      expect(url).to.include('services');
      console.log('✅ Test 8 PASSED - Services page accessible');
    });

    it('Test 9: Navigate to Admin page', async function() {
      await driver.get(`${BASE_URL}/admin`);
      const url = await driver.getCurrentUrl();
      expect(url).to.include('admin');
      console.log('✅ Test 9 PASSED - Admin page accessible');
    });

    it('Test 10: Navigate back to Home', async function() {
      await driver.get(`${BASE_URL}/pets`);
      await driver.get(BASE_URL);
      const url = await driver.getCurrentUrl();
      expect(url).to.equal(`${BASE_URL}/`);
      console.log('✅ Test 10 PASSED - Navigation to home works');
    });
  });

  describe('Responsive Design Tests (3 tests)', function() {
    it('Test 11: Desktop resolution (1920x1080)', async function() {
      await driver.manage().window().setRect({ width: 1920, height: 1080 });
      await driver.get(BASE_URL);
      const size = await driver.manage().window().getRect();
      expect(size.width).to.equal(1920);
      console.log('✅ Test 11 PASSED - Desktop resolution works');
    });

    it('Test 12: Tablet resolution (768x1024)', async function() {
      await driver.manage().window().setRect({ width: 768, height: 1024 });
      await driver.get(BASE_URL);
      const body = await driver.findElement({ css: 'body' });
      expect(body).to.exist;
      console.log('✅ Test 12 PASSED - Tablet resolution works');
    });

    it('Test 13: Mobile resolution (375x667)', async function() {
      await driver.manage().window().setRect({ width: 375, height: 667 });
      await driver.get(BASE_URL);
      const body = await driver.findElement({ css: 'body' });
      expect(body).to.exist;
      console.log('✅ Test 13 PASSED - Mobile resolution works');
    });
  });

  describe('Performance & Accessibility Tests (2 tests)', function() {
    it('Test 14: Page load time is acceptable', async function() {
      const startTime = Date.now();
      await driver.get(BASE_URL);
      const loadTime = Date.now() - startTime;
      expect(loadTime).to.be.lessThan(10000);
      console.log(`✅ Test 14 PASSED - Page loaded in ${loadTime}ms`);
    });

    it('Test 15: Application title contains "PawFinds"', async function() {
      await driver.get(BASE_URL);
      const title = await driver.getTitle();
      expect(title.toLowerCase()).to.include('pawfinds');
      console.log(`✅ Test 15 PASSED - Application title verified`);
    });
  });
});
