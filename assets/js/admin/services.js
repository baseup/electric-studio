'use strict';

var loginUser = window.localStorage.getItem('login-user');
var services = angular.module('elstudio.services', ['ngResource']);

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

services.factory('TransactionService', function ($resource) {
  return $resource('/admin/transaction/:transactionId', {}, {
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
    setBlockedBikes: {
      method: 'PUT'
    },
    delBlockedBikes: {
      method: 'DELETE'
    }
  })
});

