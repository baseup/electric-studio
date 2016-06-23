describe('UserService', function () {

  var UserService, $httpBackend;

  var url = '/api/user';

  beforeEach(module('elstudio.services'));

  beforeEach(inject(function (_UserService_, _$httpBackend_) {
    UserService = _UserService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });


  it('should check that actions are defined', function() {
    expect(UserService.create).toBeDefined();
    expect(UserService.update).toBeDefined();
    expect(UserService.get).toBeDefined();
    expect(UserService.logout).toBeDefined();
    expect(UserService.delete).toBeDefined();
  });


  it('should call `POST` method to create a new user', function() {
    var newUser = { email: 'john@electricstudio.ph', password: 'test' };
    var data = { success: true };

    spyOn(UserService, 'create').and.callThrough();

    UserService.create( newUser ).$promise.then(function(response) {
      expect(response.success).toBe( true );
    });

    expect(UserService.create).toHaveBeenCalledWith( newUser );

    $httpBackend.expectPOST(url).respond(200, data);
    $httpBackend.flush();
  });


  it('should call `PUT` method to update existing user data', function() {
    var user = { first_name: 'Sherlock', last_name: 'Holmes', address: '221b Baker Street' };
    var data = { success: true };

    spyOn(UserService, 'update').and.callThrough();

    UserService.update( user ).$promise.then(function(response) {
      expect(response.success).toBe( true );
    });

    expect(UserService.update).toHaveBeenCalledWith( user );

    $httpBackend.expectPUT(url).respond(200, data);
    $httpBackend.flush();
  });


  it('should call `GET` method to get user data', function() {
    var userId = '56d69caed19ab70f464aa60c';
    var data = { _id: '56d69caed19ab70f464aa60c', credits: 5, status: 'Active', email: 'sherlock@gmail.com', first_name: 'Sherlock', last_name: 'Holmes', address: '221b Baker Street' };

    spyOn(UserService, 'get').and.callThrough();

    UserService.get({ userId: userId }).$promise.then(function(response) {
      expect(response._id).toBe( userId );
    });

    expect(UserService.get).toHaveBeenCalledWith({ userId: userId });

    $httpBackend.expectGET(url + '/' + userId).respond(200, data);
    $httpBackend.flush();
  });


  it('should call `GET` method to log out user', function() {
    var data = { success: true };

    spyOn(UserService, 'logout').and.callThrough();

    UserService.logout().$promise.then(function(response) {
      expect(response.success).toBe( true );
    });

    $httpBackend.expectGET(url + '/logout').respond(200, data);
    $httpBackend.flush();
  });


  it('should call `DELETE` method to delete existing user', function() {
    var data = { success: true };

    spyOn(UserService, 'delete').and.callThrough();

    UserService.delete().$promise.then(function(response) {
      expect(response.success).toBe( true );
    });

    $httpBackend.expectDELETE(url).respond(200, data);
    $httpBackend.flush();
  });

});
