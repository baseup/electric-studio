describe('SliderService', function () {

  var SliderService, $httpBackend;

  var url = '/admin/slider';

  beforeEach(module('elstudio.services'));

  beforeEach(inject(function (_SliderService_, _$httpBackend_) {
    SliderService = _SliderService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });


  it('should check whether actions are defined', function() {
    expect(SliderService.query).toBeDefined();
  });


  it('should call `GET` method to get slider data', function() {
    var data = [
      { _id: '56fa4365d19ab71146ef8364', image: '/assets/uploads/desktop-slider.jpg', mobile_image: '/assets/uploads/mobile-slider.jpg'  },
      { _id: '56fa4475d19ab71146ef8366', image: '/assets/uploads/desktop-slider-2.jpg', mobile_image: '/assets/uploads/mobile-slider-2.jpg'  },
    ];

    spyOn(SliderService, 'query').and.callThrough();

    SliderService.query().$promise.then(function(response) {
      expect(response.length).toEqual( 2 );
    });

    $httpBackend.expectGET(url).respond(200, data);
    $httpBackend.flush();
  });

});
