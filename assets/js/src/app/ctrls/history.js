var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('HistoryCtrl', function ($scope, $routeParams, HistoryService) {
  if (!$scope.loginUser) {
    $location.path('/');
    angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
    angular.element('.login-toggle').click();
  } else {

    $('#history-tabs').Tab();

    $scope.currentScheds = 0;
    $scope.currentTrans = 0;

    $scope.histories = HistoryService.query();
    $scope.histories.$promise.then(function (data) {
      $scope.histories = data;
    });

    $scope.prevScheds = function (event) {
      if ($scope.currentScheds > 0) {
        $scope.currentScheds -= 1;
        $scope.histories = HistoryService.query({ schedPage : $scope.currentScheds });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }
      event.preventDefault();
    }

    $scope.nextScheds = function (event) {
      if ($scope.currentScheds < parseInt($scope.histories.schedsTotal)) {
        $scope.currentScheds += 1;
        $scope.histories = HistoryService.query({ schedPage : $scope.currentScheds });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }
      event.preventDefault();
    }

    $scope.prevTrans = function (event) {
      if ($scope.currentTrans > 0) {
        $scope.currentTrans -= 1;
        $scope.histories = HistoryService.query({ transPage : $scope.currentTrans });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }
      event.preventDefault();
    }

    $scope.nextTrans = function (event) {
      if ($scope.currentTrans < parseInt($scope.histories.transTotal)) {
        $scope.currentTrans += 1;
        $scope.histories = HistoryService.query({ transPage : $scope.currentTrans });
        $scope.histories.$promise.then(function (data) {
          $scope.histories = data;
        });
      }
      event.preventDefault();
    }
  }

});
