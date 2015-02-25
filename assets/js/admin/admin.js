'use strict';

var app = angular.module('elstudio-admin', [
  'ngRoute',
  'ngSanitize',
  'elstudio.services', 
  'elstudio.templates',
  'elstudio.controllers.admin'
]);

app.config(function ($routeProvider, $httpProvider) {
  
  var routes = {
    '/': {
      redirectTo: 'accounts'
    },
    '/accounts': {
      templateUrl: '/admin/account',
      controller: 'AccountCtrl'
    },
    '/classes': {
      templateUrl: '/admin/class',
      controller: 'AccountCtrl'
    },
    '/packages': {
      templateUrl: '/admin/package',
      controller: 'AccountCtrl'
    },
    '/instructors': {
      templateUrl: '/admin/instructor',
      controller: 'AccountCtrl'
    },
    '/schedules': {
      templateUrl: '/admin/schedule',
      controller: 'AccountCtrl'
    },
    '/sliders': {
      templateUrl: '/admin/slider',
      controller: 'AccountCtrl'
    }
  };

  angular.forEach(routes, function (route, path) {
    if (typeof route.resolve != 'object') {
      route.resolve = {};
    }
    // angular.extend(route.resolve, {
    //   user: function (AuthService) {
    //     return AuthService.setCurrentUser();
    //   }
    // });
    $routeProvider.when(path, route);
  });
  
  $routeProvider.otherwise({
    redirectTo: '/notfound'
  });
});