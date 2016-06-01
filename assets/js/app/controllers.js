'use strict';

// transfer this on a better place once figured out where
var branchTitles = {
  'bgc' : 'BGC',
  'salcedo' : 'SALCEDO'
};

var ctrls = angular.module('elstudio.controllers.site', [
  'elstudio.services'
]);

ctrls.controller('NotFoundCtrl', function ($scope) {

});


ctrls.controller('SiteCtrl', function ($scope, $timeout, AuthService, UserService, $routeParams) {

  $scope.isNavOpen = false;
  $scope.isBookNavOpen = false;

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

  if (!$scope.loginUser) {
    if (window.location.hash.indexOf('#signup') >= 0) {
      angular.element('.signup-toggle').click();
    }
  } else if (!$scope.loginUser.agreed_terms) {
    $.Confirm('I have read and agree to these <a href="/#/terms">Terms and Conditions</a> ?' , function () {
      var addSuccess = function () {
        $scope.reloadUser();
      }

      var addFail = function (error) {
        $scope.$emit('notify', { message: error.data });
      }

      UserService.update({ userId: $scope.loginUser._id }, { agreed_terms: true }).$promise.then(addSuccess, addFail);
    });
  }

  $scope.activeMainNav = function (path, regexMatching) {
    if ( regexMatching ) {
      var regex = new RegExp(path);
      console.log('regex',window.location.hash.match(regex) ? true : false);
      return window.location.hash.match(regex) ? true : false;
    }
    return window.location.hash.indexOf('#' + path) == 0;
  }

  var login = angular.element('.header-form-container.login'),
      signup = angular.element('.header-form-container.signup'),
      book = angular.element('.book-menu'),
      loginToggle = angular.element('.login-toggle'),
      signupToggle = angular.element('.signup-toggle'),
      bookToggle = angular.element('.book-toggle'),
      menuToggle = angular.element('.menu-toggle'),
      menuWrapper = angular.element('.menu-wrapper'),
      body = angular.element('body');


  angular.element('.datepicker').pickadate({
    labelMonthNext: 'Go to the next month',
    labelMonthPrev: 'Go to the previous month',
    labelMonthSelect: 'Pick a month from the dropdown',
    labelYearSelect: 'Pick a year from the dropdown',
    selectMonths: true,
    selectYears: 50,
    format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd',
    today: false,
    max: true
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
    $scope.registered = true; // test
    console.log('registered',$scope.registered);
  });

  // Close the menus on click of anchors
  menuWrapper.find('a[href]').on('click',function () {
    $scope.isLetsRideOpen = false;
    $scope.isBookNavOpen = false;
    $scope.isNavOpen = false;
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
        $scope.$emit('notify', { message: xhr.responseText });
      }
    });

  }

  $scope.showSignup = function () {
    if (!$scope.loginUser) {
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.signup-toggle').click();
    }
  }

  var aboutUs = angular.element('#aboutus-section');
  var workouts = angular.element('#workouts-section');
  var firstRide = angular.element('#firstride-section');
  var faq = angular.element('#faq');
  var packages_section = angular.element('#packages');

  if (aboutUs.length) {
    var scrollableView = aboutUs.offset().top;
    angular.element('html, body').animate({ scrollTop: scrollableView }, 'slow');
  }
  if (workouts.length) {
    var scrollableView = workouts.offset().top;
    angular.element('html, body').animate({ scrollTop: scrollableView }, 'slow');
  }

  if (firstRide.length) {
    // var scrollableView = firstRide.offset().top;
    // angular.element('html, body').animate({ scrollTop: scrollableView }, 'slow');
    var body = angular.element('body'),
        backToTop = angular.element('.back-to-top');

    backToTop.on('click',function () {
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    angular.element(window).on('scroll',function () {
      if ( body.scrollTop() >= 1000 ) {
        backToTop.fadeIn(100);
        return;
      }
      backToTop.fadeOut(100);
    });
  }

  if (packages_section.length && window.location.hash.indexOf('package') > 0) {
    var scrollableView = packages_section.offset().top;
    angular.element('html, body').animate({ scrollTop: scrollableView }, 'slow');
  };

  if (faq.length) {;
    angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
  }

  function scrollToUnavailable() {
    $timeout(function () {
      var scheduleRow = angular.element('.schedule .row').not('.unavailable');
      var scrollableView = scheduleRow.length ? scheduleRow.offset().top : 0;
      angular.element('html, body').animate({ scrollTop: scrollableView }, 'slow');
    }, 100);
  }

  scrollToUnavailable();
  angular.element('[href^="#/schedule/"]')
    .off('click',scrollToUnavailable)
    .on('click',scrollToUnavailable);

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

          if(src) {
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
                img.hide();
                clearInterval(thsObj.fn);
              }

              thsObj.tries++;
            }, 50)
            counter++;
          }
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

      win.resize(function() {
        angular.element('.slide').each(function(index, value) {
          var image = win.width() >= 768
            ? $(this).find('.preloaded-img.desktop').attr('src')
            : $(this).find('.preloaded-img.mobile').attr('src');

          if(image) $(this).css('background-image', "url('" + image + "')").removeClass('loading');
        });
      });

      win.trigger('resize');
    }, 400);

  });
});

