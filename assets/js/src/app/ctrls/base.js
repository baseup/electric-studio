var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('SiteCtrl', function ($scope, $window, $timeout, AuthService, UserService) {

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


  if (!$scope.loginUser && $window.localStorage.getItem('login-user')) {
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

  // show signup form if user is not logged in and hash has `#signup`
  if (!$scope.loginUser && $window.location.hash.indexOf('#signup') >= 0) {
    angular.element('.signup-toggle').click();
  }

  // show terms and conditions popup
  if ($scope.loginUser && !$scope.loginUser.agreed_terms) {
    $.Confirm('I have read and agree to these <a href="/#/terms">Terms and Conditions</a> ?' , $scope.onAgreeTerms);
  }

  $scope.onAgreeTerms = function() {
    var updateSuccess = $scope.reloadUser;

    var updateFail = function (error) {
      $scope.$emit('notify', { message: error.data });
    };

    UserService.update({ userId: $scope.loginUser._id }, { agreed_terms: true }).$promise.then( updateSuccess, updateFail );
  };


  $scope.activeMainNav = function (path, regexMatching) {
    if ( regexMatching ) {
      var regex = new RegExp(path);
      return $window.location.hash.match(regex) ? true : false;
    }
    return $window.location.hash.indexOf('#' + path) == 0;
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


  // angular.element('.datepicker').pickadate({
  //   labelMonthNext: 'Go to the next month',
  //   labelMonthPrev: 'Go to the previous month',
  //   labelMonthSelect: 'Pick a month from the dropdown',
  //   labelYearSelect: 'Pick a year from the dropdown',
  //   selectMonths: true,
  //   selectYears: 50,
  //   format: 'yyyy-mm-dd',
  //   formatSubmit: 'yyyy-mm-dd',
  //   today: false,
  //   max: true
  // });

  angular.element('.close-btn').click(function () {
    var headerForm = angular.element(this).closest(login.add(signup));

    headerForm.removeClass('show');
  });

  $scope.showLoginForm = false;
  $scope.showSignupForm = false;
  $scope.showBookMenu = false;

  $scope.closeHeaderForms = function() {
    $scope.showLoginForm = false;
    $scope.showSignupForm = false;
  };


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

    // $.ajax({
    //   url: '/user/logout',
    //   method: 'GET',
    //   success: function (response) {
    //     $window.localStorage.removeItem('login-user');
    //     $window.location = '/';
    //   },
    //   error: function (xhr, code, error) {
    //     $scope.$emit('notify', { message: xhr.responseText });
    //   }
    // });

    UserService.logout().$promise.then(function (response) {
      $window.localStorage.removeItem('login-user');
      $window.location = '/';
    }, function (xhr, code, error) {
      $scope.$emit('notify', { message: xhr.responseText });
    });
  }

  $scope.showSignup = function () {
    if (!$scope.loginUser) {
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.signup-toggle').click();
    }
  }

});
