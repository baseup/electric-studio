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
        $.Alert('Package must have name')
        return;
      }
      
      if (!$scope.newPackage.fee) {
        $.Alert('Package must have price')
        return;
      }
      
      if (!$scope.newPackage.credits) {
        $.Alert('Package must have number of credits')
        return;
      }

      var addSuccess = function () {
        PackageService.query().$promise.then(function (data) {
          $scope.packages = data;
        });
        $scope.newPackage = null;
      }

      var addFail = function (error) {
        $.Alert(error.data);
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
        $.Alert(error.data);
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
      $.Alert(error.data);
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

  $scope.verifyAccount = function (user) {
    var username = user.first_name + ' ' + user.last_name;
    $.Confirm('Are you sure to verify account ' + username + ' - ' + user.email, function () {

      var verifySuccess = function () {
        $.Alert('Successfully verify account ' + username)
        UserService.query(function (users) {
          $scope.users = users;
        });
      }

      var verifyFailed = function (error) {
        $.Alert(error.data);
      }
      UserService.update({ userId: user._id }, { verify: true }, verifySuccess, verifyFailed);
    });
  }

  $scope.selectPackage = function (packageId) {
    for (var i in $scope.packages) {
      if ($scope.packages[i]._id == packageId) {
        $scope.newCredits.expiration = $scope.packages[i].expiration;
        break;
      }
    }
  }

  $scope.setPackage = function (packageId) {
    for (var i in $scope.packages) {
      if ($scope.packages[i]._id == packageId) {
        $scope.newPackage = $scope.packages[i];
        break;
      }
    }
  }

  $scope.accountAddClass = function (user) {
    $scope.newCredits.user_id = user._id;
    $scope.selectedAccount = user;
    angular.element('#add-class-modal').Modal();
  }

  $scope.buyPackageModal = function (user) {
    $scope.selectedAccount = user;
    if(!(user.billing instanceof Object)){
      $scope.selectedAccount.billing = JSON.parse(user.billing);
    }
    angular.element('#buy-package-modal').Modal();
  }

  $scope.confirmBilling = function () {
    if ($scope.newPackage) {
      angular.element('#billing-preview-modal').Modal();
    } else {
      $.Alert("Please select a package");
    }
  }

  $scope.buyPackage = function () {

    if ($scope.selectedAccount.billing && 
        $scope.selectedAccount.billing != 'null') {
      if ($scope.selectedAccount.billing.first_name &&
          $scope.selectedAccount.billing.last_name &&
          $scope.selectedAccount.billing.address &&
          $scope.selectedAccount.billing.city &&
          $scope.selectedAccount.billing.province &&
          $scope.selectedAccount.billing.postalcode &&
          $scope.selectedAccount.billing.email &&
          $scope.selectedAccount.billing.card_number  &&
          $scope.selectedAccount.billing.card_type &&
          $scope.selectedAccount.billing.card_expiration &&
          $scope.selectedAccount.billing.csc) {
        window.location = '/admin/buy?pid=' + $scope.newPackage._id + '&uid=' + $scope.selectedAccount._id + '&success=True';      
      } else {
        $.Alert('Billing information is not complete to process the transaction')
      }
    }


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

  $scope.frozeModal = function (user) {
    $scope.selectedAccount = user;
    angular.element('#froze-account-modal').Modal();
  }

  $scope.freezeAccount = function () {
    if ($scope.selectedAccount && $scope.frozeReason && $scope.frozeReason.length > 0) {
      var account_name = $scope.selectedAccount.first_name + ' ' + $scope.selectedAccount.last_name;
      $.Confirm('Are you sure on freezing (' + account_name + ') account?', function () {

        var freezeSuccess = function () {
          $.Alert('Successfully freeze account ' + account_name)
          UserService.query(function (users) {
            $scope.users = users;
          });
        }

        var freezeFailed = function (error) {
          $.Alert(error.data);
        }

        UserService.update({ userId: $scope.selectedAccount._id }, { froze_account: $scope.frozeReason }, freezeSuccess, freezeFailed);
      });
    } else {
      $.Alert('Please input a reason on freezing an account');
    }
  }

  $scope.unFrozeAccount = function (user) {
    var name = user.first_name + ' ' + user.last_name;
    $.Confirm('Are you sure on unfrozing ' + name + ' account ?', function () {

      var unFrozeSuccess = function () {
        $.Alert('Successfully unfreeze account ' + name)
        UserService.query(function (users) {
          $scope.users = users;
        });
      }

      var unFrozeFailed = function (error) {
        $.Alert(error.data);
      }

      UserService.update({ userId: user._id }, { unfroze: true }, unFrozeSuccess, unFrozeFailed);
    });
  }
  
});


