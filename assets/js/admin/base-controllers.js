'use strict';

var ctrls = angular.module('elstudio.controllers.base', [
  'elstudio.services'
]);

ctrls.controller('NotFoundCtrl', function ($scope) {

});

ctrls.controller('AdminCtrl', function ($scope, PrivilegeService){

    $scope.access = PrivilegeService.query();
    $scope.access.$promise.then(function (data) {
      $scope.access = data.privileges;
    });
    
    angular.element('.sidebar-toggle').off('click').on('click', function() {
      angular.element('.page-sidebar').toggleClass('toggle');
    });
    
    //apply selectize on all `.select` element
    angular.element('.select').selectize({
      create: true
      // sortField: 'text'
    });

    angular.element('.dashboard-menu').Dropdown();
    angular.element('.classes-menu').Dropdown();
    angular.element('.giftcard-menu').Dropdown();
  
    angular.element('.datepicker').pickadate({
      labelMonthNext: 'Go to the next month',
      labelMonthPrev: 'Go to the previous month',
      labelMonthSelect: 'Pick a month from the dropdown',
      labelYearSelect: 'Pick a year from the dropdown',
      selectMonths: true,
      selectYears: 20,
      format: 'yyyy-mm-dd',
      formatSubmit: 'yyyy-mm-dd',
      today: false
    });

    $scope.getAccess = function (module, action) {
      if ($scope.access && $scope.access[module]){
        return $scope.access[module].indexOf(action) >= 0;
      }
      return false;
    }
  
});