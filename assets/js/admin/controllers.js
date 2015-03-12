'use strict';

var ctrls = angular.module('elstudio.controllers.admin', [
  'elstudio.services',
  'angularFileUpload'
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

    PackageService.delete({packageId : pac._id}).$promise.then(addSuccess, addFail);
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
    }, function (error) {
      $.Notify({ content: error.data });
    });
  }
  
});


ctrls.controller('ClassCtrl', function ($scope, ClassService, UserService) {
  
  $scope.newBook = {};
  var dateToday = new Date();
  $scope.newBook.date = dateToday.getFullYear() + '-' + (dateToday.getMonth() + 1) +'-' + dateToday.getDate();

  angular.element('#class-tabs').Tab();

  $scope.reload = function () {
    ClassService.query({ date: $scope.newBook.date, time: $scope.newBook.time, sched_id: $scope.newBook.sched_id }, function (books) {
      $scope.books = books.bookings;
      $scope.schedDetails = books.schedule;
      if (books.schedules.length) {
        var selectize = angular.element('#select-class-time')[0].selectize;
        angular.forEach(books.schedules, function (sched) {
          selectize.addOption({ value: sched.id, text: sched.text });
        });
        if (!$scope.newBook.sched_id) {
          $scope.newBook.sched_id = books.schedules[0].id;
        }
      }
    });
  }
  $scope.reload();

  UserService.query(function (users) {
    $scope.users = users;
    var select = angular.element('#select-user-id')[0].selectize;
    angular.forEach(users, function (user) {
      select.addOption({ value: user._id, text: user.first_name + ' ' + user.last_name });
    });
  });

  $scope.selectRider = function () {
    for (var i in $scope.users) {
      if ($scope.users[i]._id == $scope.newBook.user_id) {
        $scope.selectedRider = $scope.users[i];
        break;
      }
    }
  }

  $scope.cancelBooking = function (booking, index) {
    $scope.books.splice(index, 1);
    ClassService.delete({ scheduleId: booking._id });
  }

  var select = angular.element('#select-bike-number')[0].selectize;
  for (var i = 1; i <= 37; i++) {
    select.addOption({ value: i, text: i });
  }

  $scope.sendNewBook = function () {
    ClassService.save($scope.newBook, function (savedBook) {
      $scope.reload();
    }, function (error) {
      $.Notify({ content: error.data });
    });
  }
  
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

  $scope.downloadBookingList = function () {
    window.location = '/admin/export/download-bookings?date=' + $scope.newBook.date + '&time=' + $scope.newBook.time;
  }
   
});


