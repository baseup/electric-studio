describe('AuthService', function () {

  var AuthService, $httpBackend;

  beforeEach(module('elstudio.services'));

  beforeEach(inject(function (_AuthService_, _$httpBackend_) {
    AuthService = _AuthService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });


  it('should check whether actions are defined', function() {
    expect(AuthService.getCurrentUser).toBeDefined();
  });


  it('should call `getCurrentUser` method to get logged in user data', function() {
    AuthService._user = { _id: '56d69caed19ab70f464aa60c', credits: 5, status: 'Active', email: 'sherlock@gmail.com', first_name: 'Sherlock', last_name: 'Holmes', address: '221b Baker Street' };

    spyOn(AuthService, 'getCurrentUser').and.callThrough();

    expect( AuthService.getCurrentUser()._id ).toEqual( '56d69caed19ab70f464aa60c' );
  });


  it('should call `updateCurrentUser` method to update the user data', function() {
    var user = { _id: '56d69caed19ab70f464aa60c', credits: 5, status: 'Active', email: 'sherlock@gmail.com', first_name: 'Sherlock', last_name: 'Holmes', address: '221b Baker Street' };

    spyOn(AuthService, 'updateCurrentUser').and.callThrough();

    AuthService.updateCurrentUser( user );

    expect( AuthService._user._id ).toEqual( '56d69caed19ab70f464aa60c' );
  });


  it('should call `setCurrentUser` method to get user data', function() {
    spyOn(AuthService, 'setCurrentUser').and.callThrough();

    AuthService.setCurrentUser();
  });

});
