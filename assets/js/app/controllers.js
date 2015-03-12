'use strict';

var ctrls = angular.module('elstudio.controllers.site', [
  'elstudio.services'
]);

ctrls.controller('NotFoundCtrl', function ($scope) {

});


ctrls.controller('SiteCtrl', function ($scope, AuthService, UserService) {

  $scope.loginUser = AuthService.getCurrentUser();
  $scope.selectedSched = null;
  
  $scope.activeMainNav = function (path) {
    return window.location.hash.indexOf('#' + path) == 0;
  }

  var login = angular.element('.header-form-container.login'),
      signup = angular.element('.header-form-container.signup'),
      book = angular.element('.book-menu'),
      loginToggle = angular.element('.login-toggle'),
      signupToggle = angular.element('.signup-toggle'),
      bookToggle = angular.element('.book-toggle'),
      menuToggle = angular.element('.menu-toggle');
    
  angular.element('.slider-container').glide({
    autoplay: 3000,
    hoverpause: false,
    arrows: false
  });

  angular.element('.fit-text span').fitText(2);


  loginToggle.off('click').on('click', function () {
    login.toggleClass('show');
    signup.add(book).removeClass('show');
  });

  signupToggle.off('click').on('click', function () {
    signup.toggleClass('show');
    login.add(book).removeClass('show');
  });

  menuToggle.off('click').click(function () {
    angular.element('.main-menu').toggleClass('show');
  });


  angular.element('.seats td').find('span').click(function () {
    angular.element('.seats td').removeClass('selected');
    if (!angular.element(this).parent('td').hasClass('unavailable')) {
      angular.element(this).parent('td').toggleClass('selected');
    }
  });

  $(window).resize(function () {
    var winH = angular.element(this).height(), 
        headerH = angular.element('.main-header').outerHeight(),
        footerH = angular.element('.main-footer').height();

    if (angular.element(this).width() >= 980) {
      angular.element('.fitscreen').find('.slide, .content-wrap').height(winH - (headerH + footerH));
    }
  }).trigger('resize');

  $scope.logout = function () {

    $.ajax({
      url: '/user/logout',
      method: 'GET',
      success: function (response) {
        window.localStorage.removeItem('login-user');
        window.location = '/';        
      },
      error: function (xhr, code, error) {
        alert(xhr.responseText);
      }
    });

  }
  
});

ctrls.controller('SignUpCtrl', function ($scope, UserService, EmailVerifyService) {

  $scope.registered = false;
  $scope.signUp = function () {
    $scope.signupError = null;
    if ($scope.user) {
      if (!$scope.user.email || $scope.user.email.length == 0) {
        $scope.signupError = 'Email Field is required';
        return;
      }
      if ($scope.user.password != $scope.user.confirm_password) {
        $scope.signupError = "Password didn't match";
        return;
      }

      var registerSuccess = function () {
        $scope.registered = true;
        $scope.sendEmailConfirmation($scope.user);
      }

      var registerFail = function (error) {
        $scope.registered = false;

        var errorMsg = error.data
        if (errorMsg.trim().indexOf(' ') === -1) {
          errorMsg = 'Field ' + errorMsg + ' is empty';
        }

        $scope.signupError = errorMsg;
      }

      UserService.create($scope.user).$promise.then(registerSuccess, registerFail);
    }
  } 

  $scope.sendEmailConfirmation = function (user) {
    $scope.sendingEmail = true;
    $scope.verificationLink = null;
    var sendEmailSuccess = function () {
      $scope.sendingEmail = false;
      alert('Successfully send email verification');
    }

    var sendEmailFailed = function (error) {
      $scope.sendingEmail = false;
      $scope.verificationLink = error.data
    }

    EmailVerifyService.email_verify(user)
                      .$promise.then(sendEmailSuccess, sendEmailFailed);
  }

});