ctrls.controller('LandingPageCtrl', function ($scope, $timeout, LandingPageService) {
  $scope.landingPages = LandingService.query();
  $scope.landingPages.$promise.then(function (data) {
    $scope.landingPages = data;
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

    if (!$scope.terms) {
      $scope.signupError = 'To continue, please read and agree on our Terms & Condition';
      return;
    }

    if ($scope.user) {
      $scope.signingUp = true;
      if (!$scope.user.email || $scope.user.email.length == 0) {
        $scope.signupError = 'Email Address is required';
        $scope.signingUp = false;
        return;
      }

      if ($scope.user.password != $scope.user.confirm_password) {
        $scope.signupError = "Password didn't match";
        if ($scope.user.password == '') {
          $scope.signupError = "Password is required";
        }
        $scope.signingUp = false;
        return;
      }

      if ($scope.user.password && $scope.user.password.length < 6) {
        $scope.signupError = 'Password must be at least 6 characters.';
        $scope.signingUp = false;
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
      $scope.$emit('notify', { message: 'Please check your e-mail to verify your account and complete registration.' });
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
        $scope.$emit('notify', { message: 'Invalid Login Credentials', duration: 2000 });
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
          $scope.$emit('notify', { message: xhr.responseText + '.', duration: 2000 });
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
        $scope.$emit('notify', { message: 'Password must be at least 6 characters.' });
        return;
      }

      if ($scope.pass.password != $scope.pass.confirm_password) {
        $scope.$emit('notify', { message: 'Passwords did not match.' });
        return;
      }

      var account = {}
      account.reset_password = $scope.pass.password;

      var addSuccess = function () {
        $scope.$emit('notify', { message: 'Successfully updated password' });
      }

      var addFail = function (error) {
        $scope.$emit('notify', { message: error.data });
      }

      UserService.update({ userId: id }, account).$promise.then(addSuccess, addFail);
    } else {
      $scope.$emit('notify', { message: 'Password is required.' });
    }
  }

  $scope.sendForgotPassEmail = function () {
    if ($scope.forgotPassEmail && $scope.forgotPassEmail.length > 0) {
      var user = {};
      user.email = $scope.forgotPassEmail;
      var sendEmailSuccess = function () {
        $scope.$emit('notify', { message: 'Successfully sent email to reset password.' });
      }

      var sendEmailFailed = function (error) {
        $scope.$emit('notify', { message: error.data });
      }

      ForgotPasswordService.send_email(user)
                      .$promise.then(sendEmailSuccess, sendEmailFailed);
      $scope.forgotPassEmail = null;
    } else {
      $scope.$emit('notify', { message: 'Email address is required.' });
    }
  }
});

ctrls.controller('AccountCtrl', function ($scope, $location, UserService, AuthService, UserPackageService) {

  var qstring = $location.search();
  if (qstring.s) {
    if (qstring.s == 'success' && qstring.pname) {
      $scope.$emit('notify', { message: 'Success! You have just purchased ' + qstring.pname + '.' });
    } else if (qstring.s == 'exists') {
      $scope.$emit('notify', { message: 'Transaction already exists.' });
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
        $scope.$emit('notify', { message: 'Successfully updated user information.' });
      }
      var addFail = function (error) {
        $scope.$emit('notify', { message: error.data });
      }

      if ($scope.account.billing) {
        delete $scope.account.billing;
      }

      UserService.update({ userId: $scope.loginUser._id }, $scope.account).$promise.then(addSuccess, addFail);
    }

    $scope.changePassword = function () {

      if ($scope.pass && $scope.pass.current_password) {

        if ($scope.pass.password && $scope.pass.password.length < 6) {
          $scope.$emit('notify', { message: 'Password must be at least 6 characters.', duration: 3000 });
          return;
        }

        if ($scope.pass.password != $scope.pass.confirm_password) {
          $scope.$emit('notify', { message: 'Passwords did not match.', duration: 3000 });
          return;
        }
        var addSuccess = function () {
          $scope.$emit('notify', { message: 'Successfully updated password.', duration: 3000 });
          $scope.pass = null;
        }
        var addFail = function (error) {
          $scope.$emit('notify', { message: error.data, duration: 3000 });
          $scope.pass = null;
        }
        UserService.update({ userId: $scope.loginUser._id }, $scope.pass).$promise.then(addSuccess, addFail);
      } else {
        $scope.$emit('notify', { message: 'Please fill up the form', duration: 3000 });
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
            $scope.$emit('notify', { message: 'Successfully updated billing information', duration: 3000 });
          }

          var billingFail = function (error) {
            $scope.$emit('notify', { message: error.data, duration: 3000 });
          }
          UserService.update({ userId: $scope.loginUser._id }, { billing: $scope.billing }).$promise.then(billingSuccess, billingFail);
        } else {
          $scope.$emit('notify', { message: 'Please complete billing info', duration: 3000 });
        }
      }
    }

    $scope.deactivateAccount = function () {
      var user = $scope.loginUser;
      $.Confirm('Are you sure you want to delete your account?' , function () {
        $.Prompt('User Password', function (password) {
          UserService.delete({ userId: user._id, pass: password }, function () {
            $scope.$emit('notify', { message: 'Account successfully deleted.', duration: 3000 });
            $scope.logout();
          }, function (error){
            $scope.$emit('notify', { message: error.data, duration: 3000 });
          });
        }, true);
      });
    }
  }
});

