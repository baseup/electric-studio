// Karma configuration
// Generated on Tue Apr 26 2016 13:11:44 GMT+0800 (PHT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // dependencies
      'assets/vendor/jquery/dist/jquery.min.js',
      'node_modules/angular/angular.min.js',
      'node_modules/angular-resource/angular-resource.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'assets/vendor/angular-sanitize/angular-sanitize.min.js',
      'assets/vendor/angular-websocket/dist/angular-websocket.js',
      'assets/js/src/script.js',
      'assets/js/src/angular-amplitude.js',
      // core angular modules
      'assets/js/src/app/services.js',
      'tests/unit/controller.js',

      // angular controllers
      'assets/js/src/app/ctrls/base.js',
      'assets/js/src/app/ctrls/login.js',
      'assets/js/src/app/ctrls/signup.js',
      'assets/js/src/app/ctrls/rates.js',
      'assets/js/src/app/ctrls/schedule.js',
      // test specs
      'tests/unit/**/*Spec.js',
      // html tempalates
      'app/views/ng-templates/**/*.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'dots', 'junit'],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'base/templates/**/*.html': ['ng-html2js'],
      'assets/js/src/app/ctrls/**.js': ['coverage']
    },

    // coverageReporter: {
    //   type: 'cobertura',
    //   dir: 'tests/coverage/',
    //   file: 'test-results.xml'
    // },

    coverageReporter: {
      type: 'html',
      dir: 'tests/coverage/'
    },

    junitReporter: {
      outputFile: 'tests/coverage/test-results.xml',
      useBrowserName: false
    },


    ngHtml2JsPreprocessor: {
      // If your build process changes the path to your templates,
      // use stripPrefix and prependPrefix to adjust it.
      // stripPrefix: "source/path/to/templates/.*/",
      // prependPrefix: "web/path/to/templates/",

      // the name of the Angular module to create
      moduleName: "base.templates"
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    client: {
      captureConsole: true
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
