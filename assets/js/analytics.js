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

var sales = document.getElementById('sales').getContext('2d');

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

var pos = document.getElementById('pos').getContext('2d');

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

var signup = document.getElementById('signup').getContext('2d');

var signupChart = new Chart(signup).Bar(signupData, { barValueSpacing: 10 });

