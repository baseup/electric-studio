describe('SiteCtrl', function() {

  beforeEach(module('ngSanitize'));
  beforeEach(module('elstudio.services'));
  beforeEach(module('elstudio.controllers.site'));


  var scope, ctrl, $httpBackend;

  beforeEach( inject( function(_$rootScope_, _$controller_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;

    var mockWindow = {
      location: '',
      localStorage: {
        setItem: function() {}
      }
    };

    ctrl = _$controller_('LoginCtrl', { $scope: scope, $window: mockWindow });
  }));

  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });



  it('should show the forgot password modal', function() {
    scope.forgotPass();
  });
  

  it('should check if for empty user input', function() {
    scope.login = {
      email: null,
      password: null
    };

    scope.signIn();
  });


  it('should successfully login the user', function() {
    scope.login = {
      email: 'john@electricstudio.ph',
      password: 'test'
    };

    scope.signIn();

    $httpBackend.expectPOST('/user/login').respond(200, { success: true, user: '56d69caed19ab70f464aa60c' });
    $httpBackend.flush();
  });


  it('should fail to login the user', function() {
    scope.login = {
      email: 'john@electricstudio.ph',
      password: 'test'
    };

    scope.signIn();

    $httpBackend.expectPOST('/user/login').respond(404, 'User email is not verified!');
    $httpBackend.flush();
  });

});