ctrls.controller('ClassCtrl', function ($scope, ClassService, UserService) {
  
  $scope.newBook = {};
  var dateToday = new Date();
  $scope.newBook.date = dateToday.getFullYear() + '-' + (dateToday.getMonth() + 1) +'-' + dateToday.getDate();

  angular.element('#class-tabs').Tab();

  $scope.reloadDate = function () {
    angular.element('#select-class-time')[0].selectize.clearOptions();
    $scope.reload();
  }

  $scope.reload = function () {
    $scope.books = null;
    $scope.waitList = null;
    $scope.schedDetails = null;
    $scope.newBook.sched_id = null;
    ClassService.query({ date: $scope.newBook.date, time: $scope.newBook.time, sched_id: $scope.newBook.sched_id }, function (books) {
      $scope.books = books.bookings;
      $scope.waitList = books.waitlist;
      $scope.schedDetails = books.schedule;
      if (books.schedules.length) {
        var selectize = angular.element('#select-class-time')[0].selectize;
        angular.forEach(books.schedules, function (sched) {
          selectize.addOption({ value: sched.id, text: sched.text });
        });
        if (!$scope.newBook.sched_id) {
          selectize.setValue(books.schedules[0].id);
          $scope.newBook.sched_id = books.schedules[0].id;
          ClassService.query({ date: $scope.newBook.date, sched_id: $scope.newBook.sched_id, seats: true }, function (seats) {
            if (seats.available.length) {
              angular.element('#select-bike-number')[0].selectize.clearOptions();
              var selectbike = angular.element('#select-bike-number')[0].selectize;
              selectbike.settings.sortField = 'text';
              angular.forEach(seats.available, function (seat) {
                selectbike.addOption({ value: seat, text: seat });
              }); 
            }
          });
        }
      }
    });
  }
  $scope.reloadDate();

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
  select.settings.sortField = 'text';
  for (var i = 1; i <= 37; i++) {
    select.addOption({ value: i, text: i });
  }

  $scope.sendNewBook = function () {

    var now = new Date();
    var parts = $scope.schedDetails.start.split(/[^0-9]/);
    var dTime =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
    var hours = dTime.getHours();
    var minutes = dTime.getMinutes();
    var chkDate = new Date($scope.newBook.date);
    chkDate.setHours(hours - 1, minutes, 0, 0);
    if (chkDate < now){
      $.Notify({ content: "Booking should be 1 hour before" });
      return;
    }

    var nextMonth = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());
    if (chkDate > nextMonth) {
      $.Notify({ content: "Booking 1 month in advance is prohibited" });
      return;
    }

    ClassService.save($scope.newBook, function (savedBook) {
      $scope.reload();
    }, function (error) {
      $.Notify({ content: error.data });
    });
  }
  
  $scope.bookRide = function () {
    if ($scope.newBook.sched_id) {
      angular.element('#book-ride-modal').Modal();
    } else {
      $.Alert('Please select schedule date and time');
    }
  }
  
  $scope.switchBike = function () {
    angular.element('#switch-bike-modal').Modal();
  }
  
  $scope.moveToClass = function (wait) {
    ClassService.query({ date: $scope.newBook.date, sched_id: $scope.newBook.sched_id, seats: true }, function (seats) {
      $scope.selectedWaitList = wait;
      if (seats.available.length) {
        var selectize = angular.element('#select-seat')[0].selectize;
        selectize.settings.sortField = 'text';
        angular.forEach(seats.available, function (seat) {
          selectize.addOption({ value: seat, text: seat });
        });
        
        angular.element('#move-to-class-modal').Modal();
      }else{
        $.Notify({ content: 'No seats available' });    
      }
    });
    
  }

  $scope.bookWaitList = function(){
    ClassService.update({ scheduleId: $scope.selectedWaitList._id }, { move_to_seat : $scope.selectedWaitList.seat_number }, function(){
      $scope.reload();
    }, function(error){
      $.Notify({ content: error.data });
    });
  }
  
  $scope.removeFromWaitlist = function (wait, index) {
    $scope.waitList.splice(index, 1);
    ClassService.delete({ scheduleId: wait._id });
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
    minTime: '05:00:00',
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
      $scope.editSched = {
        date: calEvent.start.year() + '-' + (calEvent.start.month() + 1) + '-' + calEvent.start.date(),
        start: new Date(0, 0, 0, calEvent.start.hour(), calEvent.start.minute(), 0, 0),
        end: new Date(0, 0, 0, calEvent.end.hour(), calEvent.end.minute(), 0, 0),
        id: calEvent.id
      };
      angular.element('#edit-class-instructor')[0].selectize.setValue($scope.selectedSched.instructor._id);
      $scope.$apply();
      angular.element('#view-schedule-modal').Modal();
    }
    // windowResize: function (view) {
    //   angular.element('.calendar').fullCalendar('changeView', 'agendaDay');
    // }
  });

  // $scope.updateRegularSchedule = function () {
  //   var updatedSched = angular.copy($scope.editRegSched);
  //   updatedSched.start = updatedSched.start.getHours() + ':' + updatedSched.start.getMinutes();
  //   updatedSched.end = updatedSched.end.getHours() + ':' + updatedSched.end.getMinutes();
  //   ScheduleService.update(
  //     { scheduleId: updatedSched.id },
  //     updatedSched,
  //     function (response) {
  //       calendar.fullCalendar('refetchEvents');
  //     },
  //     function (error) {
  //       $.Notify({ content: error.data });
  //     }
  //   );
  // }
  
  $scope.addSchedule = function () {
    angular.element('#add-sched-modal').Modal();
  }

  // $scope.addRegularSchedule = function () {
  //   angular.element('#add-regular-sched-modal').Modal();
  // }

  // $scope.saveRegularSchedule = function () {
  //   var newSched = angular.copy($scope.newRegSched);
  //   newSched.start = newSched.start.getHours() + ':' + newSched.start.getMinutes();
  //   newSched.end = newSched.end.getHours() + ':' + newSched.end.getMinutes();
  //   ScheduleService.save(newSched, function (response) {
  //     calendar.fullCalendar('refetchEvents');
  //     $scope.newRegSched = {};
  //   }, function (error) {
  //     $.Notify({ content: error.data });
  //     $scope.newRegSched = {};
  //   });
  // }

  $scope.removeSchedule = function (sched) {
    ScheduleService.delete({ scheduleId: sched.id });
    calendar.fullCalendar('removeEvents', sched.id);
  }

  $scope.editSchedule = function (sched) {
    angular.element('#edit-sched-modal').Modal();
  }

  $scope.saveSchedule = function () {
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

  $scope.updateSchedule = function () {
    var updatedSched = angular.copy($scope.editSched);
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

  InstructorService.query(function (instructors) {
    // var regSelectize = angular.element('#add-reg-class-instructor')[0].selectize;
    var specSelectize = angular.element('#add-class-instructor')[0].selectize;
    var editInstructor = angular.element('#edit-class-instructor')[0].selectize;
    angular.forEach(instructors, function (instructor) {
      // regSelectize.addOption({ value: instructor._id, text: instructor.admin.first_name + ' ' + instructor.admin.last_name });
      specSelectize.addOption({ value: instructor._id, text: instructor.admin.first_name + ' ' + instructor.admin.last_name });
      editInstructor.addOption({ value: instructor._id, text: instructor.admin.first_name + ' ' + instructor.admin.last_name });
    });
  });
});