ctrls.controller('LoginCtrl', function ($scope) {

  $scope.signIn = function () {

    if ($scope.login) {

      var email = $scope.login.email;
      var password = $scope.login.password;

      if (!email || !password) {
        $scope.signInError = 'Invalid Login Credentials.';
        return;
      }

      $.ajax({
        url: '/user/login',
        method: 'POST',
        data: {
          password: password,
          email: email
        },
        success: function (response) {
          if (response.success && response.user) {
            window.localStorage.setItem('login-user', response.user);
            window.location = '/';
          }
        },
        error: function (xhr, code, error) {
          $scope.signInError = xhr.responseText + '.';
          $scope.$apply();
        }
      });
    }

  }

});

ctrls.controller('AccountCtrl', function ($scope, $location, UserService, AuthService, UserPackageService) {


 if (!$scope.loginUser || $scope.loginUser.length == 0) {
    $location.path("/")
    angular.element("html, body").animate({ scrollTop: 0 }, "slow");
    angular.element('.login-toggle').click();
  } else {
    $scope.account = $scope.loginUser;

    $scope.transactions = UserPackageService.query();
    $scope.transactions.$promise.then(function (data) {
      $scope.transactions = data;
    });

    if ($scope.account.birthdate) {
      $scope.account.birthdate = $scope.account.birthdate.replace(' 00:00:00', '');;
    }

    $scope.updateAccount = function () {

      var addSuccess = function () {
        $scope.loginUser = AuthService.getCurrentUser();
        alert('Successfully updated user info')
      }
      var addFail = function (error) {
        alert(error.data);
      }

      UserService.update({ userId: $scope.loginUser._id }, $scope.account).$promise.then(addSuccess, addFail);
    }

    $scope.changePassword = function () {

      if ($scope.pass && $scope.pass.current_password) {

        if ($scope.pass.password != $scope.pass.confirm_password) {
          alert("Retype Password didn't match");
          return;
        }
        var addSuccess = function () {
          alert("Successfully updated your password")
          $scope.pass = null;
        }
        var addFail = function (error) {
          alert(error.data);
          $scope.pass = null;
        }
        UserService.update({ userId: $scope.loginUser._id }, $scope.pass).$promise.then(addSuccess, addFail);
      } else {
        alert('Please fill up the form')
      }

    }
  }
});

ctrls.controller('RatesCtrl', function ($scope, $http, PackageService) {

  $scope.packages = PackageService.query();
  $scope.packages.$promise.then(function (data) {
    $scope.packages = data;
  });

  var port = '';
  if (window.location.port)
    port = ':' + window.location.port;

  $scope.redirectUrl = window.location.protocol + '//' + window.location.hostname + port +'/buy';

  $scope.buyPackage = function (event) {
    if (!$scope.loginUser || $scope.loginUser.length == 0) {
      alert('User is not logged In');
      angular.element("html, body").animate({ scrollTop: 0 }, "slow");
      angular.element('.login-toggle').click();
      event.preventDefault();
    }

    if($scope.loginUser && $scope.loginUser.status == 'Unverified'){
      alert('User is Unverified, Please check your email');
      event.preventDefault();
    }
  }
})

ctrls.controller('InstructorCtrl', function ($scope, $timeout, InstructorService) {

  $scope.instructors = InstructorService.query();
  $scope.instructors.$promise.then(function (data) {
    $scope.instructors = data;
  });

  angular.element('.imgmap a').click(function () {
   var id = angular.element(this).data('target'),
       target = angular.element('#'+id);
    
    angular.element('html, body').animate({
      scrollTop : target.offset().top
    });
    
    target.find('.image').addClass('focus');
        
    $timeout(function () {
      target.find('.image').removeClass('focus');
    }, 2000);
    
  });
});


