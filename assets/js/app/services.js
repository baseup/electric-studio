'use strict';

var loginUser = window.localStorage.getItem('login-user');
var services = angular.module('elstudio.services', ['ngResource']);

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

services.factory('PackageService', function($resource) {
  return $resource('/api/package/:packageId', {}, {
    query: {
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

services.factory('InstructorService', function($resource) {
  return $resource('/api/instructor/:instructorId', {}, {
    query: {
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

services.factory('SharedService', function(){
  var records = {};
  return {
    set : function(key, value){
      records[key] = value;
    }, 
    get : function(key) {
      return records[key];
    }
  }
});
