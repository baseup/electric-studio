'use strict';

var ctrls = angular.module('elstudio.controllers.admin', [
  'elstudio.services'
]);

ctrls.controller('PackageCtrl', function ($scope, PackageService) {

  $scope.packages = PackageService.query();
  $scope.packages.$promise.then(function(data) {
    $scope.packages = data;
  });

  $scope.addPackage = function(){

    if($scope.newPackage) {
      if(!$scope.newPackage.name){
        alert("Package must have name")
        return;
      }
      
      if(!$scope.newPackage.fee){
        alert("Package must have price")
        return;
      }
      
      if(!$scope.newPackage.credits){
        alert("Package must have number of credits")
        return;
      }

      var addSuccess = function (){
        PackageService.query().$promise.then(function(data) {
          $scope.packages = data;
        });
      }

      var addFail = function(error){
        alert(error.data);
      }

      PackageService.create($scope.newPackage).$promise.then(addSuccess, addFail);
    }
  }

  $scope.setToUpdate = function(pac) {
    $scope.isUpdatePackage = true;
    $scope.updatePackage = pac;
  }

  $scope.cancelUpdatePackage = function(){
    $scope.isUpdatePackage = false;
    $scope.updatePackage = null;
  }

  $scope.setPackage = function(){

    if($scope.updatePackage) {
      var addSuccess = function (){
        PackageService.query().$promise.then(function(data) {
          $scope.packages = data;
        });
        $scope.isUpdatePackage = false;
        $scope.updatePackage = null;
      }

      var addFail = function(error){
        alert(error.data);
      }

      PackageService.update({ packageId: $scope.updatePackage.id }, $scope.updatePackage).$promise.then(addSuccess, addFail);
    }
  }

  $scope.removePackage = function(pac){
    var addSuccess = function (){
      PackageService.query().$promise.then(function(data) {
        $scope.packages = data;
      });
    }

    var addFail = function(error){
      alert(error.data);
    }

    PackageService.delete({packageId : pac.id}).$promise.then(addSuccess, addFail);
  }

});


ctrls.controller('InstructorCtrl', function ($scope, InstructorService) {

  $scope.instructors = InstructorService.query();
  $scope.instructors.$promise.then(function(data) {
    $scope.instructors = data;
  });

  $scope.addInstructor = function(){

    if($scope.newInstructor) {
      if(!$scope.newInstructor.first_name){
        alert("Package must have first name")
        return;
      }

      if(!$scope.newInstructor.last_name){
        alert("Package must have first name")
        return;
      }      
      
      if(!$scope.newInstructor.email){
        alert("Package must have emai")
        return;
      }
      
      if(!$scope.newInstructor.contact_number){
        alert("Package must have number of contact_number")
        return;
      }

      var addSuccess = function (data){
        InstructorService.query().$promise.then(function(data) {
          $scope.instructors = data;
        });
      }

      var addFail = function(error){
        alert(error.data);
      }

      InstructorService.create($scope.newInstructor).$promise.then(addSuccess, addFail);
    }
  }

  $scope.setToUpdate = function(ins) {
    $scope.isUpdateInstructor = true;
    $scope.updateInstructor = ins.admin;
    $scope.updateInstructor.id = ins.id;
    $scope.updateInstructor.gender = ins.gender;
    $scope.updateInstructor.birthdate = ins.birthdate.replace(" 00:00:00", "");
  }

  $scope.cancelUpdateInstructor = function(){
    $scope.isUpdateInstructor = false;
    $scope.updateInstructor = null;
  }

  $scope.setInstructor = function(){
    console.log($scope.updateInstructor)
    if($scope.updateInstructor) {
      var addSuccess = function (){
        InstructorService.query().$promise.then(function(data) {
          $scope.instructors = data;
        });
        $scope.isUpdateInstructor = false;
        $scope.updateInstructor = null;
      }

      var addFail = function(error){
        alert(error.data);
      }

      InstructorService.update({ instructorId: $scope.updateInstructor.id }, $scope.updateInstructor).$promise.then(addSuccess, addFail);
    }
  }

  $scope.removeInstructor = function(ins){
    var addSuccess = function (data){
      InstructorService.query().$promise.then(function(data) {
        $scope.instructors = data;
      });
    }

    var addFail = function(error){
      alert(error.data);
    }

    InstructorService.delete({instructorId : ins.id}).$promise.then(addSuccess, addFail);
  }

})