'use strict';

var ctrls = angular.module('elstudio.controllers.base', [
  'elstudio.services'
]);

ctrls.controller('NotFoundCtrl', function ($scope) {

});

ctrls.controller('AdminCtrl', function ($scope){
    
    angular.element('.sidebar-toggle').off('click').on('click', function() {
      angular.element('.page-sidebar').toggleClass('toggle');
    });
    
    //apply selectize on all `.select` element
    angular.element('.select').selectize({
      create: true,
      sortField: 'text'
    });

    angular.element('.dashboard-menu').Dropdown();
  
});