var ctrls = angular.module('elstudio.controllers.site');

ctrls.controller('SliderCtrl', function ($scope, $timeout, SliderService) {
  $scope.sliders = SliderService.query();
  $scope.sliders.$promise.then(function (data) {
    $scope.sliders = data;

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

          if(src) {
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
                img.hide();
                clearInterval(thsObj.fn);
              }

              thsObj.tries++;
            }, 50)
            counter++;
          }
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

      win.resize(function() {
        angular.element('.slide').each(function(index, value) {
          var image = win.width() >= 768
            ? $(this).find('.preloaded-img.desktop').attr('src')
            : $(this).find('.preloaded-img.mobile').attr('src');

          if(image) $(this).css('background-image', "url('" + image + "')").removeClass('loading');
        });
      });

      win.trigger('resize');
    }, 400);

  });
});
