'use strict';

var ctrls = angular.module('elstudio.controllers.site', [
  'elstudio.services'
]);

ctrls.controller('NotFoundCtrl', function ($scope) {

});


ctrls.controller('SiteCtrl', function ($scope, AuthService, UserService) {

  $scope.loginUser = AuthService.getCurrentUser();

  $scope.reloadUser = function (user) {
    UserService.get(function (user) {
      if ($scope.loginUser) {
        angular.extend($scope.loginUser, user);
      } else {
        $scope.loginUser = user;
      }
    });
  } 

  if (!$scope.loginUser && window.localStorage.getItem('login-user')) {
    $scope.reloadUser();
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
    labelMonthNext: 'Go to the next month',
    labelMonthPrev: 'Go to the previous month',
    labelMonthSelect: 'Pick a month from the dropdown',
    labelYearSelect: 'Pick a year from the dropdown',
    selectMonths: true,
    selectYears: 20,
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

  $scope.showSignup = function () {
    if (!$scope.loginUser) {
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.signup-toggle').click();
    }
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
        var maxTries = 60;
        var intervals = [];
        var counter = 0;

        angular.forEach(angular.element('.slider .preloaded-img'), function (value, key) {
          var img = angular.element(value);
          var src = img.attr('src');
          
          intervals.push({
            fn : '',
            tries : 0
          });

          var thsObj = intervals[counter];

          thsObj.fn = setInterval(function () {
            if (thsObj.tries > maxTries) {
              clearInterval(thsObj.fn);
            }
            if (img[0].complete) {
              img.parent().css({backgroundImage : 'url('+src+')'}).removeClass('loading');
              img.remove();
              clearInterval(thsObj.fn);
            }

            thsObj.tries++;
          }, 50)
          counter++;;
        });
      }, 800);

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
  $scope.signingUp = false;
  $scope.signUp = function () {
    $scope.signupError = null;
    if ($scope.user) {
      $scope.signingUp = true;
      if (!$scope.user.email || $scope.user.email.length == 0) {
        $scope.signupError = 'Email Address is required';
        return;
      }

      if ($scope.user.password != $scope.user.confirm_password) {
        $scope.signupError = "Password didn't match";
        if ($scope.user.password == '') {
          $scope.signupError = "Password is required";
        }
        return;
      }

      if ($scope.user.password && $scope.user.password.length < 6) {
        $scope.signupError = 'Password must be at least 6 characters.';
        return;
      }

      var registerSuccess = function () {
        $scope.registered = true;
        $scope.sendEmailConfirmation($scope.user);
        $scope.signingUp = false;
      }

      var registerFail = function (error) {
        $scope.registered = false;

        var errorMsg = error.data
        errorMsg = errorMsg.replace(/'/g, '')
        errorMsg = errorMsg.replace('Field ', '')

        var errorMsgArr = errorMsg.split('_');
        if (errorMsgArr.length === 2) {
          errorMsg = '';
          for (var i in errorMsgArr){
            errorMsg += errorMsgArr[i].charAt(0).toUpperCase() + errorMsgArr[i].slice(1) + ' ';
          }
          if (errorMsg.indexOf('required') === -1){
            errorMsg = errorMsg + 'is required';
          }
        } else {
          errorMsg = errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1);
        }
        $scope.signupError = errorMsg;
        $scope.signingUp = false;
      }

      UserService.create($scope.user).$promise.then(registerSuccess, registerFail);
    }
  } 

  $scope.sendEmailConfirmation = function (user) {
    $scope.sendingEmail = true;
    $scope.verificationLink = null;
    var sendEmailSuccess = function () {
      $scope.sendingEmail = false;
      $.Alert('Please check your e-mail to verify your account and complete registration.');
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

      if ($scope.pass.password.length < 6) {
        $.Alert('Password must be at least 6 characters.');
        return;
      }

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
    $location.path('/');
    angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
    angular.element('.login-toggle').click();
  } else {
    $scope.account = $scope.loginUser;
    $scope.billing = {};

    if ($scope.account.billing && $scope.account.billing != 'null') { 
      $scope.billing = JSON.parse($scope.account.billing);
    }

    UserService.get(function (user) {
      $scope.account = user;

      if ($scope.account.birthdate) {
        $scope.account.birthdate = $scope.account.birthdate.replace(' 00:00:00', '');;
      }
    });

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

      if ($scope.account.billing) {
        delete $scope.account.billing;
      }

      UserService.update({ userId: $scope.loginUser._id }, $scope.account).$promise.then(addSuccess, addFail);
    }

    $scope.changePassword = function () {

      if ($scope.pass && $scope.pass.current_password) {

        if ($scope.pass.password && $scope.pass.password.length < 6) {
          $.Alert('Password should be atleast more than 5 characters');
          return;
        }

        if ($scope.pass.password != $scope.pass.confirm_password) {
          $.Alert("Retype Password didn't match");
          return;
        }
        var addSuccess = function () {
          $.Alert('Successfully updated your password');
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

        if ($scope.billing.first_name &&
            $scope.billing.last_name &&
            $scope.billing.address &&
            $scope.billing.city &&
            $scope.billing.province &&
            $scope.billing.postalcode &&
            $scope.billing.email &&
            $scope.billing.card_number  &&
            $scope.billing.card_type &&
            $scope.billing.card_expiration &&
            $scope.billing.csc) {
          var billingSuccess = function () {
            $.Alert('Successfully updated billing information');
          }

          var billingFail = function (error) {
            $.Alert(error.data)
          }
          UserService.update({ userId: $scope.loginUser._id }, { billing: $scope.billing }).$promise.then(billingSuccess, billingFail);
        } else {
          $.Alert('Please complete billing info')
        }
      }
    }

    $scope.deactivateAccount = function () {
      var user = $scope.loginUser;
      $.Confirm('Are you sure you want to delete your account?' , function () {
        $.Prompt('User Password', function (password) {
          UserService.delete({ userId: user._id, pass: password }, function () {
            $.Alert('Account successfully deactivated');
            $scope.logout();
          }, function (error){ $.Alert(error.data); });
        }, true);
      });
    }
  }
});

ctrls.controller('RatesCtrl', function ($scope, $http, $location, UserService, PackageService) {
  
  var scrollableView = angular.element('#rates-section').offset().top;
  angular.element('html, body').animate({ scrollTop: scrollableView }, 'slow');

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
      $.Alert('Please log in to your Electric account.');
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.login-toggle').click();
      return;
    }

    UserService.get(function (user) {
      
      $scope.loginUser =  user;
      $scope.reloadUser(user);

      if ($scope.loginUser && $scope.loginUser.status == 'Frozen') {
        $.Alert('Your account is frozen. Please contact the studio for more details.');
        return;
      }

      if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
        $.Alert('User is Unverified, Please check your email');
        return;
      }

      $.Confirm('Reminder: After payment done, Please let paypal redirect back to our site to make sure your rides will be credited on our system', function () {
        angular.element('#payForm-' + index).submit();
      });
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
    $location.path('/');
    angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
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
      var chkDate =  new Date(date[0], date[1]-1, date[2]-1, 17, 0, 0);
      if (+today >= +chkDate) {
        $.Alert('This ride can no longer be cancelled. You can only cancel your booking until 5pm the day before your ride.')
        return;
      }

      $.Confirm('Are you sure you want to cancel?', function () {
        var data = {};
        data.status = 'cancelled';
        $.Alert('Canceling schedule ...', true);
        var bookSuccess = function () {
          window.location.reload();
        }
        var bookFail = function (error) {
          $.Alert(error.data)
        }
        
        BookService.update({ bookId: book._id }, data).$promise.then(bookSuccess, bookFail);
      });
    }
  }
});


