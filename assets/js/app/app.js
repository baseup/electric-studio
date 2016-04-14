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
    '/class/bgc': {
      templateUrl: '/site/class-bgc',
      controller: 'SiteCtrl'
    },
    '/class/salcedo': {
      templateUrl: '/site/class-salcedo',
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
    // '/schedule/bgc': {
    //   templateUrl: '/site/schedule-bgc',
    //   controller: 'SiteCtrl'
    // },
    '/schedule/:branch': {
      templateUrl: '/site/schedule2',
      controller: 'SiteCtrl'
    },
    '/whats-new': {
      templateUrl: '/site/whats-new',
      controller: 'SiteCtrl'
    },
    '/workouts': {
      templateUrl: '/site/workouts',
      controller: 'SiteCtrl'
    },
    '/history': {
      templateUrl: '/site/history',
      controller: 'SiteCtrl'
    },
    '/gift-cards': {
      templateUrl: '/site/gc-buy',
      controller: 'SiteCtrl'
    },
    '/redeem-gc': {
      templateUrl: '/site/gc-redeem',
      controller: 'SiteCtrl'
    },
    '/terms': {
      templateUrl: '/site/terms',
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

app.filter('capitalize', function() {
  return function(input) {
    if (input) {
      input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    }
  }
});

app.filter('formatTime', function() {
  return function(time) {
    if (time) {
      var parts = time.split(/[^0-9]/);
      var date =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      return hours + ':' + minutes + ' ' + ampm;
    } else {
      return time;
    }
  };
});

app.filter('formatDate', function() {
  return function(date) {
    if(date){
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      var parts = date.split(/[^0-9]/);
      var date =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
      return day[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
    } else {
      return date;
    }
  };
});

app.filter('addDay', function() {
  return function(date, days) {
    if (date) {
      var parts = date.split(/[^0-9]/);
      var newDate =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
      newDate.setTime(newDate.getTime() +  (days * 24 * 60 * 60 * 1000));
      return newDate.toISOString();
    } else {
      return date;
    }
  };
});

app.factory('Instagram', function($http) {
  return {
    fetchRecent: function(callback) {
      var userID = '1505862477',
          clientID = 'e6be793a6b2d4618a0efc919862a53f3',
          endPoint = 'https://api.instagram.com/v1/users/' + userID + '/media/recent/?client_id='+ clientID +'&callback=JSON_CALLBACK';

      $http.jsonp(endPoint).success(function(response) {
        callback(response.data);
      });
    }
  }
});
