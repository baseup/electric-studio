'use strict';

var loginUser = window.localStorage.getItem('login-user');
var services = angular.module('elstudio.services', ['ngResource', 'ngWebSocket']);

services.factory('UserService', function($resource) {
  return $resource('/admin/user/:userId/:action', {}, {
    logout: {
      method: 'GET',
      params: { userId: 'logout' }
    },
    get: {
      method: 'GET',
      isArray: false,
      params: {
        userId: loginUser
      }
    },
    create: {
      method: 'POST',
      isArray: false
    },
    update: {
      method: 'PUT',
      isArray: false
    },
    delete: {
      method: 'DELETE',
      isArray: false
    }
  });
});

services.factory('EmailVerifyService', function($resource) {
  return $resource('/verify/:user', {}, {
    email_verify: {
      method: 'POST',
      isArray: false
    }
  });
});

services.factory('AuthService', function (UserService) {
  return {
    _user: null,
    setCurrentUser: function (cb) {
      var self = this;
      if (!self._user) {
        var checkUser = UserService.get(function (user) {
          self._user = user;
          if (typeof cb == 'function') {
            cb(user);
          }
        });
        return checkUser.$promise;
      }
    },
    getCurrentUser: function () {
      return this._user;
    },
    updateCurrentUser: function (user) {
      this._user = user;
    }
  };
});

services.factory('SecurityService', function($resource) {
  return $resource('/admin/security', {}, {
    check: {
      method: 'POST',
      isArray: false
    },
  });
});

services.factory('PackageService', function($resource) {
  return $resource('/admin/package/:packageId', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
    update: {
      method: 'PUT',
      isArray: false
    },
    create: {
      method: 'POST',
      isArray: false
    },
    delete: {
      method: 'DELETE',
      isArray: false
    }
  });
});

services.factory('AdminService', function($resource) {
  return $resource('/api/admin/:adminId', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
    update: {
      method: 'PUT',
      isArray: false
    },
    create: {
      method: 'POST',
      isArray: false
    },
    delete: {
      method: 'DELETE',
      isArray: false
    }
  });
});

services.factory('InstructorService', function($resource) {
  return $resource('/api/instructor/:instructorId', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
    update: {
      method: 'PUT',
      isArray: false
    },
    create: {
      method: 'POST',
      isArray: false
    },
    delete: {
      method: 'DELETE',
      isArray: false
    }
  });
});

services.factory('LandingPageService', function($resource) {
  return $resource('/api/landing/:landingPageId', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
    update: {
      method: 'PUT',
      isArray: false
    },
    create: {
      method: 'POST',
      isArray: false
    },
    delete: {
      method: 'DELETE',
      isArray: false
    }
  });
});

services.factory('GiftCardService', function($resource) {
  return $resource('/api/gift_certificate/:gcCode', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
    redeem:{
      method: 'PUT',
      isArray: false
    },
    create:{
      method: 'POST',
      isArray: false
    }
  });
});

services.factory('TransactionService', function ($resource) {
  return $resource('/admin/transaction/:transactionId', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
    get: {
      method: 'GET',
      isArray: false
    },
    update: {
      method: 'PUT',
      isArray: false
    },
    create: {
      method: 'POST',
      isArray: false
    },
    delete: {
      method: 'DELETE',
      isArray: false
    }
  });
});

services.factory('ClassTypeService', function ($resource) {
  return $resource('/admin/class/types/:typeId', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
    update: {
      method: 'PUT',
      isArray: false
    },
    create: {
      method: 'POST',
      isArray: false
    },
    delete: {
      method: 'DELETE',
      isArray: false
    }
  });
});

services.factory('ScheduleService', function ($resource) {
  return $resource('/admin/instructor/schedules/:scheduleId', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
    update: {
      method: 'PUT'
    }
  });
});

services.factory('ClassService', function ($resource) {
  return $resource('/admin/schedule/:scheduleId', {}, {
    query: {
      method: 'GET',
      isArray: false
    },
    update: {
      method: 'PUT'
    }
  });
});

services.factory('AccessService', function ($resource) {
  return $resource('/admin/access/:accessId', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
  });
});

services.factory('PrivilegeService', function ($resource) {
  return $resource('/admin/privileges', {}, {
    query: {
      method: 'GET',
      isArray: false
    },
  });
});

