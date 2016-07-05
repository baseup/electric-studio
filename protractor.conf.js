exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  baseUrl: 'http://elstudio.dev',
  specs: [
    'tests/e2e/**/*.spec.js'
  ],
  onPrepare: function() {
    browser.driver.manage().window().setSize(1400, 800);
  }
}
