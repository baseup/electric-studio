var ctrls = angular.module('elstudio.controllers.site');

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
        $scope.$emit('notify', { message: 'Password successfully changed' });
        $scope.forgotPasswordSuccess = true;
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
