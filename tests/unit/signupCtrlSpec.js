describe('SiteCtrl', function() {

  beforeEach(module('ngSanitize'));
  beforeEach(module('elstudio.services'));
  beforeEach(module('elstudio.controllers.site'));

  var scope, ctrl, $httpBackend;

  beforeEach( inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;

    var mockWindow = {
      location: '',
      localStorage: {
        setItem: function() {}
      }
    };

    scope.user = {};

    ctrl = _$controller_('SignUpCtrl', { $scope: scope, $window: mockWindow });
  }));

  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });



  it('should prevent submission when terms is not checked', function() {
    scope.terms = false;
    scope.signUp();

    expect(scope.signingUp).toBe(false);
  });


  it('should prevent submission when no email input', function() {
    scope.terms = true;
    scope.user = {
      email: ''
    };

    scope.signUp();

    expect(scope.signingUp).toBe(false);
  });


  it('should prevent submission when no password input', function() {
    scope.terms = true;
    scope.user = {
      email: 'john@electricstudio.ph',
      password: ''
    };

    scope.signUp();

    expect(scope.signingUp).toBe(false);
  });


  it('should prevent submission when password input is less than 6 chars', function() {
    scope.terms = true;
    scope.user = {
      email: 'john@electricstudio.ph',
      password: 'es'
    };

    scope.signUp();

    expect(scope.signingUp).toBe(false);
  });


  it('should prevent submission when password and confirm password did not match', function() {
    scope.terms = true;
    scope.user = {
      email: 'john@electricstudio.ph',
      password: 'electricstudio',
      confirm_password: 'es'
    };

    scope.signUp();

    expect(scope.signingUp).toBe(false);
  });


  it('should successfully signup new user', function() {
    scope.terms = true;
    scope.user = {
      email: 'john@electricstudio.ph',
      password: 'electricstudio',
      confirm_password: 'electricstudio'
    };

    scope.signUp();

    $httpBackend.expectPOST('/api/user').respond(200, { success: true });
    $httpBackend.expectPOST('/verify').respond(200, { success: true });
    $httpBackend.flush();

    expect(scope.registered).toBe(true);
  });


  it('should fail to signup new user', function() {
    scope.terms = true;
    scope.user = {
      email: 'john@electricstudio.ph',
      password: 'electricstudio',
      confirm_password: 'electricstudio'
    };

    scope.signUp();

    $httpBackend.expectPOST('/api/user').respond(405, 'Email already exist!');
    $httpBackend.flush();

    expect(scope.registered).toBe(false);
  });


  it('should successfully send email confirmation', function() {
    scope.sendEmailConfirmation('56d69caed19ab70f464aa60c');

    $httpBackend.expectPOST('/verify').respond(200, { success: true });
    $httpBackend.flush();
  });


  it('should fail to send an email confirmation', function() {
    scope.sendEmailConfirmation('56d69caed19ab70f464aa60c');

    $httpBackend.expectPOST('/verify').respond(404, 'User not found!');
    $httpBackend.flush();
  });

});
