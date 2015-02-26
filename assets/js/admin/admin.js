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
      controller: 'AdminCtrl'
    },
    '/classes': {
      templateUrl: '/admin/class',
      controller: 'AdminCtrl'
    },
    '/packages': {
      templateUrl: '/admin/package',
      controller: 'AdminCtrl'
    },
    '/instructors': {
      templateUrl: '/admin/instructor',
      controller: 'AdminCtrl'
    },
    '/schedules': {
      templateUrl: '/admin/schedule',
      controller: 'AdminCtrl'
    },
    '/sliders': {
      templateUrl: '/admin/slider',
      controller: 'AdminCtrl'
    },
    '/analytics': {
      templateUrl: '/admin/analytics',
      controller: 'AdminCtrl'
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