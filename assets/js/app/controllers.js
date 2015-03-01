'use strict';

var ctrls = angular.module('elstudio.controllers.site', [
  'elstudio.services'
]);

ctrls.controller('NotFoundCtrl', function ($scope) {

});


ctrls.controller('SiteCtrl', function ($scope, AuthService){

  $scope.loginUser = AuthService.getCurrentUser();
  
  $scope.activeMainNav = function (path) {
    return window.location.hash.indexOf('#' + path) == 0;
  }

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
  
});

ctrls.controller('SignUpCtrl', function($scope, UserService){

  $scope.signUp = function() {
    if ($scope.user) {
      if(!$scope.user.email || $scope.user.email.length == 0){
        alert("Email Field is required");
        return;
      }
      if($scope.user.password != $scope.user.confirm_password){
        alert("Password didn't match");
        return;
      }

      var registerSuccess = function(user){
        window.localStorage.setItem('login-user', user);
        window.location = '/';
      }

      var registerFail = function(error) {
        alert(error.data)
      }

      UserService.create($scope.user).$promise.then(registerSuccess, registerFail);
    } else {
      alert("Please fill up the form");
    }
  } 

});


ctrls.controller('AccountCtrl', function ($scope) {

});

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