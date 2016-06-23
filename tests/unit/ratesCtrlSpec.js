var packages = [{"_id": "55879aa288b5c704e5df6804", "description": "First Timer Package", "fee": "1500.00", "special_package": false, "credits": 5, "name": "First Timer Package", "first_timer": true, "expiration": 30}];
var user = {"_id": "56d69caed19ab70f464aa60c", "status": "Active", "first_name": "John", "email": "john@electricstudio.ph", "agreed_terms": true};

describe('RatesCtrl', function() {

  beforeEach(module('ngSanitize'));
  beforeEach(module('elstudio.services', function($provide) {
    $provide.value('amplitudeApiKey', '1a77c91810aa9471a646387c8ba8e6ba');
  }));
  beforeEach(module('elstudio.controllers.site'));

  var scope, ctrl, $httpBackend, location;

  beforeEach( inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;

    var mockWindow = {
      location: '',
      localStorage: {
        setItem: function() {}
      },

    };

    location = {
      search: function() { return { s: null }; },
      url: function() { return null }
    };

    scope.loginUser = user;

    this.init = function() {
      ctrl = _$controller_('RatesCtrl', { $scope: scope, $window: mockWindow, $location: location });

      $httpBackend.expectGET('/api/package').respond(200, packages);
      $httpBackend.flush();
    };
  }));


  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });




  it('should show the paypal return error', function() {
    location.search = function(item, value) {
      return { s: 'error'};
    };

    this.init();
  });


  it('should show the paypal return message', function() {
    location.search = function(item, value) {
      return { msg: 'Not enough PayPal balance!'};
    };

    this.init();
  });


  describe('buying ride package', function() {

    it('should allow user to buy the selected package', function() {
      scope.loginUser = user;
      this.init();
      scope.buyPackage('55879aa288b5c704e5df6804');
    });


    it('should prompt when user is not logged in', function() {
      scope.loginUser = null;

      this.init();
      scope.buyPackage('55879aa288b5c704e5df6804');
    });


    it('should prompt when user account is frozen', function() {
      scope.loginUser.status = 'Frozen';

      this.init();
      scope.buyPackage('55879aa288b5c704e5df6804');
    });


    it('should prompt when user account is not yet verified', function() {
      scope.loginUser.status = 'Unverified';

      this.init();
      scope.buyPackage('55879aa288b5c704e5df6804');
    });

  });



  describe('checking gift card value', function() {

    it('should prevent submission when given pin is not a number', function() {
      scope.gcPin = '1a3b42';
      this.init();
      scope.checkGCValue();
    });


    it('should prevent submission when there is no gift card code input', function() {
      scope.gcPin = '1342';
      scope.gcCode = '';
      this.init();
      scope.checkGCValue();
    });


    it('should return the gift card data', function() {
      scope.gcPin = '1342';
      scope.gcCode = 'ad2aud';
      this.init();
      scope.checkGCValue();

      $httpBackend.expectPOST('/redeem_gc').respond(200, packages[0]);
      $httpBackend.flush();

      expect(scope.checkGCData.name).toEqual(packages[0].name);
    });


    it('should return an error', function() {
      scope.gcPin = '1342';
      scope.gcCode = 'ad2aud';
      this.init();
      scope.checkGCValue();

      $httpBackend.expectPOST('/redeem_gc').respond(404, 'Invalid gift card combination');
      $httpBackend.flush();
    });

  });



  describe('redeeming a gift card', function() {
    it('should prompt when user is not logged in', function() {
      scope.loginUser = null;

      this.init();
      scope.redeemGC('55879aa288b5c704e5df6804');
    });

    it('should prevent submission when given pin is not a number', function() {
      scope.gcPin = '1a3b42';
      this.init();
      scope.redeemGC();
    });

    it('should prevent submission when there is no gift card code input', function() {
      scope.gcPin = '1342';
      scope.gcCode = '';
      this.init();
      scope.redeemGC();
    });

    it('should redeem the gift card', function() {
      scope.gcPin = '1342';
      scope.gcCode = 'ad2aud';
      scope.reloadUser = function() { return user };
      this.init();
      scope.redeemGC();

      $httpBackend.expectPOST('/redeem_gc').respond(200, { success: true });
      $httpBackend.expectGET('/api/user').respond(200, user);
      $httpBackend.flush();
    });

    it('should return an error', function() {
      scope.gcPin = '1342';
      scope.gcCode = 'ad2aud';
      this.init();
      scope.redeemGC();

      $httpBackend.expectPOST('/redeem_gc').respond(404, 'Invalid gift card!');
      $httpBackend.flush();
    });
  });


  it('should show the next gift card package base on the list', function() {
    this.init();
    scope.nextGCPackage();
    expect(scope.selectedGCPackageIndex).toEqual(0);
  });


  it('should show the previous gift card package base on the list', function() {
    this.init();
    scope.prevGCPackage();
    expect(scope.selectedGCPackageIndex).toEqual(0);
  });



  describe('buying a gift card package', function() {

    it('should prevent submission when there is no receiver email', function() {
      scope.selectedGCPackage = packages[0];
      this.init();
      scope.buyGC();
    });

    it('should successfully purchase selected gift card', function() {
      this.init();
      scope.selectedGCPackage = packages[0];
      scope.gcReceiver = 'john@electricstudio.ph';
      scope.gcSender = 'jane@electricstudio.ph';
      scope.emailTo = 'sender';
      scope.buyGC();
    });

  });

});
