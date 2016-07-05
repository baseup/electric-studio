var fs              = require('fs'),
    takeScreenshot  = require('./utils/screenshot'),
    IndexPageObject = require('./page-objects/index.pageObject'),
    user            = require('./variables/user.json');


describe('Index - Homepage', function() {

  var index         = new IndexPageObject(),
      EC            = protractor.ExpectedConditions,
      screenshotName;

  beforeEach(function() {
    browser.get('/#/');
    browser.waitForAngular();
  });


  afterEach(function() {
    takeScreenshot(screenshotName);
  });


  it('[07] should fail to sign up due to existing email address', function() {
    screenshotName = '[07] should fail to sign up due to existing email address';

    index.showSignupForm();
    index.inputSignupValues(user.existingUser);
    index.signupTerms.click();
    index.signupSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    expect(index.notificationBar.isPresent()).toBe(true);

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('email address is already in use');
    });
  });


  it('[09] should fail to log in due incorrect password', function() {
    screenshotName = '[09] should fail to log in due incorrect password';

    index.showLoginForm();
    index.inputLoginValues(user.existingUser.email, 'wrongpassword');
    index.loginSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('invalid password');
    });
  });


  it('[10] should fail to login due unregistered email address', function() {
    screenshotName = '[10] should fail to login due unregistered email address';

    index.showLoginForm();
    index.inputLoginValues('unknownemailaddress@gmail.com', 'password');
    index.loginSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('account doesn\'t exist');
    });
  });


  it('[16] should fail to send forgot password due to invalid email address', function() {
    screenshotName = '[16] should fail to send forgot password due to invalid email address';

    index.showLoginForm();
    browser.wait(EC.elementToBeClickable( index.forgotPassToggle ));
    index.forgotPassToggle.click();

    browser.wait(EC.visibilityOf( index.forgotPassModal ));

    index.forgotPassEmail.sendKeys('unknownemailaddress@gmail.com');
    index.forgotPassSubmit.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('no user found');
    });
  });

});
