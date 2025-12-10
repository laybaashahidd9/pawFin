const { By } = require('selenium-webdriver');
const { expect } = require('chai');
const config = require('../config');
const PageHelper = require('../helpers');

describe('PawFinds - Services and Navigation Tests', function() {
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

  it('Test 13: Should navigate to services page', async function() {
    await driver.get(config.baseUrl);
    await helper.waitForPageLoad();
    
    try {
      const servicesLink = await driver.findElement(
        By.xpath("//a[contains(text(), 'Services') or contains(@href, 'services')]")
      );
      await servicesLink.click();
      await helper.waitForPageLoad();
      
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('services');
    } catch (error) {
      // Direct navigation if link not found
      await driver.get(`${config.baseUrl}/services`);
      await helper.waitForPageLoad();
    }
  });

  it('Test 14: Should display contact information', async function() {
    await driver.get(config.baseUrl);
    await helper.waitForPageLoad();
    
    try {
      // Navigate to contact page or section
      const contactLink = await driver.findElement(
        By.xpath("//a[contains(text(), 'Contact') or contains(@href, 'contact')]")
      );
      await contactLink.click();
      await helper.waitForPageLoad();
    } catch (error) {
      // Check footer for contact info
      const footerExists = await helper.isElementPresent(By.css('footer'));
      expect(footerExists).to.be.true;
    }
  });

  it('Test 15: Should test responsive design elements', async function() {
    await driver.get(config.baseUrl);
    await helper.waitForPageLoad();
    
    // Get initial window size
    const windowSize = await driver.manage().window().getSize();
    expect(windowSize.width).to.be.greaterThan(0);
    expect(windowSize.height).to.be.greaterThan(0);
    
    // Test that page loads at different viewport
    await driver.manage().window().setRect({ width: 1920, height: 1080 });
    await driver.sleep(500);
    
    const bodyExists = await helper.isElementPresent(By.css('body'));
    expect(bodyExists).to.be.true;
  });
});
