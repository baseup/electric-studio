'use strict';

var ctrls = angular.module('elstudio.controllers.site', [
  'elstudio.services'
]);

ctrls.controller('NotFoundCtrl', function ($scope) {

});


ctrls.controller('SiteCtrl', function ($scope, AuthService, UserService) {

  $scope.loginUser = AuthService.getCurrentUser();
  if (!$scope.loginUser) {
    UserService.get(function (user) {
      $scope.loginUser = user;
    })
  }

  $scope.isVerified = false;
  if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
    $scope.user = $scope.loginUser;
    $scope.isVerified = true;
  }

  $scope.isFrozen = false;
  if ($scope.loginUser && $scope.loginUser.status == 'Frozen') {
    $scope.isFrozen = true;
  }

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
    
  
  angular.element('.datepicker').pickadate({
    format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd',
    today: false
  });

  angular.element('.fit-text span').fitText(2);
  
  angular.element('.close-btn').click(function () {
    var headerForm = angular.element(this).closest(login.add(signup));
    
    headerForm.removeClass('show');
  });


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
        $.Alert(xhr.responseText);
      }
    });

  }
  
});

ctrls.controller('SliderCtrl', function ($scope, $timeout, SliderService) {
  $scope.sliders = SliderService.query();
  $scope.sliders.$promise.then(function (data) {
    $scope.sliders = data;

    $timeout(function () {

      var glideObj = angular.element('.slider-container').glide({
        autoplay: 3000,
        hoverpause: false,
        arrows: false
      }).data('api_glide');

      var win = angular.element(window);
      var winH = win.height(), 
        headerH = angular.element('.main-header').outerHeight(),
        footerH = angular.element('.main-footer').height();

      //preload images
      $timeout(function () {
        angular.forEach(angular.element('.slider .preloaded-img'), function (value, key) {
          var img = angular.element(value);
          var src = img.attr('src');
          
          if (img[0].complete) {
            img.parent().css({backgroundImage : 'url('+src+')'}).removeClass('loading');
            img.remove();
          }
        });
      }, 300);

      if (win.width() >= 980) {
        angular.element('.fitscreen').find('.slide, .content-wrap').height(winH - (headerH + footerH));    
      }

      if (!angular.element('.slider > li').css('width')) {
        // if (glideObj) {
          glideObj.reinit();
        // }
      }

      win.trigger('resize');
    }, 400);

  });
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

      if ($scope.user.password && $scope.user.password.length < 6) {
        $scope.signupError = "Password must be 6 characters";
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
      $.Alert('Successfully sent email verification');
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

  $scope.forgotPass = function () {
    angular.element('#forgot-password-modal').Modal();
  }

  $scope.signIn = function () {
    $scope.unverifiedLogin = false;
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
          if (xhr.responseText.indexOf('User email is not verified') > -1) {
            $scope.user = {};
            $scope.user.email = email;
            $scope.unverifiedLogin = true;
          }
          $scope.signInError = xhr.responseText + '.';
          $scope.$apply();
        }
      });
    }

  }

});

ctrls.controller('ForgotPasswordCtrl', function ($scope, ForgotPasswordService, UserService) {

  $scope.resetPassword = function (id) {

    if ($scope.pass && $scope.pass.password && $scope.pass.password.length > 0) {

      if ($scope.pass.password != $scope.pass.confirm_password) {
        $.Alert("Retype Password didn't match");
        return;
      }

      var account = {}
      account.reset_password = $scope.pass.password;

      var addSuccess = function () {
        $.Alert('Successfully updated password')
      }

      var addFail = function (error) {
        $.Alert(error.data);
      }

      UserService.update({ userId: id }, account).$promise.then(addSuccess, addFail);
    } else {
      $.Alert('Input passwords cannot be empty.');
    }
  }

  $scope.sendForgotPassEmail = function () {
    if ($scope.forgotPassEmail && $scope.forgotPassEmail.length > 0) {
      var user = {};
      user.email = $scope.forgotPassEmail;
      var sendEmailSuccess = function () {
        $.Alert('Successfully sent email for reset password confirmation');
      }

      var sendEmailFailed = function (error) {
        $.Alert(error.data);
      }

      ForgotPasswordService.send_email(user)
                      .$promise.then(sendEmailSuccess, sendEmailFailed);
      $scope.forgotPassEmail = null;
    } else {
      $.Alert('Input email address cannot be empty.');
    }
  }
});

