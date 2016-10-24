describe('ForgotPasswordService', function () {

  var ForgotPasswordService, $httpBackend;

  var url = '/fpass';

  beforeEach(module('elstudio.services'));

  beforeEach(inject(function (_ForgotPasswordService_, _$httpBackend_) {
    ForgotPasswordService = _ForgotPasswordService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });


  it('should check whether actions are defined', function() {
    expect(ForgotPasswordService.send_email).toBeDefined();
  });


  it('should call `POST` method to send password reset email', function() {
    var data = { success: true };

    spyOn(ForgotPasswordService, 'send_email').and.callThrough();

    ForgotPasswordService.send_email().$promise.then(function(response) {
      expect(response.success).toBe( true );
    });

    $httpBackend.expectPOST(url).respond(200, data);
    $httpBackend.flush();
  });

});