services.factory('StatisticService', function ($resource) {
  return $resource('/admin/statistic', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
  });
});

services.factory('SliderService', function ($resource) {
  return $resource('/admin/slider/:sliderId', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
    update: {
      method: 'PUT'
    }
  });
});

services.factory('SettingService', function ($resource) {
  return $resource('/admin/setting/:key', {}, {
    getBlockedBikes: {
      method: 'GET',
      isArray: false,
      params: {
        key: 'blocked_bikes'
      }
    },
    update: {
      method: 'PUT'
    },

    delBlockedBikes: {
      method: 'DELETE'
    }
  });
});

services.factory('SharedService', function(){
  var records = {};
  return {
    set : function(key, value){
      records[key] = value;
    },
    get : function(key) {
      return records[key];
    },
    clear : function(key) {
      delete records[key];
    }
  }
});

services.provider('webSocket', function() {
  this.defaults = {
    uri: ''
  };

  var isWebSocketSupported = 'WebSocket' in window && window.WebSocket.CLOSING === 2;

  if (!isWebSocketSupported) {
    window.console && console.warn('WebSockets NOT supported');
  }

  this.$get = function($websocket) {
    var defaults = this.defaults;

    var Service = function() {
      this.HEARTBEAT = '--heartbeat--';
    };

    // subscribe and publish must be one of `broadcast`, `group`, `user`, `session` or `any`
    // echo toggles message echoing, default is true
    //
    // ```js
    //   var socket = WebSocketProvider.connect({
    //    facility: 'foobar',
    //    subscribe: ['broadcast', 'user'],
    //    publish: ['any'],
    //    echo: true
    //   });
    // ```
    Service.prototype.connect = function(opts) {
      if (!isWebSocketSupported || defaults.uri === '') {
        return false;
      }

      var params = [],
          _this = this,
          socket;

      var attempts = 1,
          timer;

      var heartbeatInterval = null,
          missedHeartbeats = 0;

      opts = angular.extend({}, {
        facility: '',
        subscribe: [],
        publish: [],
        echo: true
      }, opts);

      for (var i = 0; i < opts.subscribe.length; i++) {
        params.push('subscribe-' + opts.subscribe[i]);
      }

      for (var i = 0; i < opts.publish.length; i++) {
        params.push('publish-' + opts.publish[i]);
      }

      if (opts.echo) {
        params.push('echo');
      }

      function connect() {
        socket = $websocket(defaults.uri + '/' + opts.facility + '?' + params.join('&'));
        socket.onOpen(onOpen);
        socket.onMessage(onMessage);
        socket.onClose(onClose);
      }

      function tryToReconnect() {
        if (!timer) {
          window.console && console.info('Reconnecting...');

          var interval = generateInterval(attempts);

          timer = setTimeout(function() {
            attempts++;
            connect();
          }, interval);
        }
      }

      function onOpen() {
        if (heartbeatInterval === null) {
          missedHeartbeats = 0;
          heartbeatInterval = setInterval(function() {
            try {
              missedHeartbeats++;

              if (missedHeartbeats >= 3) {
                throw new Error('Too many missed heartbeats.');
              }

              socket.send(_this.HEARTBEAT);
            } catch(e) {
              clearInterval(heartbeatInterval);
              heartbeatInterval = null;

              window.console && console.warn('Closing connection. Reason: ' + e.message);

              socket.close(true);
            }
          }, 5000);
        }
      }

      function onMessage(message) {
        if (message.data === _this.HEARTBEAT) {
          missedHeartbeats = 0;
          return;
        }
      }

      function onClose() {
        tryToReconnect();
      }

      // this code is borrowed from http://blog.johnryding.com/post/78544969349/
      //
      // Generate an interval that is randomly between 0 and 2^k - 1, where k is
      // the number of connection attmpts, with a maximum interval of 30 seconds,
      // so it starts at 0 - 1 seconds and maxes out at 0 - 30 seconds
      function generateInterval(k) {
        var maxInterval = (Math.pow(2, k) - 1) * 1000;

        // If the generated interval is more than 30 seconds, truncate it down to 30 seconds.
        if (maxInterval > 30 * 1000) {
          maxInterval = 30 * 1000;
        }

        // generate the interval to a random number between 0 and the maxInterval determined from above
        return Math.random() * maxInterval;
      }

      connect();

      return socket;
    };

    return new Service();
  };
});
