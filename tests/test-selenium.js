// Simple test to verify Selenium WebDriver setup
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testSelenium() {
  console.log('🚀 Starting Selenium test...');
  
  const options = new chrome.Options();
  // Run in visible mode for debugging
  // options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  
  let driver;
  
  try {
    console.log('📦 Building Chrome driver...');
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    console.log('✅ Chrome driver created successfully!');
    console.log('🌐 Navigating to localhost:3000...');
    
    await driver.get('http://localhost:3000');
    
    const title = await driver.getTitle();
    console.log(`📄 Page title: ${title}`);
    
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (driver) {
      await driver.quit();
      console.log('🛑 Browser closed');
    }
  }
}

testSelenium();