ctrls.controller('ScheduleCtrl', function ($scope, $location, $route, $filter, ScheduleService, SharedService, BookService, UserService, SettingService) {
  $scope.resched = SharedService.get('resched');

  var days = { 'mon' : 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 7 };
  $scope.weekRelease = {};
  SettingService.getWeekRelease(function (data) {
    if (data && data.time && data.day) {

      var parts = data.date.split(/[^0-9]/);
      var updateAt = new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
      updateAt.setDate(updateAt.getDate() - updateAt.getDay() + 7);

      var date = new Date()
      date.setDate(date.getDate() - date.getDay() + days[data.day])
      var time = data.time.split(':')
      date.setHours(time[0], time[1], 0 , 0);
      $scope.weekRelease.date = date;
      $scope.weekRelease.updateWeek = updateAt;
    }
  });

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
      $.Alert('Please log in to your Electric account.');
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.login-toggle').click();
      return;
    }

    $.Alert('Setting schedule as waitlist ...')

    UserService.get(function (user) {

      $scope.loginUser = user;

      if ($scope.loginUser && $scope.loginUser.status == 'Frozen') {
        $.Alert('Your account is frozen. Please contact the studio for more details.');
        return;
      }

      if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
        $.Alert('User is Unverified, Please check your email');
        return;
      }

      if ($scope.loginUser && $scope.loginUser.credits <= 0) {
        $.Alert('Insufficient Credits');
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

        $.Alert('You have beed added to waitlist');
        $scope.reloadUser();
        window.location = '/#/reserved'
        window.location.reload();
      }
      var waitlistFail = function (error) {
        $.Alert(error.data)
        $route.reload();
      }

      BookService.book(book).$promise.then(waitlistSuccess, waitlistFail);
    });
  }

  $scope.setSchedule = function (schedule, date) {

    if (!$scope.chkSched(date, schedule)) {

      if ($scope.loginUser && $scope.loginUser.credits <= 0) {
        $.Alert('Insufficient Credits');
      } 

      var today = new Date();
      var time = schedule.start.split(/[^0-9]/);
      var chkDate = new Date(date);
      chkDate.setHours(time[3] - 1, time[4], 0);
      if (+today >= +chkDate) {
        $.Alert('Online booking closes 1 hour before class starts. Please call the studio to book this class.')
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
      if (+today >= +cutOffchkDate) {
        cutOffMsg = 'You can no longer cancel this ride once waitlisted. Read about our studio policies <a href="#/faq" class="modal-close">here</a>.<br><br>';
      }

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
              $location.path('/class');
            }
          });
        }
      });
    }
  }

  $scope.chkSched = function (date, sched) {

    var now = new Date();
    var parts = sched.start.split(/[^0-9]/);
    var dTime =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
    var hours = dTime.getHours();
    var minutes = dTime.getMinutes();
    date.setHours(hours, minutes, 0, 0);
    if (date < now)
      return true;

    var nextMonday = new Date(now);
    nextMonday.setDate(nextMonday.getDate() - nextMonday.getDay() + 8);
    nextMonday.setHours(23, 59, 59);
    if (date > nextMonday) 
      return true;

    if ($scope.weekRelease &&
        $scope.weekRelease.updateWeek < now && 
        now < $scope.weekRelease.date) 
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

    $scope.schedules = ScheduleService.query({ date: mon.getFullYear() + '-' + (mon.getMonth()+1) + '-' + mon.getDate() });
    $scope.schedules.$promise.then(function (data) {
      $scope.schedules = data;
    });

  }

  $scope.isFull = function (sched) {
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
    return false;
  }

  $scope.getWeek(new Date());
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

    var now = new Date();

    if (((now - pWeek) / (24 * 60 * 60 * 1000)) < 7) {
      $scope.getWeek(pWeek);
    }
  }
});

