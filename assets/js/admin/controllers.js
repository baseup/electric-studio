'use strict';

var ctrls = angular.module('elstudio.controllers.admin', [
  'elstudio.services'
]);


ctrls.controller('NotFoundCtrl', function ($scope) {

});


ctrls.controller('AdminCtrl', function ($scope) {

  var sidebarToggleBtn = angular.element('.sidebar-toggle');
  
  sidebarToggleBtn.off('click.toggle');
  
  sidebarToggleBtn.on('click.toggle', function(e) {
    e.preventDefault();
    angular.element('.page-sidebar').toggleClass('toggle');
  });
  
  //apply selectize on all `.select` element
  angular.element('.select').selectize({
    create: true,
    sortField: 'text'
  });
    
  angular.element('.dashboard-menu').Dropdown();
  
});


ctrls.controller('AccountCtrl', function ($scope) {

  
  $scope.accountAddClass = function() {
    angular.element('#add-class-modal').Modal();
  }
  
  $scope.accountSummary = function() {
    angular.element('#account-summary-modal').Modal();
  }
  
});


ctrls.controller('ClassCtrl', function ($scope) {
  
  angular.element('#class-tabs').Tab();
  
  $scope.bookRide = function() {
    angular.element('#book-ride-modal').Modal();
  }
  
  $scope.switchBike = function() {
    angular.element('#switch-bike-modal').Modal();
  }
  
  $scope.moveToClass = function() {
    $.Notify({ content: 'User moved to class' });
  }
  
  $scope.removeFromWaitlist = function() {
    $.Notify({ content: 'User removed from Waitlist' });
  }
   
});


ctrls.controller('ScheduleCtrl', function($scope) {
  
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
    eventClick: function() {
      angular.element('#view-schedule-modal').Modal();
    }
  });
  
  $scope.addSchedule = function() {
    angular.element('#add-schedule-modal').Modal();
  }
  
});


ctrls.controller('PackageCtrl', function($scope) {
  
  $scope.addPackage = function() {
    angular.element('#add-package-modal').Modal();
  }
  
});


ctrls.controller('SliderCtrl', function($scope) {
  
  $scope.addSlide = function() {
    angular.element('#add-slide-modal').Modal();
  }
  
});


ctrls.controller('InstructorCtrl', function($scope) {
  
  $scope.addInstructor = function() {
    angular.element('#add-instructor-modal').Modal();
  }
  
});


ctrls.controller('AnalyticsCtrl', function($scope) {
  
  /* Analytics demo using Chart.js */

  // Global Defaults
  Chart.defaults.global.responsive = true;

  // Line Chart
  var salesData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "First dataset",
        fillColor: "rgba(203,200,199,0.2)",
        strokeColor: "rgba(203,200,199,1)",
        pointColor: "rgba(203,200,199,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "Second dataset",
        fillColor: "rgba(255,143,28,0.2)",
        strokeColor: "rgba(255,143,28,1)",
        pointColor: "rgba(255,143,28,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
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
      color:"#ff8f1c",
      highlight: "rgba(255,143,28,0.7)",
      label: "In-Store"
    },
    {
      value: 42,
      color: "#cbc8c7",
      highlight: "rgba(203,200,199,0.7)",
      label: "Mail-Order"
    },
    {
      value: 144,
      color: "#666",
      highlight: "rgba(102,102,102,0.7)",
      label: "Website"
    }
  ];

  var pos = angular.element('#pos')[0].getContext('2d');

  var posChart = new Chart(pos).Doughnut(posData);


  // Bar Chart
  var signupData = {
    labels: ["1 Pax", "5 Pax", "10 Pax", "15 Pax", "20 Pax", "30 Pax"],
    datasets: [
      {
        label: "Second dataset",
        fillColor: "rgba(203,200,199,0.2)",
        strokeColor: "rgba(203,200,199,0.7)",
        highlightFill: "rgba(203,200,199,0.4)",
        highlightStroke: "rgba(203,200,199,8)",
        data: [60, 42, 76, 68, 40, 40]
      },
      {
        label: "First dataset",
        fillColor: "rgba(255,143,28,0.2)",
        strokeColor: "rgba(255,143,28,0.7)",
        highlightFill: "rgba(255,143,28,0.4)",
        highlightStroke: "rgba(255,143,28,8)",
        data: [65, 59, 70, 67, 56, 10]
      }
    ]
  };

  var signup = angular.element('#package')[0].getContext('2d');

  var signupChart = new Chart(signup).Bar(signupData, { barValueSpacing: 10 });

});