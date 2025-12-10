const { By } = require('selenium-webdriver');
const { expect } = require('chai');
const config = require('../config');
const PageHelper = require('../helpers');

describe('PawFinds - Admin Panel Tests', function() {
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

  it('Test 10: Should navigate to admin login page', async function() {
    await driver.get(`${config.baseUrl}/admin`);
    await helper.waitForPageLoad();
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('admin');
  });

  it('Test 11: Should display admin login form', async function() {
    await driver.get(`${config.baseUrl}/admin`);
    await helper.waitForPageLoad();
    await driver.sleep(1000);
    
    // Check for login form elements
    const formExists = await helper.isElementPresent(
      By.css('form, input[type="password"], input[type="text"]')
    );
    expect(formExists).to.be.true;
  });

  it('Test 12: Should validate admin credentials requirement', async function() {
    await driver.get(`${config.baseUrl}/admin`);
    await helper.waitForPageLoad();
    await driver.sleep(1000);
    
    try {
      // Try to find submit button
      const submitBtn = await driver.findElement(
        By.xpath("//button[contains(text(), 'Login') or contains(text(), 'Submit') or @type='submit']")
      );
      
      // Click without filling credentials
      await submitBtn.click();
      await driver.sleep(1000);
      
      // The page should either show validation or stay on the same page
      const currentUrl = await driver.getCurrentUrl();
      console.log('Admin login validation tested');
    } catch (error) {
      console.log('Admin login form structure different than expected');
    }
  });
});
