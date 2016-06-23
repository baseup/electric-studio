describe('ScheduleSocketService', function () {

  var ScheduleSocketService, $httpBackend;

  beforeEach(module('elstudio.services', function($provide) {
    var mockWebSocket = {
      connect: function() {
        return {
          onMessage: function(cb) {
            cb({ data: '{"date":"2016-6-20","branch_id":"558272c288b5c73163343c45"}' });
          },
          send: function() {}
        };
      }
    };

    $provide.value('webSocket', mockWebSocket);
  }));

  beforeEach(inject(function (_ScheduleSocketService_, _$httpBackend_) {
    ScheduleSocketService = _ScheduleSocketService_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });


  it('should check whether actions are defined', function() {
    expect(ScheduleSocketService.init).toBeDefined();
    expect(ScheduleSocketService.removeCallbacks).toBeDefined();
    expect(ScheduleSocketService.onLoadSchedule).toBeDefined();
    expect(ScheduleSocketService.loadWeek).toBeDefined();
  });


  it('should set websocket to listen to server messages', function() {
    ScheduleSocketService.init();
  });


  it('should remove current running websocket callbacks', function() {
    ScheduleSocketService.removeCallbacks();
  });


  it('should return the callback', function() {
    ScheduleSocketService.onLoadSchedule();
  });
  

  it('should return the week schedule', function() {
    var query = { branch: '558272c288b5c73163343c45', date: '6-20-2016' };
    ScheduleSocketService.loadWeek( query );
  });

});
