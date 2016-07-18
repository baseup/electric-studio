describe('ScheduleCtrl', function() {

  var branches = [{"_id": "558272c288b5c73163343c45", "address": null, "num_bikes": 37, "name": "BGC"}, {"_id": "570dfe63919e0c094194cdb2", "address": null, "num_bikes": 46, "name": "Salcedo"}];
  var instructor = { '_id': '56768a7188b5c71eea624cf6', 'admin': { '_id': '56768a7188b5c71eea624cf5', 'first_name': 'Lopa', 'last_name': 'Lopa' } };
  var schedules = {
    'branch_id': '558272c288b5c73163343c45',
    'wed': [{ '_id': '57675bbbd19ab7027d41b333', 'date': '2016-06-22 00:00:00', 'start': '1900-01-01 09:00:00', 'end': '1900-01-01 09:45:00', 'seats': 37, 'branch': branches[0], 'instructor': instructor, 'type': 'Pure Electric' }],
    'releases': { '57675bbbd19ab7027d41b333': true },
    'counts': { '57675bbbd19ab7027d41b333': { waitlist: 0, books: 0 } },
  };
  var user = {"_id": "56d69caed19ab70f464aa60c", "status": "", "first_name": "John", "email": "john@electricstudio.ph", "agreed_terms": true};

  beforeEach(module('ngSanitize'));
  beforeEach(module('elstudio.services'));
  beforeEach(module('elstudio.controllers.site'));

  var scope, ctrl, $httpBackend, location, routeParams, timeout;

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
      url: function() { return null },
      path: function() {}
    };

    var route = {};
    timeout = function(cb) { cb(); };

    var scheduleSocketService = {
      init: function() {},
      removeCallbacks: function() {},
      onLoadSchedule: function(cb) { cb(schedules); },
      loadWeek: function() {}
    };

    routeParams = {
      branch: '558272c288b5c73163343c45'
    };

    this.init = function() {
      ctrl = _$controller_('ScheduleCtrl', {
        $scope: scope,
        $window: mockWindow,
        $location: location,
        $timeout: timeout,
        $route: route,
        ScheduleSocketService: scheduleSocketService,
        $routeParams: routeParams
      });

      $httpBackend.expectGET('/admin/branch').respond(200, branches);
      $httpBackend.expectGET('/admin/setting/blocked_bikes').respond(200, {});
      $httpBackend.flush();
    };
  }));


  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });


  it('should check if the url is a valid branch id', function() {
    this.init();
    scope.isValidBranch(branches, '558272c288b5c73163343c45');
  });


  it('should book user successfully', function() {
    this.init();
    scope.setSchedule( schedules.wed[0], 'Mon Jun 21 2017 00:00:00 GMT+0800 (PHT)', branches[0] );

    $httpBackend.expectGET('/api/book?date=2017-6-21&sched_id=57675bbbd19ab7027d41b333&waitlist=true').respond(200, []);
    $httpBackend.expectGET('/api/book?date=2017-6-21&sched_id=57675bbbd19ab7027d41b333').respond(200, []);
    $httpBackend.flush();
  });


  it('should book user on the waitlist', function() {
    this.init();
    scope.setSchedule( schedules.wed[0], 'Mon Jun 21 2017 00:00:00 GMT+0800 (PHT)', branches[0] );

    $httpBackend.expectGET('/api/book?date=2017-6-21&sched_id=57675bbbd19ab7027d41b333&waitlist=true').respond(200, [1]);
    $httpBackend.flush();
  });


  it('should prompt when user is not logged in', function() {
    this.init();
    var sched = {
      schedule: schedules.wed[0],
      branch: schedules.wed[0].branch
    };

    scope.waitlistUser( sched );
  });


  it('should proceed to booking when user is already logged in', function() {
    scope.loginUser = user;
    scope.reloadUser = function() {};
    this.init();
    var sched = {
      schedule: schedules.wed[0],
      branch: schedules.wed[0].branch,
      date: new Date(schedules.wed[0].date)
    };

    scope.waitlistUser( sched );
    $httpBackend.expectGET('/api/user').respond(200, user);
    $httpBackend.expectPOST('/api/book').respond(200, {});
    $httpBackend.flush();
  });



  it('should check if schedule is full', function() {
    this.init();

    expect( scope.isFull(schedules.wed[0]) ).toBe(false);
  });

});
