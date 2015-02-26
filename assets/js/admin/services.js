'use strict';

var services = angular.module('elstudio.services', ['ngResource']);

services.factory('UserService', function($resource) {
  return $resource('/api/user', {}, {
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