ctrls.controller('AccountCtrl', function ($scope, $location, UserService, AuthService, UserPackageService) {

  var qstring = $location.search();
  if (qstring.s) {
    if (qstring.s == 'success' && qstring.pname) {
      $.Alert('Success! You have bought ' + qstring.pname);
    } else if (qstring.s == 'exists') {
      $.Alert('Transaction already exists');
    }
    $location.search({ s: null, pname: null });
  }

 if (!$scope.loginUser) {
    $location.path("/")
    angular.element("html, body").animate({ scrollTop: 0 }, "slow");
    angular.element('.login-toggle').click();
  } else {
    $scope.account = $scope.loginUser;
    $scope.billing = {};

    if ($scope.account.billing && $scope.account.billing != 'null') { 
      $scope.billing = JSON.parse($scope.account.billing);
    }

    $scope.transactions = UserPackageService.query();
    $scope.transactions.$promise.then(function (data) {
      $scope.transactions = data;
    });

    if ($scope.account.birthdate) {
      $scope.account.birthdate = $scope.account.birthdate.replace(' 00:00:00', '');;
    }

    $scope.updateAccount = function () {

      var addSuccess = function () {
        AuthService.setCurrentUser();
        $scope.loginUser = AuthService.getCurrentUser();
        if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
          $scope.user = $scope.loginUser;
          $scope.isVerified = true;
        }
        $.Alert('Successfully updated user info')
      }
      var addFail = function (error) {
        $.Alert(error.data);
      }

      UserService.update({ userId: $scope.loginUser._id }, $scope.account).$promise.then(addSuccess, addFail);
    }

    $scope.changePassword = function () {

      if ($scope.pass && $scope.pass.current_password) {

        if ($scope.pass.password != $scope.pass.confirm_password) {
          $.Alert("Retype Password didn't match");
          return;
        }
        var addSuccess = function () {
          $.Alert("Successfully updated your password")
          $scope.pass = null;
        }
        var addFail = function (error) {
          $.Alert(error.data);
          $scope.pass = null;
        }
        UserService.update({ userId: $scope.loginUser._id }, $scope.pass).$promise.then(addSuccess, addFail);
      } else {
        $.Alert('Please fill up the form')
      }

    }

    $scope.updateBilling = function () {
      if ($scope.billing) {
        var billingSuccess = function () {
          $.Alert("Successfully updated billing information");
        }

        var billingFail = function (error) {
          $.Alert(error.data)
        }
        UserService.update({ userId: $scope.loginUser._id }, { billing: $scope.billing }).$promise.then(billingSuccess, billingFail);
      }
    }
  }
});

ctrls.controller('RatesCtrl', function ($scope, $http, $location, UserService, PackageService) {

  var qstring = $location.search();
  if (qstring.s == 'error') {
    $.Alert('Transaction failed');
    $location.search('s', null);
  }

  $scope.packages = PackageService.query();
  $scope.packages.$promise.then(function (data) {
    $scope.packages = data;
  });

  var port = '';
  if (window.location.port)
    port = ':' + window.location.port;

  $scope.redirectUrl = window.location.protocol + '//' + window.location.hostname + port +'/buy';

  $scope.buyPackage = function (event, index) {

    if (!$scope.loginUser) {
      $.Alert('User is not logged In');
      angular.element("html, body").animate({ scrollTop: 0 }, "slow");
      angular.element('.login-toggle').click();
      return;
    }

    UserService.get(function (user) {
      
      $scope.loginUser = user;

      if ($scope.loginUser && $scope.loginUser.status == 'Frozen') {
        $.Alert('Account is frozen, Please check your contact adminstrator');
        return;
      }

      if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
        $.Alert('User is Unverified, Please check your email');
        return;
      }

      angular.element('#payForm-' + index).submit();

    });
  }
});

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

  if (!$scope.loginUser) {
    $location.path("/")
    angular.element("html, body").animate({ scrollTop: 0 }, "slow");
    angular.element('.login-toggle').click();
  } else {

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
        $.Alert('Schedule could not be cancelled anymore')
        return;
      }

      $.Confirm('Are you sure on cancelling schedule?', function () {
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
          $.Alert(error.data)
        }
        
        BookService.update({ bookId: book._id }, data).$promise.then(bookSuccess, bookFail);
      });
    }
  }
});


ctrls.controller('ScheduleCtrl', function ($scope, $location, ScheduleService, SharedService, BookService) {
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
    var parts = sched.start.split(/[^0-9]/);
    var dTime =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
    var hours = dTime.getHours();
    var minutes = dTime.getMinutes();
    date.setHours(hours - 1, minutes, 0, 0);
    if (date < now)
      return true;

    var next7Days = new Date(now.getFullYear(), now.getMonth(), now.getDate()+8);
    if (date > next7Days) 
      return true;

    return false;
  }

  $scope.getWeek = function (date) {

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

    $scope.schedules = ScheduleService.query({ date: mon.getFullYear() + '-' + (mon.getMonth()+1) + '-' + mon.getDate() });
    $scope.schedules.$promise.then(function (data) {
      $scope.schedules = data;
    });

  }

  $scope.getWeek(new Date());
  $scope.nextWeek = function () {
    var now = new Date();
    // var nextMonth = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());
    // if ($scope.nmonDate < nextMonth) {
      $scope.getWeek($scope.nmonDate);
    // }
  }
  $scope.prevWeek = function () {
    var pWeek = new Date($scope.monDate);
    pWeek.setDate(pWeek.getDate() - pWeek.getDay() - 1);

    var now = new Date();
    now.setDate(now.getDate() - now.getDay() + 1);

    if (pWeek > now) {
      $scope.getWeek(pWeek);
    }
  }
});

