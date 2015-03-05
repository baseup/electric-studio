'use strict';

var ctrls = angular.module('elstudio.controllers.admin', [
  'elstudio.services'
]);

ctrls.controller('PackageCtrl', function ($scope, PackageService) {

  $scope.showAddPackage = function () {
    angular.element('#add-package-modal').Modal();
  }

  $scope.packages = PackageService.query();
  $scope.packages.$promise.then(function (data) {
    $scope.packages = data;
  });

  $scope.addPackage = function () {

    if ($scope.newPackage) {
      if (!$scope.newPackage.name) {
        alert('Package must have name')
        return;
      }
      
      if (!$scope.newPackage.fee) {
        alert('Package must have price')
        return;
      }
      
      if (!$scope.newPackage.credits) {
        alert('Package must have number of credits')
        return;
      }

      var addSuccess = function () {
        PackageService.query().$promise.then(function (data) {
          $scope.packages = data;
        });
        $scope.newPackage = null;
      }

      var addFail = function (error) {
        alert(error.data);
      }

      PackageService.create($scope.newPackage).$promise.then(addSuccess, addFail);
    }
  }

  $scope.setToUpdate = function (pac) {
    $scope.isUpdatePackage = true;
    $scope.updatePackage = pac;
  }

  $scope.cancelUpdatePackage = function () {
    $scope.isUpdatePackage = false;
    $scope.updatePackage = null;
  }

  $scope.setPackage = function () {

    if ($scope.updatePackage) {
      var addSuccess = function () {
        PackageService.query().$promise.then(function (data) {
          $scope.packages = data;
        });
        $scope.isUpdatePackage = false;
        $scope.updatePackage = null;
      }

      var addFail = function (error) {
        alert(error.data);
      }

      PackageService.update({ packageId: $scope.updatePackage._id }, $scope.updatePackage).$promise.then(addSuccess, addFail);
    }
  }

  $scope.removePackage = function (pac) {
    var addSuccess = function () {
      PackageService.query().$promise.then(function (data) {
        $scope.packages = data;
      });
    }

    var addFail = function (error) {
      alert(error.data);
    }

    PackageService.delete({packageId : pac.id}).$promise.then(addSuccess, addFail);
  }
});

ctrls.controller('AccountCtrl', function ($scope, UserService, PackageService, TransactionService) {

  $scope.newCredits = {};

  UserService.query(function (users) {
    $scope.users = users;
  });

  var select = angular.element('#select-add-package')[0].selectize;
  PackageService.query(function (packages) {
    $scope.packages = packages;
    angular.forEach(packages, function (pack) {
      select.addOption({ value: pack._id, text: pack.name });
    });
  });

  $scope.selectPackage = function (packageId) {
    for (var i in $scope.packages) {
      if ($scope.packages[i]._id == packageId) {
        $scope.newCredits.expiration = $scope.packages[i].expiration;
        break;
      }
    }
  }

  $scope.accountAddClass = function (user) {
    $scope.newCredits.user_id = user._id;
    $scope.selectedAccount = user;
    angular.element('#add-class-modal').Modal();
  }
  
  $scope.accountSummary = function (user) {
    $scope.selectedAccount = user;
    UserService.get({ userId: user._id }, function (summary) {
      $scope.selectedAccount = summary;
    });
    angular.element('#account-summary-modal').Modal();
  }

  $scope.saveNewCredits = function () {
    $scope.saving = true;
    TransactionService.save($scope.newCredits, function (credits) {
      $scope.saving = false;
      $scope.newCredits = {};
      $scope.selectedAccount.credits += credits.credit_count
    });
  }
  
});


ctrls.controller('ClassCtrl', function ($scope) {
  
  angular.element('#class-tabs').Tab();
  
  $scope.bookRide = function () {
    angular.element('#book-ride-modal').Modal();
  }
  
  $scope.switchBike = function () {
    angular.element('#switch-bike-modal').Modal();
  }
  
  $scope.moveToClass = function () {
    $.Notify({ content: 'User moved to class' });
  }
  
  $scope.removeFromWaitlist = function () {
    $.Notify({ content: 'User removed from Waitlist' });
  }
   
});


ctrls.controller('ScheduleCtrl', function ($scope) {
  
  angular.element('.calendar').fullCalendar({
    defaultView: 'agendaWeek',
    allDaySlot: false,
    allDay: false,
    minTime: '07:00:00',
    maxTime: '20:00:00',
    events: [
      {
        title: 'Pure Electric',
        start: '2015-02-22T08:30:00',
      },
      {
        title: 'Power Hour',
        start: '2015-02-22T10:30:00'
      },
      {
        title: 'Pure Electric',
        start: '2015-02-23T08:30:00',
      },
      {
        title: 'Power Hour',
        start: '2015-02-23T11:30:00'
      },
      {
        title: 'Pure Electric',
        start: '2015-02-24T10:30:00',
      },
      {
        title: 'Power Hour',
        start: '2015-02-24T16:30:00'
      },
      {
        title: 'Pure Electric',
        start: '2015-02-25T08:30:00',
      },
      {
        title: 'Power Hour',
        start: '2015-02-25T10:30:00'
      }
    ],
    eventClick: function () {
      angular.element('#view-schedule-modal').Modal();
    },
    windowResize: function (view) {
      angular.element('.calendar').fullCalendar('changeView', 'agendaDay');
    }
  });
  
  $scope.addSchedule = function () {
    angular.element('#add-schedule-modal').Modal();
  }
  
});


ctrls.controller('SliderCtrl', function ($scope) {
  
  $scope.addSlide = function () {
    angular.element('#add-slide-modal').Modal();
  }
  
});

