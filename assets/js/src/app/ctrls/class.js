var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('ClassCtrl', function ($scope, $location, $route, $timeout, UserService, ScheduleService, SharedService, BookService, SettingService, $routeParams) {

  var sched, scheduleId;
  var resched = SharedService.get('resched');

  if(resched) {
    sched = SharedService.get('selectedSched');
    scheduleId = sched.schedule._id;
    $scope.resched = resched;
  } else {
    sched = 'scheduleId' in $routeParams ? $routeParams.scheduleId : null;
    scheduleId = sched;
  }

  if (!sched) $location.path('/schedule');

  $timeout(function() {
    angular.element('html, body').scrollTop(0);
  });


  if (sched) {

    var seats = [];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    $scope.cancelResched = function () {
      SharedService.clear('resched');
      $location.path('/reserved');
    }

    ScheduleService.get({ scheduleId: scheduleId }, function (schedule) {
      $scope.backButtonPath = SharedService.get('backToInstructors') ? '#/instructors' : '#/schedule/' + schedule.branch._id;
      SharedService.clear('backToInstructors');

      var parts = schedule.date.split(/[^0-9]/);
      var date =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);

      $scope.dateSched = months[date.getMonth()] + ' ' + date.getDate() ;
      $scope.daySched = days[date.getDay()];
      $scope.timeSched = schedule.start;
      $scope.sched = schedule;
      $scope.instructor = schedule.instructor;
      if (schedule.sub_instructor) {
        $scope.subInstructor = schedule.sub_instructor;
      }

      var book_filter = {};
      book_filter.date = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
      book_filter.sched_id = schedule._id;

      $scope.forWaitlist = false;
      $scope.reserved = BookService.query(book_filter);
      $scope.reserved.$promise.then(function (data) {
        $scope.reserved = data;
        if ($scope.reserved.length >= schedule.seats) {
          $scope.forWaitlist = true;
        }
      });

      book_filter.waitlist = true
      $scope.waitlist = BookService.query(book_filter);
      $scope.waitlist.$promise.then(function (waitlistData) {
        $scope.waitlist = waitlistData;
        if ($scope.waitlist.length > 0) {
          $scope.forWaitlist = true;
        }
      });
    });

    $scope.blockedBikes = {};
    SettingService.getBlockedBikes(function (bikes) {
      $scope.blockedBikes = bikes;
    });
  }

  $scope.checkSeat = function (num) {
    if ($scope.forWaitlist) {
      return true;
    }

    if ($scope.blockedBikes && $scope.blockedBikes[num]) {
      return true;
    }

    for (var r in $scope.reserved) {
      if ($scope.reserved[r].seat_number == num) {
        return true;
      }
    }
    return false;
  }

  $scope.setSeatNumber = function (number, event) {

    var seat_index = -1;
    for (var i = 0; i < seats.length; i++) {
      if (seats[i] === number) {
        seat_index = i;
      }
    }
    if (!$scope.checkSeat(number)) {
      if (seat_index == -1) {

        var deductCredits = 1;
        if ($scope.sched.type == 'Electric Endurance') {
          deductCredits = 2;
        }

        if ($scope.loginUser &&
            ((!seats.length && deductCredits > $scope.loginUser.credits) ||
             (seats.length * deductCredits) >= $scope.loginUser.credits)) {
          $scope.$emit('notify', { message: 'Not enough credits', duration: 5000, links: [{ title: 'buy', href: '#/rates' }] });
          return;
        } else {
          angular.element(event.target).toggleClass('selected');
          seats.push(number);
        }
      } else {
        angular.element(event.target).toggleClass('selected');
        seats.splice(seat_index, 1);
      }
    } else {
      event.preventDefault();
    }
  }

  $scope.booking = false;
  $scope.bookSchedule = function () {

    if (!$scope.loginUser) {
      $scope.$emit('notify', { message: 'Please sign up or log in to your Electric account.', duration: 3000 });
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.login-toggle').click();
      return;
    }

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

      if (!$scope.forWaitlist && seats.length == 0) {
        $scope.$emit('notify', { message: 'Please select your bike.', duration: 3000 });
        return;
      }

      var deductCredits = 1;
      if ($scope.sched.type == 'Electric Endurance') {
        deductCredits = 2;
      }

      if ($scope.loginUser && $scope.loginUser.credits < (seats.length * deductCredits)) {
        $scope.$emit('notify', { message: 'Not enough credits, you only have ' + $scope.loginUser.credits, duration: 5000, links: [{ title: 'buy', href: '#/rates' }] });
        return;
      }

      var today = new Date();
      var parts = $scope.sched.date.split(/[^0-9]/);
      var cutOffchkDate = new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
      cutOffchkDate.setDate(cutOffchkDate.getDate() - 1);
      cutOffchkDate.setHours(17, 0, 0);

      var book = {};
      var date = new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
      book.date = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
      book.seats = seats;
      book.sched_id = $scope.sched._id;
      var str_seats = seats.sort(function(a, b){return a-b}) + '';
      str_seats = str_seats.replace(/,/g, ', ');
      var confirm_message = 'You are about to book bike'+ (seats.length > 1 ? 's' : '') + ' # ' + str_seats +
                            ' for ' + $scope.daySched + ', ' + $scope.dateSched + '.';
      var cutOffMsg = '';
      if (+today >= +cutOffchkDate) {
        cutOffMsg = 'You can no longer cancel this ride once a booking is made. Read about our studio policies <a href="#/faq" class="modal-close">here</a>.<br/><br/>'
      }

      if ($scope.forWaitlist) {
        confirm_message = "You're about to join the waitlist for this schedule " + $scope.daySched + ', ' + $scope.dateSched;
        book.status = 'waitlisted';
      }

      $.Confirm(cutOffMsg+confirm_message, function () {
        $scope.$emit('notify', { message: 'Booking bike' + (seats.length > 1 ? 's' : '' ) + ' ...', duration: 3000 });
        $scope.booking = true;
        var bookSuccess = function () {

          if ($scope.resched) {
            SharedService.clear('resched');
          }

          if ($scope.forWaitlist) {
            $scope.$emit('notify', { message: 'You have been added to the waitlist', duration: 3000 });
          } else {
            $scope.$emit('notify', { message: 'You have successfully booked a ride.', duration: 3000 });
          }
          UserService.get(function (user) {
            $scope.reloadUser();
            window.location = '/#/reserved'
            window.location.reload();
          });
        }
        var bookFail = function (error) {
          $scope.$emit('notify', { message: error.data, duration: 3000 });
          $scope.reloadUser();
          $route.reload();
        }

        if ($scope.resched == undefined) {
          BookService.book(book).$promise.then(bookSuccess, bookFail);
        } else {
          BookService.update({ bookId: $scope.resched._id }, book).$promise.then(bookSuccess, bookFail);
        }
      });
    });
  }

});