ctrls.controller('ScheduleCtrl', function ($scope, ScheduleService, InstructorService) {
  
  var calendar = angular.element('.calendar');
  calendar.fullCalendar({
    defaultView: 'agendaWeek',
    allDaySlot: false,
    allDay: false,
    minTime: '07:00:00',
    maxTime: '20:00:00',
    events: function (start, end, timezone, callback) {
      var events = [];
      ScheduleService.query({ start: start.unix(), end: end.unix() }, function (scheds) {
        $scope.schedules = scheds;
        angular.forEach(scheds, function (s, i) {
          s.index = i;
          events.push(s);
        });
        callback(events);
      });
    },
    eventClick: function (calEvent, jsEvent, view) {
      $scope.selectedSched = $scope.schedules[calEvent.index];
      $scope.editRegSched = {
        start: new Date(0, 0, 0, calEvent.start.hour(), calEvent.start.minute(), 0, 0),
        end: new Date(0, 0, 0, calEvent.end.hour(), calEvent.end.minute(), 0, 0),
        id: calEvent.id
      };
      if ($scope.selectedSched.type == 'regular') {
        angular.element('#edit-reg-sched-day')[0].selectize.setValue($scope.selectedSched.day);
      }
      angular.element('#edit-reg-class-instructor')[0].selectize.setValue($scope.selectedSched.instructor._id);
      $scope.$apply();
      angular.element('#view-schedule-modal').Modal();
    }
    // windowResize: function (view) {
    //   angular.element('.calendar').fullCalendar('changeView', 'agendaDay');
    // }
  });

  $scope.updateRegularSchedule = function () {
    var updatedSched = angular.copy($scope.editRegSched);
    updatedSched.start = updatedSched.start.getHours() + ':' + updatedSched.start.getMinutes();
    updatedSched.end = updatedSched.end.getHours() + ':' + updatedSched.end.getMinutes();
    ScheduleService.update(
      { scheduleId: updatedSched.id },
      updatedSched,
      function (response) {
        calendar.fullCalendar('refetchEvents');
      },
      function (error) {
        $.Notify({ content: error.data });
      }
    );
  }
  
  $scope.addSpecialSchedule = function () {
    angular.element('#add-special-sched-modal').Modal();
  }

  $scope.addRegularSchedule = function () {
    angular.element('#add-regular-sched-modal').Modal();
  }

  $scope.saveRegularSchedule = function () {
    var newSched = angular.copy($scope.newRegSched);
    newSched.start = newSched.start.getHours() + ':' + newSched.start.getMinutes();
    newSched.end = newSched.end.getHours() + ':' + newSched.end.getMinutes();
    ScheduleService.save(newSched, function (response) {
      calendar.fullCalendar('refetchEvents');
      $scope.newRegSched = {};
    }, function (error) {
      $.Notify({ content: error.data });
      $scope.newRegSched = {};
    });
  }

  $scope.removeSchedule = function (sched) {
    ScheduleService.delete({ scheduleId: sched.id });
    calendar.fullCalendar('removeEvents', sched.id);
  }

  $scope.editSchedule = function (sched) {
    angular.element('#edit-regular-sched-modal').Modal();
  }

  $scope.saveSpecialSchedule = function () {
    var newSched = angular.copy($scope.newSpecSched);
    newSched.start = newSched.start.getHours() + ':' + newSched.start.getMinutes();
    newSched.end = newSched.end.getHours() + ':' + newSched.end.getMinutes();
    ScheduleService.save(newSched, function (response) {
      calendar.fullCalendar('refetchEvents');
      $scope.newSpecSched = {};
    }, function (error) {
      $.Notify({ content: error.data });
      $scope.newSpecSched = {};
    });
  }

  InstructorService.query(function (instructors) {
    var regSelectize = angular.element('#add-reg-class-instructor')[0].selectize;
    var specSelectize = angular.element('#add-spec-class-instructor')[0].selectize;
    var editRegInstructor = angular.element('#edit-reg-class-instructor')[0].selectize;
    angular.forEach(instructors, function (instructor) {
      regSelectize.addOption({ value: instructor._id, text: instructor.admin.first_name + ' ' + instructor.admin.last_name });
      specSelectize.addOption({ value: instructor._id, text: instructor.admin.first_name + ' ' + instructor.admin.last_name });
      editRegInstructor.addOption({ value: instructor._id, text: instructor.admin.first_name + ' ' + instructor.admin.last_name });
    });
  });
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

ctrls.controller('InstructorCtrl', function ($scope, $upload, InstructorService) {

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

  $scope.picInstructor = null;
  $scope.changeInsPic = function(ins){
    if(!$scope.uploading){
      $scope.picInstructor = ins;
    }
  }

  $scope.chkChangePic = function(id){
    if($scope.picInstructor && $scope.picInstructor._id == id){
      return true;
    }
    return false;
  }

  $scope.cancelChangePic = function(){
    $scope.picInstructor = null;
  }

  $scope.uploading = false;
  $scope.uploadInsPic = function(files){

    if(files && files[0]){
      var file = files[0];
      if (['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) < 0) {
        alert('Invalid file type');
        return;
      } else if (file.size > (1024 * 1024 * 3)) {
        alert('Must not exceed 3MB');
        return;
      }

      $scope.uploading = true;
      $upload.upload({
        url: '/upload/instructor',
        method: 'POST',
        data: { 'id' :$scope.picInstructor._id },
        file: file
      }).then(
        function (e) {
          $scope.instructors = InstructorService.query();
          $scope.instructors.$promise.then(function (data) {
            $scope.instructors = data;
          });
          $scope.picInstructor = null;
          $scope.uploading = false;
        },
        function (e) {
          $scope.uploading = false;
          alert(e.data);
        },
        function (e) {
          $scope.progress = parseInt(100.0 * e.loaded / e.total);
        }
      );
    } else {
      alert('Please select image to upload');
    }
  }

  $scope.setToUpdate = function (ins) {
    $scope.isUpdateInstructor = true;
    $scope.updateInstructor = ins.admin;
    $scope.updateInstructor._id = ins._id;
    $scope.updateInstructor.gender = ins.gender;
    $scope.updateInstructor.motto = ins.motto;
    if(ins.birthdate){
      $scope.updateInstructor.birthdate = ins.birthdate.replace(' 00:00:00', '');
    }else{
      $scope.updateInstructor.birthdate = '';
    }
  }

  $scope.cancelUpdateInstructor = function () {
    $scope.isUpdateInstructor = false;
    $scope.updateInstructor = null;
  }

  $scope.setInstructor = function () {
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

      InstructorService.update({ instructorId: $scope.updateInstructor._id }, $scope.updateInstructor).$promise.then(addSuccess, addFail);
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

    InstructorService.delete({instructorId : ins._id}).$promise.then(addSuccess, addFail);
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