ctrls.controller('SliderCtrl', function ($scope, $upload, SliderService) {
  
  $scope.sliders = SliderService.query();
  $scope.sliders.$promise.then(function (data) {
    $scope.sliders = data;
  });

  angular.element('#class-tabs').Tab();

  $scope.addSlide = function () {
    angular.element('#add-slide-modal').Modal();
  }

  $scope.uploadImage = function(files, type){
    if(files && files[0]){
      var file = files[0];
      if (['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) < 0) {
        $.Alert('Invalid file type');
        return;
      } else if (file.size > (1024 * 1024 * 3)) {
        $.Alert('Must not exceed 3MB');
        return;
      }

      $upload.upload({
        url: '/upload/images',
        method: 'POST',
        data: { 'type' : type },
        file: file
      }).then(
        function (e) {
          $("#" + type).attr("src", $("#" + type).attr("src")+"?timestamp=" + new Date().getTime());
        },
        function (e) {
          $scope.uploading = false;
          $.Alert(e.data);
        },
        function (e) {
          var progress = parseInt(100.0 * e.loaded / e.total);
          if(progress < 100)
          $.Notify({ content: 'Uploading (' + progress + '%)' });
        }
      );
    }
  }

  $scope.uploadSlider = function(files){
    if(files && files[0]){
      var file = files[0];
      if (['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) < 0) {
        $.Alert('Invalid file type');
        return;
      } else if (file.size > (1024 * 1024 * 3)) {
        $.Alert('Must not exceed 3MB');
        return;
      }
      $scope.toUploadFile = file;
    }else{
      $scope.toUploadFile = null;
    }
  }

  $scope.saveSlider = function(){
    if($scope.toUploadFile &&
       $scope.newSlider && $scope.newSlider.text){
      $scope.uploading = true;
      $upload.upload({
        url: '/admin/slider',
        method: 'POST',
        data: { 'text' : $scope.newSlider.text },
        file: $scope.toUploadFile
      }).then(
        function (e) {
          $scope.sliders = SliderService.query();
          $scope.sliders.$promise.then(function (data) {
            $scope.sliders = data;
          });
          $scope.toUploadFile = null;
          $scope.uploading = false;
        },
        function (e) {
          $scope.uploading = false;
          $.Alert(e.data);
        },
        function (e) {
          var progress = parseInt(100.0 * e.loaded / e.total);
          if(progress < 100)
          $.Notify({ content: 'Uploading (' + progress + '%)' });
        }
      );
    } else {
      $.Notify({ content: 'Please upload a file and input a text.' });
    }
  }

  $scope.updateSliderImg = null;
  $scope.changeSliderImg = function(slider){
    if(!$scope.uploading){
      $scope.updateSliderImg = slider;
    }
  }

  $scope.chkChangeImg = function(id){
    if($scope.updateSliderImg && $scope.updateSliderImg._id == id){
      return true;
    }
    return false;
  }

  $scope.cancelChangeImg = function(){
    $scope.updateSliderImg = null;
  }

  $scope.updateSlider = function(){
    if($scope.toUploadFile ||
       ($scope.updateSliderImg && $scope.updateSliderImg.text)){
      $scope.uploading = true;
      $upload.upload({
        url: '/admin/slider/' + $scope.updateSliderImg._id,
        method: 'PUT',
        data: { 'text' : $scope.updateSliderImg.text },
        file: $scope.toUploadFile
      }).then(
        function (e) {
          $scope.sliders = SliderService.query();
          $scope.sliders.$promise.then(function (data) {
            $scope.sliders = data;
          });
          $scope.updateSliderImg = null;
          $scope.uploading = false;
        },
        function (e) {
          $scope.uploading = false;
          $.Alert(e.data);
        },
        function (e) {
          var progress = parseInt(100.0 * e.loaded / e.total);
          if(progress < 100)
          $.Notify({ content: 'Uploading (' + progress + '%)' });
        }
      );
    }
  }

  $scope.removeSlider = function(slider){
    SliderService.delete({ sliderId: slider._id });
    $scope.sliders = SliderService.query();
    $scope.sliders.$promise.then(function (data) {
      $scope.sliders = data;
    });
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
        $.Alert('Package must have first name')
        return;
      }

      if (!$scope.newInstructor.last_name) {
        $.Alert('Package must have last name')
        return;
      }      
      
      if (!$scope.newInstructor.email) {
        $.Alert('Package must have email')
        return;
      }
      
      if (!$scope.newInstructor.contact_number) {
        $.Alert('Package must have number of contact_number')
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
        $.Alert(error.data);
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
        $.Alert('Invalid file type');
        return;
      } else if (file.size > (1024 * 1024 * 3)) {
        $.Alert('Must not exceed 3MB');
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
          $.Alert(e.data);
        },
        function (e) {
          $scope.progress = parseInt(100.0 * e.loaded / e.total);
        }
      );
    } else {
      $.Alert('Please select image to upload');
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
        $.Alert(error.data);
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
      $.Alert(error.data);
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
      if(pack) select.addOption({ value: pack._id, text: pack.name });
    });
  });
});

