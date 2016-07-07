var AccountPageObject = function() {

  this.accountFirstName     = element(by.css('[ng-model="account.first_name"]'));
  this.accountLastName      = element(by.css('[ng-model="account.last_name"]'));
  this.accountEmail         = element(by.css('[ng-model="account.email"]'));
  this.accountPhone         = element(by.css('[ng-model="account.phone_number"]'));
  this.accountAddress       = element(by.css('[ng-model="account.address"]'));
  this.accountAddress2      = element(by.css('[ng-model="account.address2"]'));
  this.accountContactPerson = element(by.css('[ng-model="account.contact_person"]'));
  this.accountContactNumber = element(by.css('[ng-model="account.emergency_contact"]'));
  this.accountSubmitBtn     = element(by.css('[ng-click="updateAccount()"]'));


  this.setValue = function(input, value) {
    input.clear().then(function() {
      input.sendKeys(value);
    });
  };


  this.inputAccountValues = function(data) {
    for(var key in data) {
      var value = data[key];

      switch (key) {
        case 'first_name':
          this.setValue(this.accountFirstName, value);
          break;

        case 'last_name':
          this.setValue(this.accountLastName, value);
          break;

        case 'email':
          this.setValue(this.accountEmail, value);
          break;

        case 'address':
          this.setValue(this.accountAddress, value);
          break;

        case 'address2':
          this.setValue(this.accountAddress2, value);
          break;

        case 'contact_person':
          this.setValue(this.accountContactPerson, value);
          break;

        case 'emergency_contact':
          this.setValue(this.accountContactNumber, value);
          break;

        default:
      }
    }
  };

};

module.exports = AccountPageObject;
