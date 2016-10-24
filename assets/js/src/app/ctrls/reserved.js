var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('ReservedCtrl', function ($scope, $location, BookService, SharedService, UserService) {

  if (!$scope.loginUser) {
    $location.path('/');
    angular.element('html, body').animate({ scrollTop: 0 }, 'slow');
    angular.element('.login-toggle').click();
  } else {

    $scope.reservations = BookService.query();
    $scope.reservations.$promise.then(function (data) {
      $scope.reservations = data;
    });
    $scope.user = UserService.get();
    $scope.user.$promise.then(function (data) {
      $scope.user = data;
    });

    $scope.reSched = function (book) {
      SharedService.set('resched', book);
      $location.path('/schedule');
    }

    $scope.cancelSched = function (book) {

      var today = new Date();
      var date = book.date.split(/[^0-9]/);
      var time = book.schedule.start.split(/[^0-9]/);
      var chkDate =  new Date(date[0], date[1]-1, date[2]-1, 17, 0, 0);
      if (book.status == 'booked' && +today >= +chkDate) {
        $scope.$emit('notify', { message: 'This ride can no longer be cancelled. You can only cancel your booking until 5pm the day before your ride.' });
        return;
      }
      $.Confirm('Are you sure you want to cancel?', function () {
        var data = {};
        data.status = 'cancelled';
        $scope.$emit('notify', { message: 'Canceling schedule ...', duration: 3000 });
        var bookSuccess = function () {
          window.location.reload();
        }
        var bookFail = function (error) {
          $scope.$emit('notify', { message: error.data, duration: 3000 });
        }

        BookService.update({ bookId: book._id }, data).$promise.then(bookSuccess, bookFail);
      });
    }
  }
});
