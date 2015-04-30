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
    $.Confirm('Are you sure on deleting ' + pac.name + ' ?', function () {
      var addSuccess = function () {
        PackageService.query().$promise.then(function (data) {
          $scope.packages = data;
        });
      }

      var addFail = function (error) {
        $.Alert(error.data);
      }

      PackageService.delete({packageId : pac._id}).$promise.then(addSuccess, addFail);
    });
  }
});

ctrls.controller('AccountCtrl', function ($scope, $timeout, $location, UserService, PackageService, TransactionService, ClassService, SecurityService) {

  
  var qstring = $location.search();
  if (qstring.s) {
    if (qstring.s == 'success' && qstring.pname) {
      $.Alert('Success! You have bought ' + qstring.pname + ' package for ' + qstring.u);
    } else if (qstring.s == 'exists') {
      $.Alert('Transaction already exists');
    } else if (qstring.s == 'error') {
      $.Alert('Transaction failed');
    }
    $location.search({ s: null, pname: null });
  }

  $scope.newCredits = {};

  UserService.query(function (users) {
    $scope.users = users;
  });

  var select = angular.element('#select-add-package')[0].selectize;
  var selectBuy = angular.element('#select-buy-package')[0].selectize;
  PackageService.query(function (packages) {
    $scope.packages = packages;
    angular.forEach(packages, function (pack) {
      select.addOption({ value: pack._id, text: pack.name });
      selectBuy.addOption({ value: pack._id, text: pack.name });
    });
  });

  $scope.showAddAccount = function () {
    angular.element('#add-account-modal').Modal();
  }

  $scope.addAccount = function () {
    if ($scope.newAccount) {
      if (!$scope.newAccount.email || $scope.newAccount.email.length == 0) {
        $.Alert('Email Address is required');
        return;
      }

      if (!$scope.newAccount.password || $scope.newAccount.password.length == 0) {
        $.Alert('Password is required');
        return;
      }

      if ($scope.newAccount.password && $scope.newAccount.password.length < 6) {
        $.Alert('Password must be 6 characters');
        return;
      }

      if ($scope.newAccount.password != $scope.newAccount.confirm_password) {
        $.Alert("Password didn't match");
        return;
      }

      var registerSuccess = function () {
        $.Alert('Successfully added new account')
        UserService.query(function (users) {
          $scope.users = users;
        });
        angular.element('#close-add-account').click();
      }

      var registerFail = function (error) {
        $scope.registered = false;

        var errorMsg = error.data
        if (errorMsg.split(' ').length === 2) {
          errorMsg = errorMsg + ' is required';
        }

        $.Alert(errorMsg);
      }

      UserService.create($scope.newAccount).$promise.then(registerSuccess, registerFail);
    } else {
      $.Alert('Please fill form to add account')
    }
  }

  $scope.accountInfo = function (user) {
    $scope.selectedInfo = user;

    UserService.get({ userId : user._id }, function (userInfo) {
      $scope.selectedInfo = userInfo;
      if ($scope.selectedInfo.birthdate) {
        $scope.selectedInfo.birthdate = $scope.selectedInfo.birthdate.replace(' 00:00:00', '');
      }

      angular.element('#account-info-modal').Modal();
    });
  }

  $scope.updateAccountInfo = function () {
    if ($scope.selectedInfo) {
      var updateSuccess = function () {
        $.Alert('Successfully updated account information.');
      }

      var updateFail = function (error) {
        $.Alert(error.data)
      }

      delete $scope.selectedInfo.billing;
      UserService.update({ userId: $scope.selectedInfo._id }, $scope.selectedInfo).$promise.then(updateSuccess, updateFail);
    }
  }

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

  $scope.deleteAccount = function (user, index) {
    $.Confirm('Are you sure you want to delete ' + user.first_name + ' ' + user.last_name + ' account?<br/>(THIS ACTION CANNOT BE UNDONE)' , function () {
      chkSecurity(function () {
        $scope.users.splice(index, 1);
        UserService.delete({ userId: user._id });
      });
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
    chkSecurity(function () {
      $scope.newCredits.user_id = user._id;
      $scope.selectedAccount = user;
      angular.element('#add-class-modal').Modal();
    });
  }

  $scope.buyPackageModal = function (user) {

    var port = '';
    if (window.location.port)
      port = ':' + window.location.port;

    $scope.redirectUrl = window.location.protocol + '//' + window.location.hostname + port +'/admin/buy';

    chkSecurity(function () {
      $scope.selectedAccount = user;
      if (!($scope.selectedAccount.billing instanceof Object)) {
        $scope.selectedAccount.billing = JSON.parse($scope.selectedAccount.billing);
        if (!($scope.selectedAccount.billing instanceof Object)) {
          $scope.selectedAccount.billing = {};
        } 
      }
      angular.element('#buy-package-modal').Modal();
    });
  }

  var chkSecurity = function (securityCallback) {

    $('#btn-security').off('click');
    $('#btn-security').click(function () {
      $scope.$apply(function () {
        if ($scope.securityPass) {
          SecurityService.check({ sudopass: $scope.securityPass }, function () {
            securityCallback();
            $scope.securityPass = null;
          }, function (error) {
            $.Alert(error.data);
            $scope.securityPass = null;
          });
        } else {
          $.Alert('Access Denied');
          $scope.securityPass = null;
        }
      });
    });

    $('#security-check-modal').Modal();
  }

  $scope.confirmBilling = function () {
    if ($scope.newPackage) {
      angular.element('#billing-preview-modal').Modal();
    } else {
      $.Alert('Please select a package');
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
          $scope.selectedAccount.billing.phone_a &&
          $scope.selectedAccount.billing.phone_b &&
          $scope.selectedAccount.billing.phone_c &&
          $scope.selectedAccount.billing.card_number  &&
          $scope.selectedAccount.billing.card_type &&
          $scope.selectedAccount.billing.card_expiration &&
          $scope.selectedAccount.billing.csc) {

        var billingSuccess = function () {
        $.Alert('Successfully save billing information. Now were redirecting you to paypal');
          angular.element('#admin-pay-form').submit();
        }

        var billingFail = function (error) {
          $.Alert(error.data)
        }
        UserService.update({ userId: $scope.selectedAccount._id }, { billing: $scope.selectedAccount.billing }).$promise.then(billingSuccess, billingFail);
        
      } else {
        $.Alert('Billing information is not complete to process the transaction');
        $timeout(function () {
          angular.element('#billing-preview-modal').Modal();
        }, 10);
      }
    } else {
      $.Alert('Please provide billing information');
      $timeout(function () {
        angular.element('#billing-preview-modal').Modal();
      }, 10);
    }
  }
  
  $scope.accountSummary = function (user) {
    $scope.selectedAccount = user;
    UserService.get({ userId: user._id }, function (summary) {
      $scope.selectedAccount = summary;
    });
    angular.element('#account-summary-modal').Modal();
  }

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

  // Check if there’s a “from” or “to” date to start with.
  if (from_picker.get('value')) {
    to_picker.set('min', from_picker.get('select'));
  }
  if (to_picker.get('value')) {
    from_picker.set('max', to_picker.get('select'));
  }

  // When something is selected, update the “from” and “to” limits.
  from_picker.on('set', function (event) {
    if (event.select) {
      to_picker.set('min', from_picker.get('select'));
    }
    else if ('clear' in event) {
      to_picker.set('min', false);
    }
  });
  to_picker.on('set', function (event) {
    if (event.select) {
      from_picker.set('max', to_picker.get('select'));
    }
    else if ('clear' in event) {
      from_picker.set('max', false);
    }
  });  

  $scope.moveBikeModal = function (book) {
    ClassService.query({ date: book.date.replace(' 00:00:00',''), sched_id: book.schedule._id, seats: true }, function (seats) {
      $scope.selectedBook = book;
      if (seats.available.length) {
        var selectize = angular.element('#switch-seat')[0].selectize;
        selectize.settings.sortField = 'text';
        angular.forEach(seats.available, function (seat) {
          selectize.addOption({ value: seat, text: seat });
        });

        angular.element('#switch-bike-modal').Modal();
      } else {
        $.Notify({ content: 'No seats available to switch' });    
      }
    });
  }

  $scope.moveBike = function () {
    if ($scope.selectedBike) {
      var confirm_msg = 'Are you sure to switch you bike (' + $scope.selectedBook.seat_number + ') to ' + $scope.selectedBike + '?';
      $.Confirm(confirm_msg, function () {
        ClassService.update({ scheduleId: $scope.selectedBook._id }, { move_to_seat : $scope.selectedBike }, function () {
          $scope.filterSchedDate($scope.selectedAccount);
        }, function (error) {
          $.Notify({ content: error.data });
        });
      });
    } else {
      $.Alert('Please select bike to switch')
    }
  }

  $scope.cancelWaitlist = function (index, sched) {
    ClassService.delete({ scheduleId: sched._id }, function () {
      $scope.filterSchedDate($scope.selectedAccount);
      $.Alert('Successfully canceled waitlisted schedule');
    });

  }

  $scope.filterSchedDate = function (user) {
    if ($scope.schedFilter) {
      var fromDate = $scope.schedFilter.fromDate;
      var toDate = $scope.schedFilter.toDate;
      UserService.get({ userId: user._id, books: true, fromDate: fromDate, toDate: toDate }, function (userWithScheds) {
        $scope.selectedAccount = userWithScheds;
      });
    } else {
      $.Alert('Please select a valid date values');
    }
  }

  $scope.accountSchedules = function (user) {
    $scope.selectedAccount = user;
    var date = new Date();
    from_picker.set('select', new Date());
    to_picker.set('select', [date.getFullYear(), date.getMonth(), date.getDate() + 7]);
    $scope.schedFilter = {};
    $scope.schedFilter.fromDate = from_picker.get('value');
    $scope.schedFilter.toDate = to_picker.get('value');
    UserService.get({ userId: user._id, books: true }, function (userWithScheds) {
      $scope.selectedAccount = userWithScheds;
      angular.element('#account-schedules-modal').Modal();
    });
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

  $scope.downloadUserAccounts = function () {
    var emailFilter = $scope.searchText;
    if (!emailFilter) {
      emailFilter = '';
    }
    window.location = '/admin/export/download-user-accounts?email=' + emailFilter
  }
  
});


ctrls.controller('ClassCtrl', function ($scope, $timeout, ClassService, UserService, SettingService) {
  
  $scope.newBook = {};
  var dateToday = new Date();
  $scope.newBook.date = dateToday.getFullYear() + '-' + (dateToday.getMonth() + 1) +'-' + dateToday.getDate();

  angular.element('#class-tabs').Tab();

  $scope.reloadDate = function () {
    angular.element('#select-class-time')[0].selectize.clearOptions();
    $scope.newBook.sched_id = null;
    $scope.newBook.time = null;
    $scope.reload();
  }

  $scope.reload = function () {
    $scope.books = null;
    $scope.waitList = null;
    $scope.schedDetails = null;
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
          $timeout(function () {
            selectize.setValue(books.schedules[0].id);
          }, 400);
        } 
      }
    });
  }
  $scope.reloadDate();

  UserService.query(function (users) {
    $scope.users = users;
    var select = angular.element('#select-user-id')[0].selectize;
    var selectWaitlist = angular.element('#select-waitlist-user')[0].selectize;
    angular.forEach(users, function (user) {
      select.addOption({ value: user._id, text: user.first_name + ' ' + user.last_name + ' - ' + user.email });
      selectWaitlist.addOption({ value: user._id, text: user.first_name + ' ' + user.last_name + ' - ' + user.email });
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

  $scope.selectWaitlistRider = function () {
    for (var i in $scope.users) {
      if ($scope.users[i]._id == $scope.newWaitlist.user_id) {
        $scope.selectedRider = $scope.users[i];
        break;
      }
    }
  }

  $scope.isCompleted = function (sched) {

    var now = new Date();
    var dateParts = sched.date.split(/[^0-9]/);
    var timeParts = sched.start.split(/[^0-9]/);
    var date =  new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[3], timeParts[4], timeParts[5]);
    if (date < now)
      return true;

    return false

  }

  $scope.missedBooking = function (booking, index) {
    if (!$scope.isCompleted(booking.schedule)) {
      $.Confirm('Are you sure on marking ' + booking.user_id.first_name + ' ' + booking.user_id.last_name + ' ride as MISSED ? (THIS CANNOT BE UNDONE)', function () {
        $scope.books.splice(index, 1);
        ClassService.delete({ scheduleId: booking._id, missed: true });
      });
    } else {
      $.Notify({ content: 'Not allow to modify, This schedule is completed' });
    }
  }

  $scope.cancelBooking = function (booking, index) {
    if (!$scope.isCompleted(booking.schedule)) {
      $.Confirm('Are you sure on cancelling ' + booking.user_id.first_name + ' ' + booking.user_id.last_name + ' ride ?', function () {
        $.Prompt('Notes on cancelling ' + booking.user_id.first_name + ' ride', function (notes) {
          if (notes && notes.length > 0) {
            $scope.books.splice(index, 1);
            ClassService.delete({ scheduleId: booking._id, notes: notes });
          } else {
            $.Alert('Please provide a notes on cancelling schedules');
          }
        });
      });
    } else {
      $.Notify({ content: 'Not allow to modify, This schedule is completed' });
    }
  }

  $scope.sendNewBook = function () {

    var now = new Date();
    var parts = $scope.schedDetails.start.split(/[^0-9]/);
    var dTime =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
    var hours = dTime.getHours();
    var minutes = dTime.getMinutes();
    var chkDate = new Date($scope.newBook.date);
    chkDate.setHours(hours, minutes, 0, 0);
    if (chkDate < now) {
      $.Notify({ content: 'Booking is not allowed anymore' });
      return;
    }

    var nextMonth = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());
    if (chkDate > nextMonth) {
      $.Notify({ content: 'Booking 1 month in advance is prohibited' });
      return;
    }

    ClassService.save($scope.newBook, function (savedBook) {
      $scope.reload();
    }, function (error) {
      $.Notify({ content: error.data });
    });
  }

  $scope.addNewWaitlist = function () {
    var now = new Date();
    var parts = $scope.schedDetails.start.split(/[^0-9]/);
    var dTime =  new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
    var hours = dTime.getHours();
    var minutes = dTime.getMinutes();
    var chkDate = new Date($scope.newWaitlist.date);
    chkDate.setHours(hours, minutes, 0, 0);
    if (chkDate < now) {
      $.Notify({ content: 'This schedule is completed' });
      return;
    }

    $scope.newWaitlist.status = 'waitlisted';
    ClassService.save($scope.newWaitlist, function (savedBook) {
      $scope.reload();
    }, function (error) {
      $.Notify({ content: error.data });
    });
  }
  
  $scope.bookRide = function () {
    if ($scope.newBook.sched_id) {
      if (!$scope.isCompleted($scope.schedDetails)) {
        ClassService.query({ date: $scope.newBook.date, sched_id: $scope.newBook.sched_id, seats: true }, function (seats) {
          if (seats.available.length) {
            angular.element('#select-bike-number')[0].selectize.clearOptions();
            var selectbike = angular.element('#select-bike-number')[0].selectize;
            selectbike.settings.sortField = 'text';
            angular.forEach(seats.available, function (seat) {
              selectbike.addOption({ value: seat, text: seat });
            }); 
            angular.element('#book-ride-modal').Modal();
          } else {
            $.Alert('No available seats');
          }
        });
      } else {
        $.Notify({ content: 'Not allow to modify, This schedule is completed' });
      }
    } else {
      $.Alert('Please select schedule date and time');
    }
  }

  $scope.addWaitlistModal = function () {
    if ($scope.newBook.sched_id) {
      if (!$scope.isCompleted($scope.schedDetails)) {
        $scope.newWaitlist = {};
        $scope.newWaitlist.sched_id = $scope.newBook.sched_id;
        $scope.newWaitlist.date = $scope.newBook.date;
        angular.element('#add-waitlist-modal').Modal();
      } else {
        $.Notify({ content: 'Not allow to modify, This schedule is completed' });
      }
    } else {
      $.Alert('Please select schedule date and time');
    }
  }
  
  $scope.switchBikeModal = function (book) {
    if (!$scope.isCompleted($scope.schedDetails)) {
      ClassService.query({ date: $scope.newBook.date, sched_id: $scope.newBook.sched_id, seats: true }, function (seats) {
        $scope.selectedBook = book;
        if (seats.available.length) {
          var selectize = angular.element('#switch-seat')[0].selectize;
          selectize.settings.sortField = 'text';
          angular.forEach(seats.available, function (seat) {
            selectize.addOption({ value: seat, text: seat });
          });

          angular.element('#switch-bike-modal').Modal();
        } else {
          $.Notify({ content: 'No seats available to switch' });    
        }
      });
    } else {
      $.Notify({ content: 'Not allow to modify, This schedule is completed' });
    }
  }

  $scope.switchBike = function () {
    if ($scope.selectedBike) {
      var confirm_msg = 'Are you sure to switch you bike (' + $scope.selectedBook.seat_number + ') to ' + $scope.selectedBike + '?';
      $.Confirm(confirm_msg, function () {
        ClassService.update({ scheduleId: $scope.selectedBook._id }, { move_to_seat : $scope.selectedBike }, function () {
          $scope.reload();
        }, function (error) {
          $.Notify({ content: error.data });
        });
      });
    } else {
      $.Alert('Please select bike to switch')
    }
  }
  
  $scope.moveToClass = function (wait) {
    if (!$scope.isCompleted($scope.schedDetails)) {
      ClassService.query({ date: $scope.newBook.date, sched_id: $scope.newBook.sched_id, seats: true }, function (seats) {
        $scope.selectedWaitList = wait;
        if (seats.available.length) {
          var selectize = angular.element('#select-seat')[0].selectize;
          selectize.settings.sortField = 'text';
          angular.forEach(seats.available, function (seat) {
            selectize.addOption({ value: seat, text: seat });
          });
          
          angular.element('#move-to-class-modal').Modal();
        } else {
          $.Notify({ content: 'No seats available' });    
        }
      });
    } else {
      $.Notify({ content: 'Not allow to modify, This schedule is completed' });
    }
  }

  $scope.bookWaitList = function () {
    ClassService.update({ scheduleId: $scope.selectedWaitList._id }, { move_to_seat : $scope.selectedWaitList.seat_number, waitlist: true }, function () {
      $scope.reload();
    }, function (error) {
      $.Notify({ content: error.data });
    });
  }
  
  $scope.removeFromWaitlist = function (wait, index) {
    if (!$scope.isCompleted(wait.schedule)) {
      $.Confirm('Are you sure on cancelling ' + wait.user_id.first_name + ' waitlist ?', function () {
        $scope.waitList.splice(index, 1);
        ClassService.delete({ scheduleId: wait._id });
      });
    } else {
      $.Notify({ content: 'Not allow to modify, This schedule is completed' });
    }
  }

  $scope.releaseWaitlist = function () {
    if (!$scope.newBook.sched_id) {
      $.Alert('Please select a valid schedule');
      return;
    }

    if (!$scope.waitList || $scope.waitList.length <= 0) {
      $.Notify({ content: 'No waitlist found to release' });
      return;
    }

    $.Confirm('Are you sure on cancelling all waitlist for this schedule ?', function () {
      $scope.waitList = [];
      ClassService.delete({ scheduleId: 'None', sched_id: $scope.newBook.sched_id, waitlist: true });
    });
  }

  $scope.printWaitlist = function () {
    if (!$scope.newBook.sched_id) {
      $.Alert('Please select a valid schedule');
      return;
    }

    if ($scope.waitList && $scope.waitList.length > 0) {
      window.location = '/admin/export/waitlist?sched_id=' + $scope.newBook.sched_id;  
    } else {
      $.Alert('No waitlist schedule found');
    }
  }

  $scope.downloadBookingList = function () {
    if (!$scope.newBook.sched_id) {
      $.Alert('Please select a valid schedule');
      return;
    }
    window.location = '/admin/export/download-bookings?sched_id=' + $scope.newBook.sched_id;
  }

  $scope.isBlocked = function (seat) {
    if ($scope.blockedBikes && $scope.blockedBikes[seat]) {
      return true;
    }
    return false;
  }

  $scope.checkSeat = function (seat) {
    if ($scope.schedDetails && $scope.books) { 
      for (var b in $scope.books) {
        if ($scope.books[b].seat_number == seat ||
            seat > $scope.schedDetails.seats) {
          return true;
        }
      }
    }

    return false;
  }

  $scope.viewBikeMap = function () {
    if (!$scope.newBook.sched_id) {
      $.Alert('Please select a valid schedule');
      return;
    }
    
    if (!$scope.isCompleted($scope.schedDetails)) {
      SettingService.getBlockedBikes(function (bikes) {
        $scope.blockedBikes = bikes;
      });
      angular.element('#bike-map-modal').Modal();
    } else {
      $.Notify({ content: 'This schedule is completed' });
    }
  }
   
});


