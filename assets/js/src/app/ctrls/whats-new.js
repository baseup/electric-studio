var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('WhatsnewCtrl', function ($scope, Instagram) {

  Instagram.fetchRecent(function (data) {
    $scope.instagram = data;
  });

});
