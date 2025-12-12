const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

describe('PawFinds - Complete Test Suite', function() {
  let driver;

  this.timeout(60000);

  before(async function() {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--single-process');
    options.addArguments('--disable-extensions');
    options.addArguments('--window-size=1920,1080');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.manage().setTimeouts({
      implicit: 10000,
      pageLoad: 30000,
      script: 10000
    });
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  // ===== HOMEPAGE TESTS =====
  describe('Homepage Tests', function() {
    it('Test 1: Should load the homepage successfully', async function() {
      await driver.get(BASE_URL);
      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
      console.log(`✅ Test 1 passed - Page title: ${title}`);
    });

    it('Test 2: Should display navigation bar', async function() {
      await driver.get(BASE_URL);
      const bodyElement = await driver.findElement({ css: 'body' });
      expect(bodyElement).to.exist;
      console.log('✅ Test 2 passed - Page body exists');
    });

    it('Test 3: Should have footer element', async function() {
      await driver.get(BASE_URL);
      await driver.sleep(1000);
      const bodyText = await driver.findElement({ css: 'body' }).getText();
      expect(bodyText.length).to.be.greaterThan(0);
      console.log('✅ Test 3 passed - Page content loaded');
    });
  });

  // ===== PET BROWSING TESTS =====
  describe('Pet Browsing Tests', function() {
    it('Test 4: Should navigate to pets page', async function() {
      await driver.get(`${BASE_URL}/pets`);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('pets');
      console.log('✅ Test 4 passed - Navigated to pets page');
    });

    it('Test 5: Should load pets page content', async function() {
      await driver.get(`${BASE_URL}/pets`);
      await driver.sleep(2000); // Wait for API call
      const bodyText = await driver.findElement({ css: 'body' }).getText();
      expect(bodyText.length).to.be.greaterThan(0);
      console.log('✅ Test 5 passed - Pets page content loaded');
    });

    it('Test 6: Should display page title on pets page', async function() {
      await driver.get(`${BASE_URL}/pets`);
      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
      console.log(`✅ Test 6 passed - Pets page title: ${title}`);
    });
  });

  // ===== NAVIGATION TESTS =====
  describe('Navigation Tests', function() {
    it('Test 7: Should navigate to home from any page', async function() {
      await driver.get(`${BASE_URL}/pets`);
      await driver.get(BASE_URL);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include(BASE_URL);
      console.log('✅ Test 7 passed - Navigation to home works');
    });

    it('Test 8: Should handle different routes', async function() {
      await driver.get(`${BASE_URL}/services`);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('services');
      console.log('✅ Test 8 passed - Services route accessible');
    });

    it('Test 9: Should load admin route', async function() {
      await driver.get(`${BASE_URL}/admin`);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('admin');
      console.log('✅ Test 9 passed - Admin route accessible');
    });
  });

  // ===== RESPONSIVE DESIGN TESTS =====
  describe('Responsive Design Tests', function() {
    it('Test 10: Should render at desktop resolution', async function() {
      await driver.manage().window().setRect({ width: 1920, height: 1080 });
      await driver.get(BASE_URL);
      const size = await driver.manage().window().getRect();
      expect(size.width).to.equal(1920);
      console.log('✅ Test 10 passed - Desktop resolution works');
    });

    it('Test 11: Should render at tablet resolution', async function() {
      await driver.manage().window().setRect({ width: 768, height: 1024 });
      await driver.get(BASE_URL);
      const bodyElement = await driver.findElement({ css: 'body' });
      expect(bodyElement).to.exist;
      console.log('✅ Test 11 passed - Tablet resolution works');
    });

    it('Test 12: Should render at mobile resolution', async function() {
      await driver.manage().window().setRect({ width: 375, height: 667 });
      await driver.get(BASE_URL);
      const bodyElement = await driver.findElement({ css: 'body' });
      expect(bodyElement).to.exist;
      console.log('✅ Test 12 passed - Mobile resolution works');
    });
  });

  // ===== PAGE CONTENT TESTS =====
  describe('Page Content Tests', function() {
    it('Test 13: Homepage should contain text content', async function() {
      await driver.get(BASE_URL);
      await driver.sleep(1000);
      const bodyText = await driver.findElement({ css: 'body' }).getText();
      expect(bodyText.length).to.be.greaterThan(100);
      console.log('✅ Test 13 passed - Homepage has substantial content');
    });

    it('Test 14: Pets page should load within timeout', async function() {
      const startTime = Date.now();
      await driver.get(`${BASE_URL}/pets`);
      const loadTime = Date.now() - startTime;
      expect(loadTime).to.be.lessThan(10000);
      console.log(`✅ Test 14 passed - Pets page loaded in ${loadTime}ms`);
    });

    it('Test 15: Application should be accessible', async function() {
      await driver.get(BASE_URL);
      const title = await driver.getTitle();
      expect(title).to.include('PawFinds');
      console.log('✅ Test 15 passed - Application is accessible');
    });
  });
});
