var ctrls = angular.module('elstudio.controllers.site');

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
