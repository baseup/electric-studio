var IndexPageObject = function() {

  this.loginToggle      = element(by.css('.login-toggle'));
  this.loginForm        = element(by.css('.login-form'));
  this.loginEmail       = this.loginForm.element(by.css('[ng-model="login.email"]'));
  this.loginPassword    = this.loginForm.element(by.css('[ng-model="login.password"]'));
  this.loginSubmitBtn   = this.loginForm.element(by.css('[type="submit"]'));

  this.signupToggle     = element(by.css('.signup-toggle'));
  this.signupForm       = element(by.css('.signup-form'));
  this.signupFirstName  = this.signupForm.element(by.css('[ng-model="user.first_name"]'));
  this.signupLastName   = this.signupForm.element(by.css('[ng-model="user.last_name"]'));
  this.signupEmail      = this.signupForm.element(by.css('[ng-model="user.email"]'));
  this.signupPhone      = this.signupForm.element(by.css('[ng-model="user.phone_number"]'));
  this.signupPassword   = this.signupForm.element(by.css('[ng-model="user.password"]'));
  this.signupPassword2  = this.signupForm.element(by.css('[ng-model="user.confirm_password"]'));
  this.signupTerms      = this.signupForm.element(by.css('[for="checkTerms"]'));
  this.signupSubmitBtn  = this.signupForm.element(by.css('[type="submit"]'));

  this.user             = element(by.css('.user-loggedin'));
  this.notificationBar  = element(by.css('.notification-bar.show'));

  this.forgotPassToggle = this.loginForm.element(by.css('[ng-click="forgotPass()"]'));
  this.forgotPassModal  = element(by.css('#forgot-password-modal'));
  this.forgotPassEmail  = this.forgotPassModal.element(by.css('[ng-model="forgotPassEmail"]'));
  this.forgotPassSubmit = this.forgotPassModal.element(by.css('[ng-click="sendForgotPassEmail()"]'));


  this.showLoginForm = function() {
    this.loginToggle.click();
  };

  this.inputLoginValues = function(email, password) {
    browser.wait(protractor.ExpectedConditions.visibilityOf(this.loginForm));
    this.loginEmail.sendKeys(email);
    this.loginPassword.sendKeys(password);
  };


  this.showSignupForm = function() {
    this.signupToggle.click();
  };

  this.inputSignupValues = function(data) {
    for(var key in data) {
      var value = data[key];

      switch (key) {
        case 'first_name':
          this.signupFirstName.sendKeys(value);
          break;

        case 'last_name':
          this.signupLastName.sendKeys(value);
          break;

        case 'email':
          this.signupEmail.sendKeys(value);
          break;

        case 'phone_number':
          this.signupPhone.sendKeys(value);
          break;

        case 'password':
          this.signupPassword.sendKeys(value);
          break;

        case 'confirm_password':
          this.signupPassword2.sendKeys(value);
          break;

        default:
      }
    }
  };

};

module.exports = IndexPageObject;
