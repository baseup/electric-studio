var IndexPageObject = require('./page-objects/index.pageObject'),
    user            = require('./variables/user.json');


describe('Index - Homepage', function() {

  var index         = new IndexPageObject(),
      EC            = protractor.ExpectedConditions;


  beforeEach(function() {
    browser.get('/#/');
    browser.waitForAngular();

    // specs below requires no logged in user
    index.user.isPresent().then(function(isPresent) {
      if(!isPresent) return;

      index.user.click();
      index.logoutBtn.click();
      browser.wait(EC.visibilityOf( index.loginToggle ));
    });
  });


  it('[02.1] should fail to sign up due to missing email address', function() {
    index.showSignupForm();

    var newUser = Object.assign({}, user.newUser);
    delete newUser.email;
    index.inputSignupValues( newUser );

    index.signupTerms.click();
    index.signupSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('email address is required');
    });
  });


  it('[02.2] should fail to sign up due to missing first name', function() {
    index.showSignupForm();

    var newUser = Object.assign({}, user.newUser);
    delete newUser.first_name;
    index.inputSignupValues( newUser );

    index.signupTerms.click();
    index.signupSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('first name is required');
    });
  });


  it('[02.3] should fail to sign up due to missing last name', function() {
    index.showSignupForm();

    var newUser = Object.assign({}, user.newUser);
    delete newUser.last_name;
    index.inputSignupValues( newUser );

    index.signupTerms.click();
    index.signupSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('last name is required');
    });
  });


  it('[02.4] should fail to sign up due to missing password', function() {
    index.showSignupForm();

    var newUser = Object.assign({}, user.newUser);
    delete newUser.password;
    index.inputSignupValues( newUser );

    index.signupTerms.click();
    index.signupSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('password is required');
    });
  });


  it('[03.1] should fail to sign up due to invalid email', function() {
    index.showSignupForm();

    var newUser = Object.assign({}, user.newUser);
    newUser.email = 'gmail.com';
    index.inputSignupValues( newUser );

    index.signupTerms.click();
    index.signupSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('email must be valid');
    });
  });


  it('[03.2] should fail to sign up because password is less than 6 characters', function() {
    index.showSignupForm();

    var newUser = Object.assign({}, user.newUser);
    newUser.password = '1234';
    index.inputSignupValues( newUser );

    index.signupTerms.click();
    index.signupSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('password must be at least 6');
    });
  });


  it('[04] should successfully sign up new rider', function() {
    index.showSignupForm();

    index.inputSignupValues( user.newUser );

    index.signupTerms.click();
    index.signupSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    expect( index.notificationBar.element(by.css('.message')).getText() ).toContain( 'VERIFY YOUR ACCOUNT' );

    browser.pause();

    index.showLoginForm();
    index.inputLoginValues(user.newUser.email, user.newUser.password);
    index.loginSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.user ));

    expect(index.user.isPresent()).toBe(true);
  });


  it('[07] should fail to sign up due to existing email address', function() {
    index.showSignupForm();
    index.inputSignupValues(user.existingUser);
    index.signupTerms.click();
    index.signupSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('email address is already in use');
    });
  });


  it('[09] should fail to log in due incorrect password', function() {
    index.showLoginForm();
    index.inputLoginValues(user.existingUser.email, 'wrongpassword');
    index.loginSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('invalid password');
    });
  });


  it('[10] should fail to login due unregistered email address', function() {
    index.showLoginForm();
    index.inputLoginValues('unknownemailaddress@gmail.com', 'password');
    index.loginSubmitBtn.click();

    browser.wait(EC.visibilityOf( index.notificationBar ));

    index.notificationBar.element(by.css('.message')).getText().then(function(message) {
      expect(message.toLowerCase()).toContain('account doesn\'t exist');
    });
  });


  it('[16] should fail to send forgot password due to invalid email address', function() {
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
