var ctrls = angular.module('elstudio.controllers.site');

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