ctrls.controller('ScheduleCtrl', function ($scope, $timeout, ScheduleService, InstructorService) {
  
  var calendar = angular.element('.calendar');
  calendar.fullCalendar({
    defaultView: 'agendaWeek',
    allDaySlot: false,
    allDay: false,
    minTime: '05:00:00',
    maxTime: '23:00:00',
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

  var addSeats = angular.element('#add-no-seats')[0].selectize;
  var editSeats = angular.element('#edit-no-seats')[0].selectize;
  addSeats.settings.sortField = 'text';
  addSeats.settings.sortDirection = 'desc';
  editSeats.settings.sortField = 'text';
  editSeats.settings.sortDirection = 'desc';
  for (var x = 37; x > 0; x--) {
    addSeats.addOption({ value: x, text: x });
    editSeats.addOption({ value: x, text: x });
  }
  addSeats.setValue(37);


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
    $timeout(function () {
      angular.element('#add-select-schedule-type')[0].selectize.setValue('');
      angular.element('#add-class-instructor')[0].selectize.setValue('');
      angular.element('#add-no-seats')[0].selectize.setValue(37);
    }, 400);
    angular.element('#add-sched-modal').Modal();
    angular.element('#add-sched-modal .modal__box').drags();
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

  $scope.isPastDate = function (sched) {
    var now = new Date();
    var date = sched.date;
    if (date instanceof Date) {
      date.setHours(sched.start.getHours(), date.start.getMinutes(), 0, 0);
    } else {
      var dateParts = sched.date.split(/[^0-9]/);
      date =  new Date(dateParts[0], dateParts[1]-1, dateParts[2], sched.start.getHours(), sched.start.getMinutes());
    }

    if (date < now) {
      return true;
    }

    return false
  }

  $scope.removeSchedule = function (sched) {
    if (sched.ridersCount > 0) {
      $.Alert('Not allowed to remove schedules has reservations')
      return;
    }

    if (!$scope.isPastDate($scope.editSched)) {
      $.Confirm('Are you sure on deleting schedule ?', function () {
        ScheduleService.delete({ scheduleId: sched.id });
        calendar.fullCalendar('removeEvents', sched.id);
      });
    } else {
      $.Alert('Not allowed remove schedule on past dates');
    }
  }

  $scope.editSchedule = function (sched) {
    $timeout(function () {
      angular.element('#edit-select-schedule-type')[0].selectize.setValue(sched.type);
      angular.element('#edit-class-instructor')[0].selectize.setValue(sched.instructor._id);
      angular.element('#edit-no-seats')[0].selectize.setValue(sched.seats);
    }, 400);
    angular.element('#edit-sched-modal').Modal();
  }

  $scope.saveSchedule = function () {

    if (!$scope.newSpecSched.date || 
        !$scope.newSpecSched.type || 
        !$scope.newSpecSched.instructor || 
        !$scope.newSpecSched.start || 
        !$scope.newSpecSched.end) {
      $.Alert('Please complete schedule information');
      return;
    }

    if (!$scope.isPastDate($scope.newSpecSched)) {
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
    } else {
      $.Alert('Not allowed to schedule past dates');
      $scope.newSpecSched = {};
    }
  }

  $scope.updateSchedule = function () {
    if (!$scope.isPastDate($scope.editSched)) {
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
    } else {
      $.Alert('Not allowed to modify/set schedule on past dates');
    }
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

  $scope.uploadImage = function (files, type) {
    if (files && files[0]) {
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
          $('#' + type).attr('src', $('#' + type).attr('src') + '?timestamp=' + new Date().getTime());
        },
        function (e) {
          $scope.uploading = false;
          $.Alert(e.data);
        },
        function (e) {
          var progress = parseInt(100.0 * e.loaded / e.total);
          if (progress < 100)
          $.Notify({ content: 'Uploading (' + progress + '%)' });
        }
      );
    }
  }

  $scope.uploadSlider = function (files) {
    if (files && files[0]) {
      var file = files[0];
      if (['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) < 0) {
        $.Alert('Invalid file type');
        return;
      } else if (file.size > (1024 * 1024 * 3)) {
        $.Alert('Must not exceed 3MB');
        return;
      }
      $scope.toUploadFile = file;
    } else {
      $scope.toUploadFile = null;
    }
  }

  $scope.saveSlider = function () {
    if ($scope.toUploadFile &&
       $scope.newSlider && $scope.newSlider.text) {
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
          if (progress < 100)
          $.Notify({ content: 'Uploading (' + progress + '%)' });
        }
      );
    } else {
      $.Notify({ content: 'Please upload a file and input a text.' });
    }
  }

  $scope.updateSliderImg = null;
  $scope.changeSliderImg = function (slider) {
    if (!$scope.uploading) {
      $scope.updateSliderImg = slider;
    }
  }

  $scope.chkChangeImg = function (id) {
    if ($scope.updateSliderImg && $scope.updateSliderImg._id == id) {
      return true;
    }
    return false;
  }

  $scope.cancelChangeImg = function () {
    $scope.updateSliderImg = null;
  }

  $scope.updateSlider = function () {
    if ($scope.toUploadFile ||
       ($scope.updateSliderImg && $scope.updateSliderImg.text)) {
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
          if (progress < 100)
          $.Notify({ content: 'Uploading (' + progress + '%)' });
        }
      );
    }
  }

  $scope.removeSlider = function (slider) {
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
        $.Alert('Instructor must have first name')
        return;
      }

      if (!$scope.newInstructor.last_name) {
        $.Alert('Instructor must have last name')
        return;
      }      
      
      if (!$scope.newInstructor.email) {
        $.Alert('Instructor must have email')
        return;
      }
      
      if (!$scope.newInstructor.contact_number) {
        $.Alert('Instructor must have number of contact_number')
        return;
      }

      if (!$scope.newInstructor.gender)
        $scope.newInstructor.gender = 'male';

      var addSuccess = function (data) {
        $scope.picInstructor = data;
        $scope.uploadInsPic($scope.files);

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
  $scope.changeInsPic = function (ins) {
    if (!$scope.uploading) {
      $scope.picInstructor = ins;
    }
  }

  $scope.chkChangePic = function (id) {
    if ($scope.picInstructor && $scope.picInstructor._id == id) {
      return true;
    }
    return false;
  }

  $scope.cancelChangePic = function () {
    $scope.picInstructor = null;
  }

  $scope.uploading = false;
  $scope.uploadInsPic = function (files) {

    if (!$scope.picInstructor) {
      $scope.files = files;
      return;
    }

    if (files && files[0]) {
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
    if (ins.birthdate) {
      $scope.updateInstructor.birthdate = ins.birthdate.replace(' 00:00:00', '');
    } else {
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
    $.Confirm('Are you sure on deleting ' + ins.admin.first_name + ' ' + ins.admin.last_name + ' ?', function () {
      var addSuccess = function (data) {
        InstructorService.query().$promise.then(function (data) {
          $scope.instructors = data;
        });
      }

      var addFail = function (error) {
        $.Alert(error.data);
      }

      InstructorService.delete({instructorId : ins._id}).$promise.then(addSuccess, addFail);
    });
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
      if (pack) select.addOption({ value: pack._id, text: pack.name });
    });
  });
});

