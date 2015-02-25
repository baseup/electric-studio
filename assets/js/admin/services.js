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