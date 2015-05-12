'use strict';

var loginUser = window.localStorage.getItem('login-user');
var services = angular.module('elstudio.services', ['ngResource']);

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