ctrls.controller('ReservedCtrl', function ($scope, $location, BookService, SharedService, UserService) {

  if (!$scope.loginUser || $scope.loginUser.length == 0) {
    $location.path("/")
    angular.element("html, body").animate({ scrollTop: 0 }, "slow");
    angular.element('.login-toggle').click();
  }else{

    $scope.reservations = BookService.query();
    $scope.reservations.$promise.then(function (data) {
      $scope.reservations = data;
    });
    $scope.user = UserService.get();
    $scope.user.$promise.then(function (data) {
      $scope.user = data;
    });

    $scope.reSched = function (book) {
      SharedService.set('resched', book);
      $location.path('/schedule');
    }

    $scope.cancelSched = function (book) {

      var today = new Date();
      var date = book.date.split(/[^0-9]/);
      var time = book.schedule.start.split(/[^0-9]/);
      var chkDate =  new Date(date[0], date[1]-1, date[2], time[3] - 1, time[4], time[5]);
      if (+today >= +chkDate) {
        alert('Schedule could not be cancelled anymore')
        return;
      }

      var confirm = window.confirm('Are you sure on cancelling schedule?')
      if (confirm) {

        var data = {};
        data.status = 'cancelled';
        
        var bookSuccess = function () {
          $scope.reservations = BookService.query();
          $scope.reservations.$promise.then(function (data) {
            $scope.reservations = data;
          });
          $scope.user = UserService.get();
          $scope.user.$promise.then(function (data) {
            $scope.user = data;
          });
        }
        var bookFail = function (error) {
          alert(error.data)
        }
        
        BookService.update({ bookId: book._id }, data).$promise.then(bookSuccess, bookFail);
      }
    }
  }
});


ctrls.controller('ScheduleCtrl', function ($scope, $location, ScheduleService, SharedService, BookService) {
  $scope.schedules = ScheduleService.query();
  $scope.schedules.$promise.then(function (data) {
    $scope.schedules = data;
  });

  $scope.reserved = BookService.query();
  $scope.reserved.$promise.then(function (data) {
    $scope.reserved = data;
  });

  $scope.resched = SharedService.get('resched');

  $scope.cancelResched = function () {
    SharedService.clear('resched');
    $location.path('/reserved');
  }

  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  $scope.setSchedule = function (schedule, date) {

    if (!$scope.chkSched(date, schedule)) {
      var sched = {};
      sched.date = date;
      sched.schedule = schedule;
      SharedService.set('selectedSched', sched);
      $location.path('/class');
    }
  }

  $scope.chkSched = function (date, sched) {

    var now = new Date();
    if (date < now)
      return true;

    if ($scope.reserved) {
      for (var i in $scope.reserved) {
        var rDate = new Date($scope.reserved[i].date);
        if ($scope.loginUser && +date === +rDate)
          if(sched && $scope.reserved[i].schedule && sched._id == $scope.reserved[i].schedule._id)
            return true;
      }
    }

    return false;
  }

  $scope.getWeek = function (date) {
    $scope.schedules = ScheduleService.query();
    $scope.schedules.$promise.then(function (data) {
      $scope.schedules = data;
    });

    $scope.reserved = BookService.query();
    $scope.reserved.$promise.then(function (data) {
      $scope.reserved = data;
    });

    var now = date? new Date(date) : new Date();
    now.setHours(0,0,0,0);

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
  }

  $scope.getWeek(new Date());
  $scope.nextWeek = function () {
    $scope.getWeek($scope.nmonDate);
  }
  $scope.prevWeek = function () {
    var pWeek = new Date($scope.monDate);
    pWeek.setDate(pWeek.getDate() - pWeek.getDay() - 1);
    $scope.getWeek(pWeek);
  }
});

