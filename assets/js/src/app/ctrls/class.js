var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('ClassCtrl', function ($scope, $location, $route, $timeout, UserService, ScheduleService, SharedService, BookService, SettingService, $routeParams) {

  var sched = SharedService.get('selectedSched');

  if (!sched) $location.path('/schedule');

  $timeout(function() {
    angular.element('html, body').scrollTop(0);
  });

  $scope.backButtonPath = SharedService.get('backToInstructors') ? '#/instructors' : '#/schedule/' + sched.schedule.branch._id;
  SharedService.clear('backToInstructors');


  if (sched) {

    var seats = [];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    $scope.resched = SharedService.get('resched');

    $scope.cancelResched = function () {
      SharedService.clear('resched');
      $location.path('/reserved');
    }

    ScheduleService.get({ scheduleId: sched.schedule._id }, function (schedule) {
      sched.schedule = schedule;
      $scope.timeSched = sched.schedule.start;
      $scope.instructor = sched.schedule.instructor;
      if (sched.schedule.sub_instructor) {
        $scope.subInstructor = sched.schedule.sub_instructor;
      }
    });

    $scope.dateSched = months[sched.date.getMonth()] + ' ' + sched.date.getDate() ;
    $scope.daySched = days[sched.date.getDay()];
    $scope.timeSched = sched.schedule.start;
    $scope.sched = sched.schedule;
    $scope.instructor = sched.schedule.instructor;
    if (sched.schedule.sub_instructor) {
      $scope.subInstructor = sched.schedule.sub_instructor;
    }

    var book_filter = {};
    book_filter.date = sched.date.getFullYear() + '-' + (sched.date.getMonth()+1) + '-' + sched.date.getDate();
    book_filter.sched_id = sched.schedule._id;

    $scope.forWaitlist = false;
    $scope.reserved = BookService.query(book_filter);
    $scope.reserved.$promise.then(function (data) {
      $scope.reserved = data;
      if ($scope.reserved.length >= sched.schedule.seats) {
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
        if (sched.schedule.type == 'Electric Endurance') {
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
      if (sched.schedule.type == 'Electric Endurance') {
        deductCredits = 2;
      }

      if ($scope.loginUser && $scope.loginUser.credits < (seats.length * deductCredits)) {
        $scope.$emit('notify', { message: 'Not enough credits, you only have ' + $scope.loginUser.credits, duration: 5000, links: [{ title: 'buy', href: '#/rates' }] });
        return;
      }

      var today = new Date();

      var cutOffchkDate = new Date(sched.date);
      cutOffchkDate.setDate(sched.date.getDate() - 1);
      cutOffchkDate.setHours(17, 0, 0);

      var book = {};
      book.date = sched.date.getFullYear() + '-' + (sched.date.getMonth()+1) + '-' + sched.date.getDate();
      book.seats = seats;
      book.sched_id = sched.schedule._id;
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