ctrls.controller('StatisticCtrl', function ($scope, StatisticService, InstructorService, SettingService) {

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

  $scope.statFilter = {};
  $scope.statFilter.fromDate = from_picker.get('value');
  $scope.statFilter.toDate = to_picker.get('value');

  // Check if there’s a “from” or “to” date to start with.
  if (from_picker.get('value')) {
    to_picker.set('min', from_picker.get('select'));
  }
  if (to_picker.get('value')) {
    from_picker.set('max', to_picker.get('select'));
  }

  // When something is selected, update the “from” and “to” limits.
  from_picker.on('set', function (event) {
    if (event.select) {
      to_picker.set('min', from_picker.get('select'));
    }
    else if ('clear' in event) {
      to_picker.set('min', false);
    }
  });
  to_picker.on('set', function (event) {
    if (event.select) {
      from_picker.set('max', to_picker.get('select'));
    }
    else if ('clear' in event) {
      from_picker.set('max', false);
    }
  });

  $scope.isCompleted = function (sched) {

    var now = new Date();
    var dateParts = sched.date.split(/[^0-9]/);
    var timeParts = sched.start.split(/[^0-9]/);
    var date =  new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[3], timeParts[4], timeParts[5]);
    if (date < now)
      return true;

    return false

  }


  $scope.filterDate = function () {
    if ($scope.statFilter) {
      var fromDate = $scope.statFilter.fromDate;
      var toDate = $scope.statFilter.toDate;
      $scope.stats = StatisticService.query({ fromDate:fromDate, toDate:toDate });
      $scope.stats.$promise.then(function (data) {
        $scope.stats = data;
      });
    } else {
      $.Alert('Please select a valid date values');
    }
  }

  $scope.isBlocked = function (seat) {
    if ($scope.blockedBikes && $scope.blockedBikes[seat]) {
      return true;
    }
    return false;
  }

  $scope.checkSeat = function (seat) {

    if ($scope.selectedStat && $scope.selectedStat.books) { 
      for (var b in $scope.selectedStat.books) {
        if ($scope.selectedStat.books[b].seat_number == seat ||
            seat > $scope.selectedStat.seats) {
          return true;
        }
      }
    }

    return false;
  }

  $scope.viewBikeMap = function (stat) {
    $scope.selectedStat = stat;
    SettingService.getBlockedBikes(function (bikes) {
      $scope.blockedBikes = bikes;
    });

    angular.element('#bike-map-modal').Modal();
  }

  $scope.viewUserList = function (stat, sType) {
    $scope.selectedStat = stat;
    $scope.selectedType = sType;
    angular.element('#list-users-modal').Modal();
  }

  InstructorService.query(function (instructors) {
    var select = angular.element('#search-instructor')[0].selectize;

    angular.forEach(instructors, function (ins) {
      if (ins) select.addOption({ value: ins._id, text: ins.admin.first_name + ' ' + ins.admin.last_name });
    });
  });

  $scope.withAvailableSeats = function (stat) {
    if ($scope.selectedOption && $scope.selectedOption != 'all') {
      if ($scope.selectedOption == 'withAvailable') {
        return stat.books.length < stat.seats;  
      } else if ($scope.selectedOption == 'withWaitlisted') {
        return stat.waitlist.length > 0;
      }
    }

    return true;
  }

});

