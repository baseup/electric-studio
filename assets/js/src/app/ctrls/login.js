var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('LoginCtrl', function ($scope, $http, $window) {

  $scope.forgotPass = function () {
    angular.element('#forgot-password-modal').Modal();
  }

  $scope.signIn = function () {
    $scope.unverifiedLogin = false;

    if ($scope.login) {

      var email = $scope.login.email;
      var password = $scope.login.password;

      if (!email || !password) {
        $scope.$emit('notify', { message: 'Invalid Login Credentials' });
        return;
      }

      $http({
        url: '/user/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param({ password: password, email: email })
      }).then(function (response) {
        if (response.data.success && response.data.user) {
          $window.localStorage.setItem('login-user', response.data.user);
          $window.location.reload();
        }
      }, function (response) {
        if (response.data.indexOf('User email is not verified') > -1) {
          $scope.user = {};
          $scope.user.email = email;
          $scope.unverifiedLogin = true;
        }
        $scope.$emit('notify', { message: response.data + '.' });
      });
    }

  };

});