ctrls.controller('AnalyticsCtrl', function ($scope) {
  
  /* Analytics demo using Chart.js */

  // Global Defaults
  Chart.defaults.global.responsive = true;

  // Line Chart
  var salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'First dataset',
        fillColor: 'rgba(203,200,199,0.2)',
        strokeColor: 'rgba(203,200,199,1)',
        pointColor: 'rgba(203,200,199,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'Second dataset',
        fillColor: 'rgba(255,143,28,0.2)',
        strokeColor: 'rgba(255,143,28,1)',
        pointColor: 'rgba(255,143,28,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

  var sales = angular.element('#sales')[0].getContext('2d');

  var salesChart = new Chart(sales).Line(salesData);


  // Dougnut Chart
  var posData = [
    {
      value: 266,
      color:'#ff8f1c',
      highlight: 'rgba(255,143,28,0.7)',
      label: 'In-Store'
    },
    {
      value: 42,
      color: '#cbc8c7',
      highlight: 'rgba(203,200,199,0.7)',
      label: 'Mail-Order'
    },
    {
      value: 144,
      color: '#666',
      highlight: 'rgba(102,102,102,0.7)',
      label: 'Website'
    }
  ];

  var pos = angular.element('#pos')[0].getContext('2d');

  var posChart = new Chart(pos).Doughnut(posData);


  // Bar Chart
  var signupData = {
    labels: ['1 Pax', '5 Pax', '10 Pax', '15 Pax', '20 Pax', '30 Pax'],
    datasets: [
      {
        label: 'Second dataset',
        fillColor: 'rgba(203,200,199,0.2)',
        strokeColor: 'rgba(203,200,199,0.7)',
        highlightFill: 'rgba(203,200,199,0.4)',
        highlightStroke: 'rgba(203,200,199,8)',
        data: [60, 42, 76, 68, 40, 40]
      },
      {
        label: 'First dataset',
        fillColor: 'rgba(255,143,28,0.2)',
        strokeColor: 'rgba(255,143,28,0.7)',
        highlightFill: 'rgba(255,143,28,0.4)',
        highlightStroke: 'rgba(255,143,28,8)',
        data: [65, 59, 70, 67, 56, 10]
      }
    ]
  };

  var signup = angular.element('#package')[0].getContext('2d');

  var signupChart = new Chart(signup).Bar(signupData, { barValueSpacing: 10 });

});

ctrls.controller('InstructorCtrl', function ($scope, InstructorService) {

   $scope.showAddInstructor = function () {
    angular.element('#add-instructor-modal').Modal();
  }

  $scope.instructors = InstructorService.query();
  $scope.instructors.$promise.then(function (data) {
    $scope.instructors = data;
  });

  $scope.addInstructor = function () {
    
    angular.element('#add-instructor-modal').Modal();
    
    if ($scope.newInstructor) {
      if (!$scope.newInstructor.first_name) {
        alert('Package must have first name')
        return;
      }

      if (!$scope.newInstructor.last_name) {
        alert('Package must have last name')
        return;
      }      
      
      if (!$scope.newInstructor.email) {
        alert('Package must have email')
        return;
      }
      
      if (!$scope.newInstructor.contact_number) {
        alert('Package must have number of contact_number')
        return;
      }

      if (!$scope.newInstructor.gender)
        $scope.newInstructor.gender = 'male';

      var addSuccess = function (data) {
        InstructorService.query().$promise.then(function (data) {
          $scope.instructors = data;
        });
        $scope.newInstructor = null;
      }

      var addFail = function (error) {
        alert(error.data);
      }

      InstructorService.create($scope.newInstructor).$promise.then(addSuccess, addFail);
    }
  }

  $scope.setToUpdate = function (ins) {
    $scope.isUpdateInstructor = true;
    $scope.updateInstructor = ins.admin;
    $scope.updateInstructor.id = ins.id;
    $scope.updateInstructor.gender = ins.gender;
    $scope.updateInstructor.birthdate = ins.birthdate.replace(' 00:00:00', '');
  }

  $scope.cancelUpdateInstructor = function () {
    $scope.isUpdateInstructor = false;
    $scope.updateInstructor = null;
  }

  $scope.setInstructor = function () {
    console.log($scope.updateInstructor)
    if ($scope.updateInstructor) {
      var addSuccess = function () {
        InstructorService.query().$promise.then(function (data) {
          $scope.instructors = data;
        });
        $scope.isUpdateInstructor = false;
        $scope.updateInstructor = null;
      }

      var addFail = function (error) {
        alert(error.data);
      }

      InstructorService.update({ instructorId: $scope.updateInstructor.id }, $scope.updateInstructor).$promise.then(addSuccess, addFail);
    }
  }

  $scope.removeInstructor = function (ins) {
    var addSuccess = function (data) {
      InstructorService.query().$promise.then(function (data) {
        $scope.instructors = data;
      });
    }

    var addFail = function (error) {
      alert(error.data);
    }

    InstructorService.delete({instructorId : ins.id}).$promise.then(addSuccess, addFail);
  }

});

ctrls.controller('TransactionsCtrl', function ($scope, TransactionService, PackageService) {

  $scope.transactions = TransactionService.query();
  $scope.transactions.$promise.then(function (data) {
    $scope.transactions = data;
  });

  PackageService.query(function (packages) {
    var select = angular.element('#search-trans-package')[0].selectize;
    angular.forEach(packages, function (pack) {
      select.addOption({ value: pack._id, text: pack.name });
    });
  });
});