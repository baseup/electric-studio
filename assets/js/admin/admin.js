'use strict';

var app = angular.module('elstudio-admin', [
  'ngRoute',
  'ngSanitize',
  'elstudio.services', 
  'elstudio.templates',
  'elstudio.controllers.base',
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
    '/analytics': {
      templateUrl: '/admin/analytics',
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
    '/transactions': {
      templateUrl: '/admin/transactions',
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

app.filter('search', function($filter){

  var parseString = function(input){
    if(input)
      return input.split(".");
  }

  function getValue(element, propertyArray) {
    var value = element;
      angular.forEach(propertyArray, function(property) {
        if(value) value = value[property];
      });

    return value;
  }

  return function (array, propertyString, target) {
    var properties = parseString(propertyString);
    return $filter('filter')(array, function(item){
      if(target != null && target.length > 0){
        return getValue(item, properties) == target;
      } else {
        return true;
      }

    });
  }
})