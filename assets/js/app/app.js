'use strict';

var app = angular.module('elstudio', [
  'ngRoute',
  'ngSanitize',
  'elstudio.services', 
  'elstudio.templates',
  'elstudio.controllers.site'
]);

app.config(function ($routeProvider, $httpProvider) {
  
  var routes = {
    '/': {
      templateUrl: '/site/index',
      controller: 'SiteCtrl'
    },
    '/about': {
      templateUrl: '/site/about',
      controller: 'SiteCtrl'
    },
    '/account': {
      templateUrl: '/site/account',
      controller: 'SiteCtrl'
    },
    '/reserved': {
      templateUrl: '/site/reservation',
      controller: 'SiteCtrl'
    },
    '/career': {
      templateUrl: '/site/career',
      controller: 'SiteCtrl'
    },
    '/class': {
      templateUrl: '/site/class',
      controller: 'SiteCtrl'
    },
    '/contact': {
      templateUrl: '/site/contact',
      controller: 'SiteCtrl'
    },
    '/faq': {
      templateUrl: '/site/faq',
      controller: 'SiteCtrl'
    },
    '/first-ride': {
      templateUrl: '/site/first-ride',
      controller: 'SiteCtrl'
    },
    '/instructors': {
      templateUrl: '/site/instructors',
      controller: 'SiteCtrl'
    },
    '/rates-and-packages': {
      redirectTo: '/rates'
    },
    '/rates': {
      templateUrl: '/site/rates',
      controller: 'SiteCtrl'
    },
    '/rewards': {
      templateUrl: '/site/rewards',
      controller: 'SiteCtrl'
    },
    '/schedule': {
      templateUrl: '/site/schedule',
      controller: 'SiteCtrl'
    },
    '/whats-new': {
      templateUrl: '/site/whats-new',
      controller: 'SiteCtrl'
    },
    '/workouts': {
      templateUrl: '/site/workouts',
      controller: 'SiteCtrl'
    }
  };

  angular.forEach(routes, function (route, path, AuthService) {
    if (typeof route.resolve != 'object') {
      route.resolve = {};
    }
    angular.extend(route.resolve, {
      user: function (AuthService) {
        return AuthService.setCurrentUser();
      }
    });
    $routeProvider.when(path, route);
  });
  
  $routeProvider.otherwise({
    redirectTo: '/notfound'
  });
});
var compareTo = 
 
app.directive("compareTo", function() {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue == scope.otherModelValue;
      };
      scope.$watch("otherModelValue", function() {
        ngModel.$validate();
      });
    }
  };
});

app.filter('formatTime', function() {
  return function(time) {

    var date = new Date(time.replace(' ', 'T'));
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + ampm;
  };
});

app.filter('formatDate', function() {
  return function(date) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(date);
    return months[date.getMonth()] + ', ' + date.getDate() + ' ' + date.getFullYear();
  };
});