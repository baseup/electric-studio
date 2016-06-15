var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('ScheduleCtrl', function ($scope, $location, $route, $filter, ScheduleService, ScheduleSocketService, SharedService, BookService, UserService, SettingService, $timeout, $routeParams, BranchService) {

  $scope.schedules = {};

  ScheduleSocketService.removeCallbacks();

  ScheduleSocketService.onLoadSchedule(function(schedules) {
    $scope.schedules = schedules;
    $scope.loadingSchedules = false;
    var selectedSched = SharedService.get('selectedSched');
    if(selectedSched) {
      $timeout(function() {
        var position = $('#' + selectedSched.schedule._id).offset();
        $('html, body').scrollTop( position.top - 60 );

        SharedService.clear('selectedSched');
      });
    }
  });

  // Get the list of available branches
  BranchService.query().$promise.then(function (branches) {
    $scope.branches = branches;

    if($scope.isValidBranch(branches, $routeParams.branch)) {
      var selectedSched = SharedService.get('selectedSched');
      var isNMon = !!SharedService.get('isNMon');
      var date = selectedSched && 'date' in selectedSched ? new Date(selectedSched.date) : new Date();

      if (isNMon) {
        date.setDate(date.getDate() - 7);
      }
      SharedService.clear('isNMon');

      $scope.getWeek(date);
    } else {
      $location.path('/schedule');
    }
  });

  /**
   * @function: `isValidBranch` - checks if the schedule url is a valid branch id
   * @param: branches [Array], selectedBranch [String]
   * @return: [Boolean]
   */
  $scope.isValidBranch = function(branches, selectedBranch) {
    if(!selectedBranch || !branches.length) return false;
    var isValid = false;

    angular.forEach(branches, function(branch) {
      if(selectedBranch === branch._id) isValid = true;
    });

    return isValid;
  };


  $scope.resched = SharedService.get('resched');

  $scope.blockedBikes = {};
  SettingService.getBlockedBikes(function (bikes) {
    $scope.blockedBikes = bikes;
  });

  $scope.cancelResched = function () {
    SharedService.clear('resched');
    $location.path('/reserved');
  }

  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var week_days = ['Sunday','Monday','Tuesday','Friday','Thursday','Friday','Saturday'];

  $scope.waitlistUser = function (sched) {

    if (!$scope.loginUser) {
      $scope.$emit('notify', { message: 'Please sign up or log in to your Electric account.', duration: 3000 });
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.login-toggle').click();
      return;
    }

    $scope.$emit('notify', { message: 'Setting schedule as waitlist...', duration: 3000 });

    UserService.get(function (user) {

      $scope.loginUser = user;

      if ($scope.loginUser && $scope.loginUser.status == 'Frozen') {
        $scope.$emit('notify', { message: 'Your account is frozen. Please contact the studio for more details.', duration: 3000 });
        return;
      }

      if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
        $scope.$emit('notify', { message: 'Account is not verified, Please check your email to verify account.', duration: 3000 });
        return;
      }

      var deductCredits = 1;
      if (sched.schedule.type == 'Electric Endurance') {
        deductCredits = 2;
      }

      var book = {};
      book.date = sched.date.getFullYear() + '-' + (sched.date.getMonth()+1) + '-' + sched.date.getDate();
      book.seats = [];
      book.sched_id = sched.schedule._id;
      book.status = 'waitlisted';

      var waitlistSuccess = function () {

        if ($scope.resched) {
          SharedService.clear('resched');
        }

        $scope.$emit('notify', { message: 'You have been added to the waitlist', duration: 3000 });
        $scope.reloadUser();
        window.location = '/#/reserved'
        window.location.reload();
      }
      var waitlistFail = function (error) {
        $scope.$emit('notify', { message: error.data, duration: 3000 });
        $route.reload();
      }

      BookService.book(book).$promise.then(waitlistSuccess, waitlistFail);
    });
  }

  $scope.setSchedule = function (schedule, date, branch, nmon) {

    if (nmon == null) {
      nmon = false;
    }

    $scope.branch = branch;

    if (!$scope.chkSched(date, schedule)) {

      var deductCredits = 1;
      if (schedule.type == 'Electric Endurance') {
        deductCredits = 2;
      }

      var today = new Date();
      var time = schedule.start.split(/[^0-9]/);
      var chkDate = new Date(date);
      chkDate.setHours(time[3] - 1, time[4], 0);
      if (+today >= +chkDate) {
        $scope.$emit('notify', { message: 'Online booking closes 1 hour before class starts. Please call the studio to book this class.', duration: 3000 });
        return;
      }

      // if ($scope.weekRelease) {
      //   if (today < $scope.weekRelease.date) {
      //     var d = $scope.weekRelease;
      //     var strDate = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' +
      //                   d.getHours() + ':' + d.getMinutes() +':' +d.getSeconds();
      //     var tryDate = week_days[$scope.weekRelease.getDay()] + ' ' + $filter('formatTime')(strDate);
      //     $.Alert('Booking is not yet available, Please try again on ' + tryDate);
      //     return;
      //   }
      // }

      var cutOffchkDate = new Date(date);
      cutOffchkDate.setDate(date.getDate() - 1);
      cutOffchkDate.setHours(17, 0, 0);

      var cutOffMsg = '';
      // if (+today >= +cutOffchkDate) {
      //   cutOffMsg = 'You can no longer cancel this ride once waitlisted. Read about our studio policies <a href="#/faq" class="modal-close">here</a>.<br><br>';
      // }

      var sched = {};
      sched.date = date;
      sched.schedule = schedule;
      sched.branch = branch;

      var bfilter = {};
      bfilter.date = sched.date.getFullYear() + '-' + (sched.date.getMonth()+1) + '-' + sched.date.getDate();
      bfilter.sched_id = sched.schedule._id;
      bfilter.waitlist = true

      $scope.waitlist = BookService.query(bfilter);
      $scope.waitlist.$promise.then(function (waitlistData) {
        $scope.waitlist = waitlistData;
        if ($scope.waitlist.length > 0) {
          $.Confirm(cutOffMsg + 'This class is full. Would you like to join the waitlist?', function () {
            $scope.$apply(function () {
              $scope.waitlistUser(sched);
            });
          });
        } else {
          delete bfilter.waitlist;
          $scope.reserved = BookService.query(bfilter);
          $scope.reserved.$promise.then(function (data) {
            $scope.reserved = data;
            var seats = sched.schedule.seats;
            for (var k in $scope.blockedBikes) {
              var key = parseInt(k)
              if (key && key <= sched.schedule.seats) {
                seats -= 1;
              }
            }
            if ($scope.reserved.length >= seats) {
              $.Confirm(cutOffMsg + 'This class is full. Would you like to join the waitlist?', function () {
                $scope.$apply(function () {
                  $scope.waitlistUser(sched);
                });
              });
            } else {
              SharedService.set('selectedSched', sched);
              SharedService.set('isNMon', !!nmon);
              $location.path('/class/' + sched.schedule.branch.name.toLowerCase());
            }
          });
        }
      });
    }
  }

  $scope.chkSched = function (date, sched) {

    if (!$scope.schedules.releases[sched._id])
      return true;

    return false;
  }

  $scope.getWeek = function (date) {

    var now = date? new Date(date) : new Date();
    now.setHours(0,0,0,0);

    var pWeek = new Date(date);
    pWeek.setDate(pWeek.getDate() - pWeek.getDay() - 6);
    if (Math.ceil((now - pWeek) / (24 * 60 * 60 * 1000)) < 7) {
      now = pWeek;
    }

    var mon = new Date(now);
    mon.setDate(mon.getDate() - mon.getDay() + 1);
    $scope.monD = mon.getDate();
    $scope.monM = months[mon.getMonth()];
    $scope.monDate = mon;

    var tue = new Date(now);
    tue.setDate(tue.getDate() - tue.getDay() + 2);
    $scope.tueD = tue.getDate();
    $scope.tueM = months[tue.getMonth()];
    $scope.tueDate = tue;

    var wed = new Date(now);
    wed.setDate(wed.getDate() - wed.getDay() + 3);
    $scope.wedD = wed.getDate();
    $scope.wedM = months[wed.getMonth()];
    $scope.wedDate = wed;

    var thu = new Date(now);
    thu.setDate(thu.getDate() - thu.getDay() + 4);
    $scope.thuD = thu.getDate();
    $scope.thuM = months[thu.getMonth()];
    $scope.thuDate = thu;

    var fri = new Date(now);
    fri.setDate(fri.getDate() - fri.getDay() + 5);
    $scope.friD = fri.getDate();
    $scope.friM = months[fri.getMonth()];
    $scope.friDate = fri;

    var sat = new Date(now);
    sat.setDate(sat.getDate() - sat.getDay() + 6);
    $scope.satD = sat.getDate();
    $scope.satM = months[sat.getMonth()];
    $scope.satDate = sat;

    var sund = new Date(now);
    sund.setDate(sund.getDate() - sund.getDay() + 7);
    $scope.sunD = sund.getDate();
    $scope.sunM = months[sund.getMonth()];
    $scope.sunDate = sund;

    var n_mon = new Date(now);
    n_mon.setDate(n_mon.getDate() - n_mon.getDay() + 8);
    $scope.nmonD = n_mon.getDate();
    $scope.nmonM = months[n_mon.getMonth()];
    $scope.nmonDate = n_mon;

    var branchId = $scope.branches[0]._id;
    $scope.branchTitle = $scope.branches[0].name;
    if ($routeParams.branch) {
      branchId = $routeParams.branch;
      for(var i in $scope.branches) {
        if ($scope.branches[i]._id == branchId) {
          $scope.branchTitle = $scope.branches[i].name;
          break;
        }
      }
    }

    $scope.loadingSchedules = true;
    ScheduleSocketService.loadWeek({
      date: mon.getFullYear() + '-' + (mon.getMonth() + 1) + '-' + mon.getDate(),
      branch: branchId
    });
  }

  $scope.isFull = function (sched) {

    if (!$scope.chkSched(null, sched)) {
      var seats = sched.seats;
      for (var k in $scope.blockedBikes) {
        var key = parseInt(k)
        if (key && key <= sched.seats) {
          seats -= 1;
        }
      }
      if ($scope.schedules.counts[sched._id].books >= seats || $scope.schedules.counts[sched._id].waitlist > 0) {
        return true;
      }
    }
    return false;
  }

  $scope.nextWeek = function () {
    var now = new Date();
    var nextMonth = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());
    if ($scope.nmonDate < nextMonth) {
      $scope.getWeek($scope.nmonDate);
    }
  }
  $scope.prevWeek = function () {
    var pWeek = new Date($scope.monDate);
    pWeek.setDate(pWeek.getDate() - pWeek.getDay() - 6);

    var nowParts = $scope.schedules.now.split(/[^0-9]/);
    var now = new Date(nowParts[0], nowParts[1]-1, nowParts[2],  nowParts[3],  nowParts[4], nowParts[5]);

    if (((now - pWeek) / (24 * 60 * 60 * 1000)) < 7) {
      $scope.getWeek(pWeek);
    }
  }

});