ctrls.controller('StatisticCtrl', function ($scope, StatisticService, InstructorService) {

  $scope.stats = StatisticService.query();
  $scope.stats.$promise.then(function (data) {
    $scope.stats = data;
  });

  var from_input = angular.element('#input_from').pickadate({
      format: 'yyyy-mm-dd',
      formatSubmit: 'yyyy-mm-dd',
      today: false
    }), from_picker = from_input.pickadate('picker')

  var to_input = angular.element('#input_to').pickadate({
      format: 'yyyy-mm-dd',
      formatSubmit: 'yyyy-mm-dd',
      today: false
    }), to_picker = to_input.pickadate('picker')


  var date = new Date();
  from_picker.set('select', new Date());
  to_picker.set('select', [date.getFullYear(), date.getMonth(), date.getDate() + 7]);

  // Check if there’s a “from” or “to” date to start with.
  if ( from_picker.get('value') ) {
    to_picker.set('min', from_picker.get('select'));
  }
  if ( to_picker.get('value') ) {
    from_picker.set('max', to_picker.get('select'));
  }

  // When something is selected, update the “from” and “to” limits.
  from_picker.on('set', function(event) {
    if ( event.select ) {
      to_picker.set('min', from_picker.get('select'));
    }
    else if ( 'clear' in event ) {
      to_picker.set('min', false);
    }
  });
  to_picker.on('set', function(event) {
    if ( event.select ) {
      from_picker.set('max', to_picker.get('select'));
    }
    else if ( 'clear' in event ) {
      from_picker.set('max', false);
    }
  });


  angular.element('#filter-date').click(function () {
    $scope.$apply(function () {
      var fromDate = angular.element('#input_from').val();
      var toDate = angular.element('#input_to').val();
      $scope.stats = StatisticService.query({ fromDate:fromDate, toDate:toDate });
      $scope.stats.$promise.then(function (data) {
        $scope.stats = data;
      });
    });
  });

  $scope.viewUserList = function (stat) {
    $scope.selectedStat = stat;
    angular.element('#list-users-modal').Modal();
  }

  InstructorService.query(function (instructors) {
    var select = angular.element('#search-instructor')[0].selectize;

    angular.forEach(instructors, function (ins) {
      if(ins) select.addOption({ value: ins._id, text: ins.admin.first_name + ' ' + ins.admin.last_name });
    });
  });

  angular.element('#checkAS').click(function(){
    $scope.$apply(function () {
      $scope.availableSeats = !$scope.availableSeats;
    });
  })

  $scope.withAvailableSeats = function(stat){
    if ( !$scope.availableSeats ) {
      return stat._books.length == 37;
    } 

    return true;
  }

});