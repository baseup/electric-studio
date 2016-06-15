var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('LandingPageCtrl', function ($scope, $timeout, LandingPageService) {
  $scope.landingPages = LandingService.query();
  $scope.landingPages.$promise.then(function (data) {
    $scope.landingPages = data;
    $timeout(function () {

      var glideObj = angular.element('.slider-container').glide({
        autoplay: 3000,
        hoverpause: false,
        arrows: false
      }).data('api_glide');

      var win = angular.element(window);
      var winH = win.height(),
        headerH = angular.element('.main-header').outerHeight(),
        footerH = angular.element('.main-footer').height();

      //preload images
      $timeout(function () {
        var maxTries = 60;
        var intervals = [];
        var counter = 0;

        angular.forEach(angular.element('.slider .preloaded-img'), function (value, key) {
          var img = angular.element(value);
          var src = img.attr('src');

          intervals.push({
            fn : '',
            tries : 0
          });

          var thsObj = intervals[counter];

          thsObj.fn = setInterval(function () {
            if (thsObj.tries > maxTries) {
              clearInterval(thsObj.fn);
            }
            if (img[0].complete) {
              img.parent().css({backgroundImage : 'url('+src+')'}).removeClass('loading');
              img.remove();
              clearInterval(thsObj.fn);
            }

            thsObj.tries++;
          }, 50)
          counter++;;
        });
      }, 800);

      if (win.width() >= 980) {
        angular.element('.fitscreen').find('.slide, .content-wrap').height(winH - (headerH + footerH));
      }

      if (!angular.element('.slider > li').css('width')) {
        // if (glideObj) {
          glideObj.reinit();
        // }
      }

      win.trigger('resize');
    }, 400);
  });
});