ctrls.controller('ClassCtrl', function ($scope, $location, $route, UserService, SharedService, BookService) {
  var sched = SharedService.get('selectedSched');
  if (!sched) {
    $location.path('/schedule')
  } else {

    var seats = [];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var days = ['Sunday','Monday','Tuesday','Friday','Thursday','Friday','Saturday'];

    $scope.resched = SharedService.get('resched');
    
    $scope.cancelResched = function () {
      SharedService.clear('resched');
      $location.path('/reserved');
    }

    $scope.dateSched = months[sched.date.getMonth()] + ' ' + sched.date.getDate() + ' ' + sched.date.getFullYear();
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
      if ($scope.reserved.length >= 37) {
        $scope.forWaitlist = true;
      }
    });

    book_filter.waitlist = true
    $scope.waitlist = BookService.query(book_filter);
    $scope.waitlist.$promise.then(function (waitlist_data) {
      $scope.waitlist = waitlist_data;
      if ($scope.waitlist.length > 0) {
        $scope.forWaitlist = true;
      }
    });

  }

  $scope.checkSeat = function (num) {
    if ($scope.forWaitlist) {
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
        seats.push(number);
      } else {
        seats.splice(seat_index, 1);
      }
    } else {
      event.preventDefault();
    }
  }

  $scope.bookSchedule = function () {

    if (!$scope.loginUser) {
      $.Alert('User is not logged In');
      angular.element("html, body").animate({ scrollTop: 0 }, "slow");
      angular.element('.login-toggle').click();
      return;
    }

    UserService.get(function (user) {
      $scope.loginUser = user;

      if ($scope.loginUser && $scope.loginUser.status == 'Frozen') {
        $.Alert('Account is frozen, Please check your contact adminstrator');
        return;
      }

      if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
        $.Alert('User is Unverified, Please check your email');
        return;
      }

      if (!$scope.forWaitlist && seats.length == 0) {
        $.Alert('Please pick a seat');
        return;
      }

      var book = {};
      book.date = sched.date.getFullYear() + '-' + (sched.date.getMonth()+1) + '-' + sched.date.getDate();
      book.seats = seats;
      book.sched_id = sched.schedule._id;
      var confirm_message = 'Your about to book a ride on ' + 
                            $scope.daySched + ', ' + $scope.dateSched + ' with seat'+ (seats.length > 1 ? 's' : '') +' number ' + seats;
      if ($scope.forWaitlist) {
        confirm_message = 'Your about to join the waitlist for this schedule ' + $scope.daySched + ', ' + $scope.dateSched;
        book.status = 'waitlisted';
      }

      $.Confirm(confirm_message, function () {

        var bookSuccess = function () {
          if ($scope.resched) {
            SharedService.clear('resched');
          }
          $location.path('/reserved')
        }
        var bookFail = function (error) {
          $.Alert(error.data)
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

ctrls.controller('HistoryCtrl', function ($scope, $routeParams, HistoryService) {
  if (!$scope.loginUser) {
    $location.path("/")
    angular.element("html, body").animate({ scrollTop: 0 }, "slow");
    angular.element('.login-toggle').click();
  } else {

    $('#history-tabs').Tab();

    $scope.currentScheds = 0;
    $scope.currentTrans = 0;

    $scope.histories = HistoryService.query();
    $scope.histories.$promise.then(function (data) {
      $scope.histories = data;
    });

    $scope.prevScheds = function (event) {
      if ($scope.currentScheds > 0) {
        $scope.currentScheds -= 1;
        $scope.histories = HistoryService.query({ schedPage : $scope.currentScheds });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }
      event.preventDefault();
    }

    $scope.nextScheds = function (event) {
      if ($scope.currentScheds < parseInt($scope.histories.schedsTotal)) {
        $scope.currentScheds += 1;
        $scope.histories = HistoryService.query({ schedPage : $scope.currentScheds });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }
      event.preventDefault();
    }

    $scope.prevTrans = function (event) {
      if ($scope.currentTrans > 0) {
        $scope.currentTrans -= 1;
        $scope.histories = HistoryService.query({ transPage : $scope.currentTrans });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }
      event.preventDefault();
    }

    $scope.nextTrans = function (event) {
      if ($scope.currentTrans < parseInt($scope.histories.transTotal)) {
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

ctrls.controller('WhatsnewCtrl', function ($scope, Instagram) {
  
  Instagram.fetchRecent(function (data) {
    $scope.instagram = data;
  });
  
});