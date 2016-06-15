var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('InstructorCtrl', function ($scope, $timeout, $location, $route, UserService, InstructorService, ScheduleService, SettingService, SharedService, BookService) {

  var DAYS = ['mon','tue','wed','thu','fri','sat','sun','nmon']

  $scope.instructors = InstructorService.query();
  $scope.instructors.$promise.then(function (data) {
    $scope.instructors = data;

    $scope.randomList = [];
    $scope.selectedSched = SharedService.get('selectedSched');
    angular.forEach($scope.instructors, function(item) {
      item.rank = 0.5 - Math.random();
      $scope.randomList.push(item);

      if($scope.selectedSched && $scope.selectedSched.schedule.instructor._id === item._id) {
        $scope.viewInstructor(item);
        SharedService.clear('selectedSched');
      }
    });
  });

  $scope.blockedBikes = {};
  SettingService.getBlockedBikes(function (bikes) {
    $scope.blockedBikes = bikes;
  });

  $scope.waitlistUser = function (sched) {

    if (!$scope.loginUser) {
      $scope.$emit('notify', { message: 'Please sign up or log in to your Electric account.', duration: 3000 });
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.login-toggle').click();
      return;
    }

    $scope.$emit('notify', { message: 'Setting schedule as waitlist ...', duration: 3000 });

    UserService.get(function (user) {

      $scope.loginUser = user;

      if ($scope.loginUser && $scope.loginUser.status == 'Frozen') {
        $scope.$emit('notify', { message: 'Your account is frozen. Please contact the studio for more details.' });
        return;
      }

      if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
        $scope.$emit('notify', { message: 'Account is not verified, Please check your email to verify account.' });
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

  $scope.setSchedule = function (schedule, date, branch) {

    var parts = schedule.date.split(/[^0-9]/);
    var date =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);

    if (!$scope.chkSched(schedule)) {

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
              SharedService.set('backToInstructors', true);
              $location.path('/class/' + branch.toLowerCase());
            }
          });
        }
      });
    }
  }

  $scope.chkSched = function (sched) {

    if (!$scope.releases[sched._id])
      return true;

    return false;
  }

  $scope.isFull = function (sched) {

    if (!$scope.chkSched(sched)) {
      var seats = sched.seats;
      for (var k in $scope.blockedBikes) {
        var key = parseInt(k)
        if (key && key <= sched.seats) {
          seats -= 1;
        }
      }
      if ($scope.counts[sched._id].books >= seats || $scope.counts[sched._id].waitlist > 0) {
        return true;
      }
    }
    return false;
  }

  $scope.viewInstructor = function(data) {

    $scope.selectedInstructor = data;
    angular.element('#view-instructor-info').Modal();

    $scope.loadingSchedules = true;
    ScheduleService.query({ ins: data._id }).$promise.then(function (data) {
      $scope.releases = data.releases;
      $scope.counts = data.counts
      $scope.schedules = [];
      angular.forEach(data, function(sched, key) {
        console.log(DAYS.indexOf(key));
        if (DAYS.indexOf(key) >= 0 && sched && sched.length) {
          $scope.schedules = $scope.schedules.concat(sched);
        }
      });;
      $scope.loadingSchedules = false;

      $timeout(setScheduleSlider);
    });

    function setScheduleSlider() {
      var rows = angular.element('#view-instructor-info .schedule .row');

      $(window).resize(function() {
        var winWidth = $(this).width();
        var rowWidth = 100 / rows.length;
        var sliderWidth = rows.length * 50;
        var moveBy = 2;
        var currentSlide = 0;

        if(winWidth >= 740) {
          sliderWidth = rows.length * 25;
          moveBy = 4;
        }

        $('#view-instructor-info .schedule-slider').css('width', sliderWidth + '%');
        $('#view-instructor-info .schedule-slider .row').css('width', rowWidth + '%');

        if(rows.length <= moveBy) {
          $('#view-instructor-info .schedule').addClass('no-slide');
        } else {
          $('#view-instructor-info .schedule').removeClass('no-slide');
        }

        var arrowLeft = $('#view-instructor-info .schedule .arrow.left');
        var arrowRight = $('#view-instructor-info .schedule .arrow.right');
        var slider = $('#view-instructor-info .schedule-slider');

        hideArrows();

        $('#view-instructor-info .schedule-slider').css('margin-left', 0);

        arrowRight.click(function(e) {
          e.stopPropagation();

          if(currentSlide + moveBy >= rows.length) return;

          var slideWidth = slider.width();
          currentSlide += moveBy;
          var left = - ((slideWidth / rows.length) * currentSlide);
          slider.css('margin-left', left + 'px');

          hideArrows();
        });


        arrowLeft.click(function(e) {
          e.stopPropagation();

          if(currentSlide - moveBy < 0) return;
          var slideWidth = slider.width();
          currentSlide -= moveBy;
          var left = - ((slideWidth / rows.length) * currentSlide);
          slider.css('margin-left', left + 'px');

          hideArrows();
        });

        function hideArrows() {
          if(currentSlide - moveBy >= 0) {
            arrowLeft.removeClass('hide');
          } else {
            arrowLeft.addClass('hide');
          }

          if(currentSlide + moveBy >= rows.length) {
            arrowRight.addClass('hide');
          } else {
            arrowRight.removeClass('hide');
          }
        }

      }).trigger('resize');
    }

    $.getJSON('https://itunes.apple.com/lookup?id=' + data.albums.join(',') + '&attribute=albumTerm&entity=album&callback=?', function(data) {
      $scope.$apply(function() {
        $scope.selectedInstructor.albumList = data.results;
      });
    });

  }

  angular.element('.imgmap a').click(function () {
   var id = angular.element(this).data('target'),
       target = angular.element('#'+id).length ? angular.element('#'+id) : angular.element('#'+id.toUpperCase());

	   if(target && target.length){
	       angular.element('html, body').animate({
	         scrollTop : target.offset().top
	       });

	       target.find('.image').addClass('focus');

	       $timeout(function () {
	         target.find('.image').removeClass('focus');
	       }, 2000);
	   }

  });
});