ctrls.controller('ClassCtrl', function ($scope, $location, $route, UserService, ScheduleService, SharedService, BookService, SettingService) {
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

    ScheduleService.get({ scheduleId: sched.schedule._id }, function (schedule) {
      sched.schedule = schedule;
      $scope.timeSched = sched.schedule.start;
      $scope.instructor = sched.schedule.instructor;
    });

    $scope.dateSched = months[sched.date.getMonth()] + ' ' + sched.date.getDate() + ', ' + sched.date.getFullYear();
    $scope.daySched = days[sched.date.getDay()];
    $scope.timeSched = sched.schedule.start;
    $scope.sched = sched.schedule;
    $scope.instructor = sched.schedule.instructor;

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
      if ($scope.reserved[r].seat_number == num ||
          num > sched.schedule.seats) {
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
        if ($scope.loginUser && 
            seats.length >= $scope.loginUser.credits) {
          $.Alert('Not enough credits');
          return;
        } else {
          angular.element('#seat' + number).toggleClass('selected');
          seats.push(number);
        }
      } else {
        angular.element('#seat' + number).toggleClass('selected');
        seats.splice(seat_index, 1);
      }
    } else {
      event.preventDefault();
    }
  }

  $scope.booking = false;
  $scope.bookSchedule = function () {

    if (!$scope.loginUser) {
      $.Alert('Please log in to your Electric account.');
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.login-toggle').click();
      return;
    }

    UserService.get(function (user) {

      $scope.loginUser = user;

      if ($scope.loginUser && $scope.loginUser.status == 'Frozen') {
        $.Alert('Your account is frozen. Please contact the studio for more details.');
        return;
      }

      if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
        $.Alert('User is Unverified, Please check your email');
        return;
      }

      if (!$scope.forWaitlist && seats.length == 0) {
        $.Alert('Please pick a bike');
        return;
      }

      if ($scope.loginUser && $scope.loginUser.credits < seats.length) {
        $.Alert('Insufficient Credits, you only have ' + $scope.loginUser.credits);
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
      var confirm_message = 'You’re about to book bike'+ (seats.length > 1 ? 's' : '') + ' # ' + str_seats + 
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
        $.Alert('Booking bike' + (seats.length > 1 ? 's' : '' ) + ' ...', true);
        $scope.booking = true;
        var bookSuccess = function () {

          if ($scope.resched) {
            SharedService.clear('resched');
          }

          if ($scope.forWaitlist) {
            $.Alert('You have beed added to waitlist');
          } else {  
            $.Alert('You have successfully booked a ride');
          }
          UserService.get(function (user) {
            $scope.reloadUser();
            window.location = '/#/reserved'
            window.location.reload();
          });
        }
        var bookFail = function (error) {
          $.Alert(error.data);
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

ctrls.controller('HistoryCtrl', function ($scope, $routeParams, HistoryService) {
  if (!$scope.loginUser) {
    $location.path('/');
    angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
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