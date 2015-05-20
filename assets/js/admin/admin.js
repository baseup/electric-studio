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
    '/users': {
      templateUrl: '/admin/users',
      controller: 'AdminCtrl'
    },
    '/transactions': {
      templateUrl: '/admin/transactions',
      controller: 'AdminCtrl'
    },
    '/statistics': {
      templateUrl: '/admin/statistics',
      controller: 'AdminCtrl'
    },
    '/settings': {
      templateUrl: '/admin/settings',
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

app.directive('disableOutsideScroll', function () {
 return {
   restrict: 'A',
   link: function (scope, element, attrs) {

     element.bind('mousewheel DOMMouseScroll', function (e) {
       var e0 = e.originalEvent,
         delta = e0.wheelDelta || -e0.detail;

       this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
       e.preventDefault();
     });
   }
 };
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
      var parts = date.split(/[^0-9]/);
      var date =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
      return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
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
    var properties = null;
    var propStrArr = null;
    if(propertyString.indexOf(',') > -1) {
      propStrArr = propertyString.split(',');
    } else {
      properties = parseString(propertyString);
    }

    return $filter('filter')(array, function(item){
      if (target != null && target.length > 0 && target !='--') {
        if (propStrArr) {
          for (var i in propStrArr) {
            var value = null;
            if (propStrArr[i].indexOf('+')) {
              var concat = propStrArr[i].split('+')
              for (var c in concat) {
                if (concat[c].trim().length > 0){
                  value += getValue(item, parseString(concat[c]));
                } else {
                  value += concat[c]
                }
              }
            } else {
              properties = parseString(propStrArr[i]);
              value = getValue(item, properties);
            }
            if (value && value.toLowerCase().indexOf(target.toLowerCase()) > -1) {
              return true;
            }
          }
        } else {
          var val = null;
          if (propertyString.indexOf('+')) {
            var concat = propertyString.split('+')
            for (var c in concat) {
              if (concat[c].trim().length > 0){
                val += getValue(item, parseString(concat[c]));
              } else {
                val += concat[c]
              }
            }
          } else {
            val = getValue(item, properties);
          }

          if (val) {
            return val.toLowerCase().indexOf(target.toLowerCase()) > -1;
          }
        }
      } else {
        return true;
      }

    });
  }
})