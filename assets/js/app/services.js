'use strict';

var loginUser = window.localStorage.getItem('login-user');
var services = angular.module('elstudio.services', ['ngResource', 'ngWebSocket']);

services.factory('SliderService', function ($resource) {
  return $resource('/admin/slider/:sliderId', {}, {
    query: {
      method: 'GET',
      isArray: true
    }
  });
});

services.factory('UserService', function($resource) {
  return $resource('/api/user/:userId/:action', {}, {
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


services.factory('ForgotPasswordService', function($resource) {
  return $resource('/fpass/:user', {}, {
    send_email: {
      method: 'POST',
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

services.factory('GCRedeemService', function($resource) {
  return $resource('/redeem_gc', {}, {
    redeem: {
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
      if (!self._user && loginUser) {
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

services.factory('PackageService', function($resource) {
  return $resource('/api/package/:packageId', {}, {
    query: {
      method: 'GET',
      isArray: true
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

services.factory('UserPackageService', function($resource) {
  return $resource('/api/transaction/:transactionId', {}, {
    query: {
      method: 'GET',
      isArray: true
    }
  });
});


services.factory('ScheduleService', function($resource) {
  return $resource('/api/schedule/:scheduleId', {}, {
    query: {
      method: 'GET',
      isArray: false
    },
    get: {
      method: 'GET',
      isArray: false
    }
  });
});

services.factory('BookService', function($resource) {
  return $resource('/api/book/:bookId', {}, {
    query: {
      method: 'GET',
      isArray: true
    },
    update: {
      method: 'PUT',
      isArray: false
    },
    book: {
      method: 'POST',
      isArray: false
    }
  });
});

services.factory('HistoryService', function($resource) {
  return $resource('/api/history', {}, {
    query: {
      method: 'GET',
      isArray: false
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
    getWeekRelease: {
      method: 'GET',
      isArray: false,
      params: {
        key: 'week_release'
      }
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
