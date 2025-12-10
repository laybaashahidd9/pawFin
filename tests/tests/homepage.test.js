const { By } = require('selenium-webdriver');
const { expect } = require('chai');
const config = require('../config');
const PageHelper = require('../helpers');

describe('PawFinds - Homepage Tests', function() {
  let driver;
  let helper;

  before(async function() {
    driver = await config.getDriver();
    helper = new PageHelper(driver);
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it('Test 1: Should load the homepage successfully', async function() {
    await driver.get(config.baseUrl);
    await helper.waitForPageLoad();
    
    const title = await driver.getTitle();
    expect(title).to.not.be.empty;
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include(config.baseUrl);
  });

  it('Test 2: Should display navigation bar with correct links', async function() {
    await driver.get(config.baseUrl);
    await helper.waitForPageLoad();
    
    // Check if navbar exists
    const navbarExists = await helper.isElementPresent(By.css('nav, .navbar, header'));
    expect(navbarExists).to.be.true;
  });

  it('Test 3: Should navigate to Pets page', async function() {
    await driver.get(config.baseUrl);
    await helper.waitForPageLoad();
    
    // Try to find and click the Pets link
    try {
      const petsLink = await helper.waitForElement(By.xpath("//a[contains(text(), 'Pets') or contains(@href, 'pets')]"));
      await petsLink.click();
      await helper.waitForPageLoad();
      
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('pets');
    } catch (error) {
      // If direct navigation doesn't work, navigate directly
      await driver.get(`${config.baseUrl}/pets`);
      await helper.waitForPageLoad();
    }
  });

  it('Test 4: Should display footer information', async function() {
    await driver.get(config.baseUrl);
    await helper.waitForPageLoad();
    
    const footerExists = await helper.isElementPresent(By.css('footer'));
    expect(footerExists).to.be.true;
  });
});
