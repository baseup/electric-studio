'use strict';

var ctrls = angular.module('elstudio.controllers.site', [
  'elstudio.services'
]);

ctrls.controller('NotFoundCtrl', function ($scope) {

});


ctrls.controller('SiteCtrl', function ($scope, AuthService, UserService){

  $scope.loginUser = AuthService.getCurrentUser();
  
  $scope.activeMainNav = function (path) {
    return window.location.hash.indexOf('#' + path) == 0;
  }
  
  angular.element('.datepicker').pickadate({
    format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd',
    today: false
  });

  var login = angular.element('.header-form-container.login'),
      signup = angular.element('.header-form-container.signup'),
      book = angular.element('.book-menu'),
      loginToggle = angular.element('.login-toggle'),
      signupToggle = angular.element('.signup-toggle'),
      bookToggle = angular.element('.book-toggle'),
      menuToggle = angular.element('.menu-toggle');
    
  angular.element('.slider-container').glide({
    autoplay: 3000,
    hoverpause: false,
    arrows: false
  });

  angular.element('.fit-text span').fitText(2);


  loginToggle.off('click').on('click', function() {
    login.toggleClass('show');
    signup.add(book).removeClass('show');
  });

  signupToggle.off('click').on('click', function() {
    signup.toggleClass('show');
    login.add(book).removeClass('show');
  });

  menuToggle.off('click').click(function() {
    angular.element('.main-menu').toggleClass('show');
  });


  angular.element('.seats td').not('.unavailable').find('span').click(function() {
    angular.element('.seats td').removeClass('selected');
    angular.element(this).parent('td').toggleClass('selected');
  });

  $(window).resize(function() {
    var winH = angular.element(this).height(), 
        headerH = angular.element('.main-header').outerHeight(),
        footerH = angular.element('.main-footer').height();

    if(angular.element(this).width() >= 980){
      angular.element('.fitscreen').find('.slide, .content-wrap').height(winH - (headerH + footerH));
    }
  }).trigger('resize');

  $scope.logout = function(){

    $.ajax({
      url: '/user/logout',
      method: 'GET',
      success: function (response) {
        window.localStorage.removeItem('login-user');
        window.location = '/';        
      },
      error: function (xhr, code, error) {
        alert(xhr.responseText);
      }
    });

  }
  
});

ctrls.controller('SignUpCtrl', function($scope, UserService, EmailVerifyService){

  $scope.registered = false;
  $scope.signUp = function() {
    $scope.signupError = null;
    if ($scope.user) {
      if(!$scope.user.email || $scope.user.email.length == 0){
        $scope.signupError = 'Email Field is required';
        return;
      }
      if($scope.user.password != $scope.user.confirm_password){
        $scope.signupError = "Password didn't match";
        return;
      }

      var registerSuccess = function(){
        $scope.registered = true;
        $scope.sendEmailConfirmation($scope.user);
      }

      var registerFail = function(error) {
        $scope.registered = false;

        errorMsg = error.data
        if(errorMsg.trim().indexOf(' ') > 0){
          errorMsg = 'Field ' + errorMsg + ' is empty';
        }

        $scope.signupError = errorMsg;
      }

      UserService.create($scope.user).$promise.then(registerSuccess, registerFail);
    }
  } 

  $scope.sendEmailConfirmation = function(user){
    $scope.sendingEmail = true;
    $scope.verificationLink = null;
    var sendEmailSuccess = function() {
      $scope.sendingEmail = false;
    }

    var sendEmailFailed = function(error) {
      $scope.sendingEmail = false;
      $scope.verificationLink = error.data
    }

    EmailVerifyService.email_verify(user)
                      .$promise.then(sendEmailSuccess, sendEmailFailed);
  }

});

ctrls.controller('LoginCtrl', function ($scope) {

  $scope.signIn = function(){

    if($scope.login){

      var email = $scope.login.email;
      var password = $scope.login.password;

      if(!email || email.length == 0 ||
         !password || password.length == 0) {
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
          $scope.signInError = xhr.responseText + '.';
        }
      });
    }

  }

});

ctrls.controller('AccountCtrl', function ($scope, UserService, AuthService) {

  $scope.account = $scope.loginUser;

  if($scope.account.birthdate){
    $scope.account.birthdate = $scope.account.birthdate.replace(' 00:00:00', '');;
  }

  $scope.updateAccount = function(){

    var addSuccess = function (){
      $scope.loginUser = AuthService.getCurrentUser();
    }

    var addFail = function(error){
      alert(error.data);
    }

    UserService.update({ userId: $scope.loginUser.id }, $scope.account).$promise.then(addSuccess, addFail);
  }

  $scope.changePassword = function(){

    if($scope.pass && $scope.pass.current_password){

      if($scope.pass.password != $scope.pass.confirm_password){
        alert("Retype Password didn't match");
        return;
      }

      var addSuccess = function (){
        alert("Successfully updated your password")
        $scope.pass = null;
      }

      var addFail = function(error){
        alert(error.data);
        $scope.pass = null;
      }

      UserService.update({ userId: $scope.loginUser.id }, $scope.pass).$promise.then(addSuccess, addFail);
    }

  }

});

ctrls.controller('RatesCtrl', function ($scope, $http, PackageService){

  $scope.packages = PackageService.query();
  $scope.packages.$promise.then(function(data) {
    $scope.packages = data;
  });

  $scope.redirectUrl = window.location.protocol + '://' + window.location.hostname + ':' + window.location.port +'/buy';

  $scope.buy = function(pacId){
    $http.post('/buy', { packageId : pacId })
         .success(function(data, status, headers, config) {
      if (data.success && data.approve_url) {
        window.location = response.approve_url;
      }
    }).error(function(data, status, headers, config) {
      alert(data)
    });
  }
  
})

ctrls.controller('InstructorCtrl', function ($scope, $timeout) {

  angular.element('.imgmap a').click(function() {
   var id = angular.element(this).data('target'),
       target = angular.element('#'+id);
    
    angular.element('html, body').animate({
      scrollTop : target.offset().top
    });
    
    target.find('.image').addClass('focus');
        
    $timeout(function() {
      target.find('.image').removeClass('focus');
    }, 2000);
    
  });
  
});