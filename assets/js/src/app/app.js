'use strict';

var app = angular.module('elstudio', [
  'ngRoute',
  'ngSanitize',
  'angular-amplitude',
  'elstudio.services',
  'elstudio.templates',
  'elstudio.controllers.site'
]);

app.config(function ($routeProvider, $httpProvider, webSocketProvider) {

  webSocketProvider.defaults.uri = ((location.protocol == 'https:') ? 'wss' : 'ws') + '://' + location.host + '/ws';

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
    '/schedule': {
      templateUrl: '/site/branch-select',
      controller: 'SiteCtrl'
    },
    '/schedule/:branch?': {
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
          token = '1505862477.1677ed0.25c54a82e464421d850bcb021c9311b8',
          endPoint = 'https://api.instagram.com/v1/users/' + userID + '/media/recent/?access_token='+ token +'&callback=JSON_CALLBACK';

      $http.jsonp(endPoint).success(function(response) {
        callback(response.data);
      });
    }
  }
});

app.directive('notificationBar', function($timeout, $rootScope, $window) {
  return {
    restrict: 'AE',
    scope: {
      message: '=',
      duration: '='
    },
    link: function(scope, element) {

      var timer;
      var messageContainer = angular.element('<div class="message"></div>');
      var closeBtn = angular.element('<div class="close-btn">x</div>');

      closeBtn.on('click', function() {
        element.removeClass('show');
        $timeout.cancel( timer );
        checkHeaderForm();
      });

      element.append(closeBtn);
      element.append(messageContainer);
      element.addClass('notification-bar');

      $rootScope.$on('notify', function(event, data) {
        if(!data.message) return;

        messageContainer.html(data.message);
        element.addClass('show');

        $timeout.cancel( timer );

        if(data.duration === false) {
          element.removeClass('show');
          $timeout.cancel( timer );
          checkHeaderForm();
        }

        if(data.duration && typeof data.duration === 'number') {
          timer = $timeout(function() {
            element.removeClass('show');
            checkHeaderForm();
          }, data.duration);
        }

        if(data.links && data.links.length > 0) {
          angular.forEach(data.links, function(link) {
            var btn = angular.element('<a href="' + link.href + '">' + link.title + '</a>');

            btn.on('click', function() {
              element.removeClass('show');
              $timeout.cancel( timer );
              checkHeaderForm();
            });

            messageContainer.append(btn);
          });
        }

        checkHeaderForm();
      });

      scope.$on('destroy', function() {
        $timeout.cancel( timer );
      });

      angular.element($window).on("scroll", function() {
        if($window.innerWidth >= 980 && $window.scrollY > angular.element('.main-header').height()) {
          element.addClass('fixed');
        } else {
          element.removeClass('fixed');
        }
      });

      function checkHeaderForm() {
        if($window.innerWidth >= 980
          && angular.element('.header-form-container').hasClass('show')
          && element.hasClass('show')) {
          angular.element('.header-form-container').addClass('notify');
        } else {
          angular.element('.header-form-container').removeClass('notify');
        }
      }
    }
  }
});

app.constant('amplitudeApiKey', '1a77c91810aa9471a646387c8ba8e6ba');
