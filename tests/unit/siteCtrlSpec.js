describe('SiteCtrl', function() {

  beforeEach(module('ngSanitize'));

  beforeEach(module('elstudio.services', function($provide) {
    $provide.value('amplitudeApiKey', '1a77c91810aa9471a646387c8ba8e6ba');
  }));

  beforeEach(module('elstudio.controllers.site'));


  describe('with user already logged in', function() {
    var scope, ctrl, $httpBackend;

    beforeEach( inject( function(_$rootScope_, _$controller_, _$httpBackend_) {
      scope = _$rootScope_.$new();
      $httpBackend = _$httpBackend_;

      var mockWindow = {
        location: {
          reload: function() { return true; }
        },
        href: ''
      };

      var authService = {
        getCurrentUser: function() {
          return { '_id': 3, 'email': 'john@baseup.co', 'first_name': 'John', 'last_name': 'Doe', 'status': 'Unverified' };
        }
      };

      ctrl = _$controller_('SiteCtrl', { $scope: scope, $window: mockWindow, AuthService: authService   });
    }));

    it('should check if the user is Unverified', function() {
      expect(scope.isVerified).toBe(true);
    });

  });


  describe('with user already logged in', function() {
    var scope, ctrl, $httpBackend;

    beforeEach( inject( function(_$rootScope_, _$controller_, _$httpBackend_) {
      scope = _$rootScope_.$new();
      $httpBackend = _$httpBackend_;

      var mockWindow = {
        location: {
          reload: function() { return true; }
        },
        href: ''
      };

      var authService = {
        getCurrentUser: function() {
          return { '_id': 3, 'email': 'john@baseup.co', 'first_name': 'John', 'last_name': 'Doe', 'status': 'Frozen' };
        }
      };

      ctrl = _$controller_('SiteCtrl', { $scope: scope, $window: mockWindow, AuthService: authService });
    }));


    it('should check if the user is Frozen', function() {
      expect(scope.isFrozen).toBe(true);
    });

  });


  describe('with user already logged in', function() {
    var scope, ctrl, $httpBackend;

    beforeEach( inject( function(_$rootScope_, _$controller_, _$httpBackend_) {
      scope = _$rootScope_.$new();
      $httpBackend = _$httpBackend_;

      var mockWindow = {
        location: {
          reload: function() { return true; }
        },
        localStorage: {
          removeItem: function() { }
        },
        href: ''
      };

      var authService = {
        getCurrentUser: function() {
          return { '_id': 3, 'email': 'john@baseup.co', 'first_name': 'John', 'last_name': 'Doe', 'status': 'Frozen', 'agreed_terms': null };
        }
      };

      ctrl = _$controller_('SiteCtrl', { $scope: scope, $window: mockWindow, AuthService: authService });
    }));

    afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
    });


    it('should successfully update user agreed_terms', function() {
      var user = { '_id': 3, 'email': 'john@baseup.co', 'first_name': 'John', 'last_name': 'Doe', 'status': 'Frozen', 'agreed_terms': true };

      scope.onAgreeTerms();

      $httpBackend.expectPUT('/api/user/3').respond(200);
      $httpBackend.expectGET('/api/user').respond(200, user);
      $httpBackend.flush();

      expect(scope.loginUser.agreed_terms).toBe(true);
    });


    it('should fail to update user agreed_terms', function() {
      scope.onAgreeTerms();

      $httpBackend.expectPUT('/api/user/3').respond(500);
      $httpBackend.flush();
    });


    it('should log out user successfully', function() {
      scope.logout();

      $httpBackend.expectGET('/user/logout').respond(200);
      $httpBackend.flush();
    });


    it('should fail to log out user', function() {
      scope.logout();

      $httpBackend.expectGET('/user/logout').respond(404);
      $httpBackend.flush();
    });

  });



  describe('with user is not logged in', function() {
    var scope, ctrl, $httpBackend;

    beforeEach( inject( function(_$rootScope_, _$controller_, _$httpBackend_) {
      scope = _$rootScope_.$new();
      $httpBackend = _$httpBackend_;

      var mockWindow = {
        location: {
          reload: function() { return true; },
          hash: '#/home'
        },
        localStorage: {
          getItem: function(item) {
            if(item === 'login-user') return true;
          }
        },
        href: ''
      };

      var authService = {
        getCurrentUser: function() {
          return null;
        }
      };

      ctrl = _$controller_('SiteCtrl', { $scope: scope, $window: mockWindow, AuthService: authService });
    }));


    it('should see that user is not logged in', function() {
      expect(scope.loginUser).toBe(null);
    });


    it('should set active nav', function() {
      var isNavActive = scope.activeMainNav('home', true);

      expect(isNavActive).toBe(true);
    });


    it('should show the signup form', function() {
      scope.showSignup();
    });


    it('should show the login form', function() {
      scope.toggleLogin();
    });


    it('should toggle hide the account menu dropdown', function() {
      scope.showAccountDropdown = true;
      scope.toggleAccountDropdown();
    });


    it('should toggle show the account menu dropdown', function() {
      scope.showAccountDropdown = false;
      scope.toggleAccountDropdown();
    });

  });

});
