var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('SignUpCtrl', function ($scope, UserService, EmailVerifyService, Amplitude) {

  $scope.registered = false;
  $scope.signingUp = false;

  /**
   * @function: Validates user input then submits the registration
   */
  $scope.signUp = function () {

    if (!$scope.terms) {
      $scope.$emit('notify', { message: 'To continue, please read and agree on our Terms & Condition' });
      return;
    }

    if (!$scope.user.email || $scope.user.email.length === 0) {
      $scope.$emit('notify', { message: 'Email Address is required' });
      return;
    }

    if (!$scope.user.password) {
      $scope.$emit('notify', { message: 'Password is required.' });
      return;
    }

    if ($scope.user.password && $scope.user.password.length < 6) {
      $scope.$emit('notify', { message: 'Password must be at least 6 characters.' });
      return;
    }

    if ($scope.user.password !== $scope.user.confirm_password) {
      $scope.$emit('notify', { message: 'Password didn\'t match.' });
      return;
    }


    var registerSuccess = function () {
      $scope.registered = true;
      $scope.sendEmailConfirmation($scope.user);
      $scope.signingUp = false;

      Amplitude.logEvent('USER_SIGNUP', { user: $scope.user.email });
    };

    var registerFail = function (error) {
      $scope.registered = false;

      var errorMsg = error.data
      errorMsg = errorMsg.replace(/'/g, '')
      errorMsg = errorMsg.replace('Field ', '')

      var errorMsgArr = errorMsg.split('_');
      if (errorMsgArr.length === 2) {
        errorMsg = '';

        for (var i in errorMsgArr) {
          errorMsg += errorMsgArr[i].charAt(0).toUpperCase() + errorMsgArr[i].slice(1) + ' ';
        }

        if (errorMsg.indexOf('required') === -1) {
          errorMsg = errorMsg + 'is required';
        }
      } else {
        errorMsg = errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1);
      }

      $scope.$emit('notify', { message: errorMsg });
      $scope.signingUp = false;
    };

    $scope.signingUp = true;

    UserService.create($scope.user).$promise.then( registerSuccess, registerFail );

  };


  /**
   * @function: Sends the email verification link
   * @param: user (user's id)
   */
  $scope.sendEmailConfirmation = function (user, resend) {
    $scope.sendingEmail = true;
    $scope.verificationLink = null;

    var sendEmailSuccess = function () {
      $scope.sendingEmail = false;
      if(resend) $scope.$emit('notify', { message: 'Email confirmation sent!', duration: 4000 });
    };

    var sendEmailFailed = function (error) {
      $scope.sendingEmail = false;
      $scope.verificationLink = error.data
    };

    EmailVerifyService.email_verify(user).$promise.then( sendEmailSuccess, sendEmailFailed );
  };

});
