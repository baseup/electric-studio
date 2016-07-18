var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  baseUrl: 'http://elstudio.dev',
  specs: [
    'tests/e2e/**/*.spec.js'
  ],
  onPrepare: function() {
    browser.driver.manage().window().setSize(1400, 800);

    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: 'tests/e2e/reports/',
        screenshotsFolder: 'screenshots',
        takeScreenshots: true
      })
    );
  },
  suites: {
    index: 'tests/e2e/index.spec.js',
    account: 'tests/e2e/account.spec.js'
  }
}
