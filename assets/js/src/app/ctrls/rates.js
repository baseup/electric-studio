var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('RatesCtrl', function ($scope, $http, $timeout, $location, $window, AuthService, UserService, PackageService, GCRedeemService) {

  // Check for paypal return messages on the url
  var qstring = $location.search();

  if (qstring.s === 'error') {
    $scope.$emit('notify', { message: 'Transaction failed.', duration: 3000 });
    $location.search('s', null);
  } else if (qstring.msg) {
    $scope.$emit('notify', { message: qstring.msg, duration: 3000 });
    $location.search('s', null);
    $location.search('msg', null);
  }


  // Get the list of packages
  var query_params = $location.url() === '/gift-cards' ? { gc: true } : {};
  $scope.loadingPackages = true;

  PackageService.query(query_params).$promise.then(function (data) {
    $scope.packages = data;
    $scope.loadingPackages = false;

    $scope.selectGCPackage(0);
  });

  // Set the redirect url for Paypal response
  var port = $window.location.port ? ':' + $window.location.port : '';
  $scope.redirectUrl = $window.location.protocol + '//' + $window.location.hostname + port;

  /**
   * @function: purchase a ride package via paypal
   * @param: packageId
   */
  $scope.buyPackage = function (package) {
    if (!$scope.loginUser) {
      $scope.$emit('notify', { message: 'Please sign up or log in to your Electric account.', duration: 3000 });
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.login-toggle').click();
      return;
    }

    if ($scope.loginUser && $scope.loginUser.status == 'Frozen') {
      $scope.$emit('notify', { message: 'Your account is frozen. Please contact the studio for more details.' });
      return;
    }

    if ($scope.loginUser && $scope.loginUser.status == 'Unverified') {
      $scope.$emit('notify', { message: 'Account is not verified, Please check your email to verify account.' });
      return;
    }

    $.Confirm('Reminder: After payment is completed, kindly wait for PayPal to redirect back to www.electricstudio.ph', function () {
      angular.element('#payForm-' + package._id).submit();
    });
  };


  /**
   * @function: Checks the given gift card value
   */
  $scope.checkGCValue = function () {
    // ensure that the pin is all number
    if($scope.gcPin) {
      if(!$scope.gcPin.match(/^\d+$/)) {
        $scope.$emit('notify', { message: 'Invalid pin!', duration: 3000 });
        return;
      }
    }
    if ($scope.gcPin && $scope.gcCode) {
      var data = {};
      data.code = $scope.gcCode;
      data.pin = $scope.gcPin;
      data.checkOnly = true;

      GCRedeemService.redeem(data).$promise.then(function (data) {
        $scope.checkGCData = data;
      }, function (error) {
        $scope.$emit('notify', { message: error.data });
      });
    } else {
      $scope.$emit('notify', { message: 'Oops. We need more details from you.', duration: 3000 });
    }
  };


  /**
   * @function: Redeem gift card to user account
   */
  $scope.redeemGC = function() {

    if (!$scope.loginUser) {
      $scope.$emit('notify', { message: 'Please log in to your Electric Studio Account or create an account', duration: 3000 });
      angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
      angular.element('.login-toggle').click();
      return;
    }

    if($scope.gcPin) {
      if(!$scope.gcPin.match(/^\d+$/)) {
        $scope.$emit('notify', { message: 'Invalid pin!', duration: 3000 });
        return;
      }
    }

    if ($scope.gcPin && $scope.gcCode) {

      var redeemSuccess = function () {
        UserService.get(function (user) {
          $scope.loginUser = user;
          $scope.reloadUser(user);
        });

        $window.location = "/#/account#package"
        $scope.$emit('notify', { message: 'Successfully. Redeemed Gift Certificate.', duration: 3000 });
      }

      var redeemFailed = function (error) {
        $scope.$emit('notify', { message: error.data, duration: 3000 });
      }

      var data = {};
      data.code = $scope.gcCode;
      data.pin = $scope.gcPin;

      GCRedeemService.redeem(data).$promise.then(redeemSuccess, redeemFailed);

    } else {
      $scope.$emit('notify', { message: 'Oops. We need more details from you.', duration: 3000 });
    }
  };


  $scope.prevGCPackage = function() {
    var index = $scope.selectedGCPackageIndex == 0 ? $scope.packages.length - 1 : $scope.selectedGCPackageIndex - 1;
    $scope.selectGCPackage(index);
  };

  $scope.nextGCPackage = function() {
    var index = $scope.selectedGCPackageIndex == $scope.packages.length - 1 ? 0 : $scope.selectedGCPackageIndex + 1;
    $scope.selectGCPackage(index);
  };


  $scope.selectGCPackage = function(index) {
    $scope.selectedGCPackageIndex = index;
    $scope.selectedGCPackage = $scope.packages[index];

    $('input#item_name').val($scope.selectedGCPackage.name);
    $('input#item_number').val($scope.selectedGCPackage._id);
    $('input#amount').val($scope.selectedGCPackage.fee);
    $scope.gcAmount = $scope.selectedGCPackage.fee;
    $scope.gcValidity = $scope.selectedGCPackage.expiration;
    $scope.gcPackageFirstTimer = $scope.selectedGCPackage.first_timer;
  };



  if ($scope.loginUser) {
    $scope.senderEmail = $scope.loginUser.email;
  }

  $scope.emailTo = 'receiver';

  $scope.buyGC = function() {

    var receiverEmail = null;
    if($scope.emailTo === 'sender') {
      receiverEmail = $scope.senderEmail;
      $scope.senderIsReceiver = true;
    } else {
      $scope.senderIsReceiver = false;
      receiverEmail = $scope.receiverEmail;
    }

    if ($scope.selectedGCPackage && $scope.gcReceiver && $scope.gcSender) {
      if(receiverEmail) {

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
      } else {
        $scope.$emit('notify', { message: 'Please enter valid recipient email.', duration: 3000 });
      }
    } else {
      $scope.$emit('notify', { message: 'Oops. We need more details from you.', duration: 3000 });
    }
  };

});
