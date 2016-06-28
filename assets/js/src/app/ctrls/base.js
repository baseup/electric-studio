var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('SiteCtrl', function ($scope, $window, $document, $timeout, $http, AuthService, UserService, Amplitude) {

  Amplitude.init();

  $scope.loginUser = AuthService.getCurrentUser();
  $scope.reloadUser = function (user) {
    UserService.get(function (user) {
      if ($scope.loginUser) {
        angular.extend($scope.loginUser, user);
      } else {
        $scope.loginUser = user;
      }

      Amplitude.setUserId($scope.loginUser.email);
    });
  };


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
  };


  $scope.showLoginForm = false;
  $scope.showSignupForm = false;
  $scope.showBookMenu = false;

  $scope.closeHeaderForms = function() {
    $scope.showLoginForm = false;
    $scope.showSignupForm = false;
  };

  $scope.toggleLogin = function() {
    $scope.showLoginForm = !$scope.showLoginForm;
    $scope.showSignupForm = false;
    $scope.showBookMenu = false;
  };

  $scope.toggleSignup = function() {
    $scope.showSignupForm = !$scope.showSignupForm;
    $scope.showLoginForm = false;
    $scope.showBookMenu = false;
  };


  $scope.isNavOpen = false;
  $scope.isBookNavOpen = false;
  // Close the menus on click of anchors
  angular.element('.menu-wrapper').find('a[href]').on('click',function () {
    $scope.isLetsRideOpen = false;
    $scope.isBookNavOpen = false;
    $scope.isNavOpen = false;
  });


  $scope.toggleAccountDropdown = function() {
    if($scope.showAccountDropdown) {
      $scope.showAccountDropdown = false;
      $document.off('click.accountMenu');
    } else {
      $scope.showAccountDropdown = true;

      $document.on('click.accountMenu', function(e) {
        if( $(e.target).closest('.account-menu').length === 0 ) {
          $scope.$apply(function() {
            $scope.showAccountDropdown = false;
            $document.off('click.accountMenu');
          });
        }
      });
    }
  };


  $scope.logout = function () {
    $http({
      url: '/user/logout',
      method: 'GET',
    }).then(function (response) {
      Amplitude.logOutUser();

      $window.localStorage.removeItem('login-user');
      $window.location = '/';
    }, function (xhr, code, error) {
      $scope.$emit('notify', { message: xhr.responseText });
    });
  };

  $scope.showSignup = function () {
    if (!$scope.loginUser) {
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      $scope.toggleSignup();
    }
  };

});