ctrls.controller('RatesCtrl', function ($scope, $http, $route,$timeout, $location, UserService, PackageService, GCRedeemService) {

  var qstring = $location.search();

  if (angular.element('#rates-section').offset()) {
    var scrollableView = angular.element('#rates-section').offset().top;
    angular.element('html, body').animate({ scrollTop: scrollableView }, 'slow');
  };

  if ($scope.loginUser) {
    $scope.senderEmail = $scope.loginUser.email;
  }

  $scope.ipn_notification_url = '';
  $scope.return_url = '';
  $scope.cancel_return_url = '';
  var qstring = $location.search();

  if (qstring.s == 'error') {
    $scope.$emit('notify', { message: 'Transaction failed.', duration: 3000 });
    $location.search('s', null);
  }else{
    if (qstring.msg){
      $scope.$emit('notify', { message: qstring.msg, duration: 3000 });
      $location.search('s', null);
      $location.search('msg', null);
    }
  }

  var isGCPage = ($location.url() == '/gift-cards');

  var query_params = {};
  if (isGCPage) query_params = { gc: true };

  $scope.loadingPackages = true;
  $scope.packages = PackageService.query(query_params);
  $scope.packages.$promise.then(function (data) {
    $scope.packages = data;
    $scope.loadingPackages = false;

    $scope.selectGCPackage(0);
  });

  var port = '';
  if (window.location.port)
    port = ':' + window.location.port;

  $scope.redirectUrl = window.location.protocol + '//' + window.location.hostname + port;

  $scope.buyPackage = function (event, index) {

    if (!$scope.loginUser) {
      $scope.$emit('notify', { message: 'Please sign up or log in to your Electric account.', duration: 3000 });
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.login-toggle').click();
      return;
    }

    UserService.get(function (user) {

      $scope.loginUser =  user;
      $scope.reloadUser(user);

      if ($scope.loginUser && $scope.loginUser.status == 'Frozen') {
        $scope.$emit('notify', { message: 'Your account is frozen. Please contact the studio for more details.' });
        return;
      }

      if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
        $scope.$emit('notify', { message: 'Account is not verified, Please check your email to verify account.' });
        return;
      }

      $.Confirm('Reminder: After payment is completed, kindly wait for PayPal to redirect back to www.electricstudio.ph', function () {
        angular.element('#payForm-' + index).submit();
      });
    });
  }

  $scope.checkGCValue = function () {

    if(!$scope.gcPin.match(/^\d+$/)) {
      $scope.$emit('notify', { message: 'Invalid pin!', duration: 3000 });
      return;
    }

    if ($scope.gcPin && $scope.gcCode) {

      var data = {}
      data.code = $scope.gcCode;
      data.pin = $scope.gcPin;
      data.checkOnly = true;

      GCRedeemService.redeem(data).$promise.then(function (data) {
        $scope.checkGCCredits = data.credits;
        $scope.checkGCValidity = data.validity;
      }, function (error) {
        $scope.$emit('notify', { message: error.data });
      });
    }else{
      $scope.$emit('notify', { message: 'Oops. We need more details from you.', duration: 3000 });
    }
  }

  $scope.redeemGC = function() {

    if (!$scope.loginUser) {
      $scope.$emit('notify', { message: 'Please log in to your Electric Studio Account or create an account', duration: 3000 });
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.login-toggle').click();
      return;
    }

    if(!$scope.gcPin.match(/^\d+$/)) {
      $scope.$emit('notify', { message: 'Invalid pin!', duration: 3000 });
      return;
    }

    if ($scope.gcPin && $scope.gcCode) {

      var redeemSuccess = function () {

        UserService.get(function (user) {
          $scope.loginUser =  user;
          $scope.reloadUser(user);
        });
        window.location = "/#/account#package"
        window.location.reload()
      }

      var redeemFailed = function (error) {
        $scope.$emit('notify', { message: error.data, duration: 3000 });
      }

      var data = {}
      data.code = $scope.gcCode;
      data.pin = $scope.gcPin;

      GCRedeemService.redeem(data).$promise.then(redeemSuccess, redeemFailed);

    }else{
      $scope.$emit('notify', { message: 'Oops. We need more details from you.', duration: 3000 });
    }
  }


  $scope.prevGCPackage = function() {
    var index = $scope.selectedGCPackageIndex == 0 ? $scope.packages.length - 1 : $scope.selectedGCPackageIndex - 1;
    $scope.selectGCPackage(index);
  }

  $scope.nextGCPackage = function() {
    var index = $scope.selectedGCPackageIndex == $scope.packages.length - 1 ? 0 : $scope.selectedGCPackageIndex + 1;
    $scope.selectGCPackage(index);
  }


  $scope.selectGCPackage = function(index) {
    $scope.selectedGCPackageIndex = index;
    $scope.selectedGCPackage = $scope.packages[index];

    $('input#item_name').val($scope.selectedGCPackage.name);
    $('input#item_number').val($scope.selectedGCPackage._id);
    $('input#amount').val($scope.selectedGCPackage.fee);
    $scope.gcAmount = $scope.selectedGCPackage.fee;
    $scope.gcValidity = $scope.selectedGCPackage.expiration;
    $scope.gcPackageFirstTimer = $scope.selectedGCPackage.first_timer;
  }

  $scope.emailTo = 'sender';
  $scope.buyGC = function () {

    var receiverEmail = null;
    if($scope.emailTo =='sender'){
      receiverEmail = $scope.senderEmail;
      $scope.senderIsReceiver = true;
    }else{
      $scope.senderIsReceiver = false;
      receiverEmail = $scope.receiverEmail;
    }

    if ($scope.selectedGCPackage && $scope.gcReceiver && $scope.gcSender) {
      if(receiverEmail) {
          // Do other validations like email validations
        $.Confirm('Reminder: After payment is completed, kindly wait for PayPal to redirect back to www.electricstudio.ph', function () {

            if ($scope.gcMessage == undefined){
              $scope.gcMessage = ""
            }else{
              var msG = "&message=" + $scope.gcMessage;
              $scope.gcMessage = msG;
            }

            var ipn_notification_url = $scope.redirectUrl + "/admin/ipn_gc?pid=" + $scope.selectedGCPackage._id +
                                        "&success=True&email=" + receiverEmail + $scope.gcMessage +
                                        "&senderIsReceiver="+ $scope.senderIsReceiver + "&sender_name="+$scope.gcSender + "&receiver_name=" + $scope.gcReceiver + "&sender_email=" + $scope.senderEmail;
            var return_url = $scope.redirectUrl + "/admin/buy_gc?pid=" + $scope.selectedGCPackage._id + "&success=True&email=" + receiverEmail +
                          $scope.gcMessage + "&senderIsReceiver="+ $scope.senderIsReceiver+ "&sender_name="+$scope.gcSender + "&receiver_name=" + $scope.gcReceiver + "&sender_email=" + $scope.senderEmail;
            var cancel_return_url = $scope.redirectUrl + "/admin/buy_gc?success=False";

            $('input#ipn_notification_url').val(ipn_notification_url);
            $('input#return').val(return_url);
            $('input#cancel_return').val(cancel_return);

            angular.element('#payForm').submit();
        });
      }else{
        $scope.$emit('notify', { message: 'Please enter valid recipient email.', duration: 3000 });
      }
    }else{
      $scope.$emit('notify', { message: 'Oops. We need more details from you.', duration: 3000 });
    }

  }

});



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
      if (book.status == 'booked' && +today >= +chkDate) {
        $scope.$emit('notify', { message: 'This ride can no longer be cancelled. You can only cancel your booking until 5pm the day before your ride.' });
        return;
      }
      $.Confirm('Are you sure you want to cancel?', function () {
        var data = {};
        data.status = 'cancelled';
        $scope.$emit('notify', { message: 'Canceling schedule ...', duration: 3000 });
        var bookSuccess = function () {
          window.location.reload();
        }
        var bookFail = function (error) {
          $scope.$emit('notify', { message: error.data, duration: 3000 });
        }

        BookService.update({ bookId: book._id }, data).$promise.then(bookSuccess, bookFail);
      });
    }
  }
});


ctrls.controller('ScheduleCtrl', function ($scope, $location, $route, $filter, ScheduleService, ScheduleSocketService, SharedService, BookService, UserService, SettingService, $timeout, $routeParams, BranchService) {

  // Get the list of available branches
  BranchService.query().$promise.then(function (branches) {
    $scope.branches = branches;

    if($scope.isValidBranch(branches, $routeParams.branch)) {
      var selectedSched = SharedService.get('selectedSched')
      var date = selectedSched && 'date' in selectedSched ? new Date(selectedSched.date) : new Date();
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


  $scope.schedules = {};
  ScheduleSocketService.onLoadSchedule(function(schedules) {
    $scope.schedules = schedules;
    $scope.loadingSchedules = false;
  });

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

  $scope.setSchedule = function (schedule, date, branch) {

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
