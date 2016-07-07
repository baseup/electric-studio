var IndexPageObject   = require('./page-objects/index.pageObject'),
    AccountPageObject = require('./page-objects/account.pageObject'),
    user              = require('./variables/user.json');


describe('Account Page', function() {

  var index           = new IndexPageObject(),
      account         = new AccountPageObject(),
      EC              = protractor.ExpectedConditions;

  beforeEach(function() {
    browser.get('/#/');
    browser.waitForAngular();
  });


  it('[19] should successfully update user info', function() {
    index.showLoginForm();
    index.inputLoginValues(user.existingUser.email, user.existingUser.password);
    index.loginSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.user ));

    browser.get('/#/account');

    account.inputAccountValues(user.existingUser);
    account.accountSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('successfully updated user information');
    });
  });

});