ctrls.controller('ClassCtrl', function ($scope, $location, SharedService, BookService) {
  var sched = SharedService.get('selectedSched');
  if (!sched) {
    $location.path('/schedule')
  } else {

    var seat = 0;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var days = ['Monday','Tuesday','Friday','Thursday','Friday','Saturday', 'Sunday'];

    $scope.resched = SharedService.get('resched');
    
    $scope.cancelResched = function () {
      SharedService.clear('resched');
      $location.path('/reserved');
    }

    $scope.dateSched = months[sched.date.getMonth()] + ', ' + sched.date.getDate() + ' ' + sched.date.getFullYear();
    $scope.daySched = days[sched.date.getDay()];
    $scope.timeSched = sched.schedule.start;
    $scope.instructor = sched.schedule.instructor;

    var book_filter = {};
    book_filter.date = sched.date.getFullYear() + '-' + (sched.date.getMonth()+1) + '-' + sched.date.getDate();
    book_filter.sched_id = sched.schedule._id;

    $scope.forWaitlist = false;
    $scope.reserved = BookService.query(book_filter);
    $scope.reserved.$promise.then(function (data) {
      $scope.reserved = data;
      if($scope.reserved.length >= 37){
        $scope.forWaitlist = true;
      }
    });

  }

  $scope.checkSeat = function (num) {
    for (var r in $scope.reserved) {
      if ($scope.reserved[r].seat_number == num) {
        return true;
      }
    }
    return false;
  }

  $scope.setSeatNumber = function (number, event) {

    if (!$scope.checkSeat(number)) {
      seat = number;
    }else{
      seat = 0;
      event.preventDefault();
    }
  }

  $scope.bookSchedule = function () {
    
    if (!$scope.loginUser || $scope.loginUser.length == 0) {
      alert('User is not logged In');
      angular.element("html, body").animate({ scrollTop: 0 }, "slow");
      angular.element('.login-toggle').click();
      return;
    }

    if (seat == 0) {
      alert('Please pick a seat');
      return;
    }

    var book = {};
    book.date = sched.date.getFullYear() + '-' + (sched.date.getMonth()+1) + '-' + sched.date.getDate();
    book.seat = seat;
    book.sched_id = sched.schedule._id;
    if($scope.forWaitlist){
      book.status = 'waitlisted';
    }

    var bookSuccess = function () {
      if ($scope.resched) {
        SharedService.clear('resched');
      }
      $location.path('/reserved')
    }
    var bookFail = function (error) {
      alert(error.data)
    }

    if ($scope.resched == undefined) {
      BookService.book(book).$promise.then(bookSuccess, bookFail);
    }else{
      BookService.update({ bookId: $scope.resched._id }, book).$promise.then(bookSuccess, bookFail);
    }
  }
});

ctrls.controller('HistoryCtrl', function ($scope, $routeParams, HistoryService) {
  if (!$scope.loginUser || $scope.loginUser.length == 0) {
    $location.path("/")
    angular.element("html, body").animate({ scrollTop: 0 }, "slow");
    angular.element('.login-toggle').click();
  }else{

    $('#history-tabs').Tab();

    $scope.currentScheds = 0;
    $scope.currentTrans = 0;

    $scope.histories = HistoryService.query();
    $scope.histories.$promise.then(function (data) {
      $scope.histories = data;
    });

    $scope.prevScheds = function(event){
      if($scope.currentScheds > 0){
        $scope.currentScheds -= 1;
        $scope.histories = HistoryService.query({ schedPage : $scope.currentScheds });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }
      event.preventDefault();
    }

    $scope.nextScheds = function(event){
      if($scope.currentScheds < parseInt($scope.histories.schedsTotal)){
        $scope.currentScheds += 1;
        $scope.histories = HistoryService.query({ schedPage : $scope.currentScheds });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }
      event.preventDefault();
    }

    $scope.prevTrans = function(event){
      if($scope.currentTrans > 0){
        $scope.currentTrans -= 1;
        $scope.histories = HistoryService.query({ transPage : $scope.currentTrans });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }
      event.preventDefault();
    }

    $scope.nextTrans = function(event){
      if($scope.currentTrans > parseInt($scope.histories.transTotal)){
        $scope.currentTrans += 1;
        $scope.histories = HistoryService.query({ transPage : $scope.currentTrans });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }        
      event.preventDefault();
    }

  }

});