ctrls.controller('SettingCtrl', function ($scope, SettingService) {

  var selectBlock = angular.element('#select-blocked-bikes')[0].selectize;

  $scope.blockedBikes = {};
  var reloadBlockBikes = function () {
    SettingService.getBlockedBikes(function (bikes) {
      $scope.blockedBikes = bikes;
      selectBlock.settings.sortField = 'text';
      selectBlock.clearOptions();
      for (var x = 37; x > 0; x--) {
        if (!bikes[x])
          selectBlock.addOption({ value: x, text: x });
      }
    });
  }
  reloadBlockBikes();

  for (var x = 37; x > 0; x--) {
    selectBlock.addOption({ value: x, text: x });
  }

  $scope.blockedBike = function () {
    if ($scope.newBlock) {
      if (!$scope.newBlock.bike || $scope.newBlock.bike.length == 0) {
        $.Alert('Please select bike to blocked')
        return;
      } 
      if (!$scope.newBlock.reason || $scope.newBlock.reason.length == 0) {
        $.Alert('Please provide a reason on blocking the bike')
        return;
      }

      SettingService.setBlockedBikes({ key: 'blocked_bikes' }, $scope.newBlock, function () {
        reloadBlockBikes();
        $scope.newBlock = {};
      }, function (error) { $.Alert(error.data); $scope.newBlock = {}; });
    }
  }

  $scope.unBlockedBike = function (bike) {
    SettingService.delBlockedBikes({ key: 'blocked_bikes', bike: bike }, function () {
      reloadBlockBikes();
    });
  }

});