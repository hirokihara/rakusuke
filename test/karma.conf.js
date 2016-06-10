// Karma configuration
// Generated on Mon Apr 20 2015 20:03:02 GMT+0900 (JST)
'use strict';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    //frameworks: ['mocha','chai','sinon'],
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-momentjs/angular-momentjs.js',
      'bower_components/angular-new-router/dist/router.es5.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
      'bower_components/ngSmoothScroll/angular-smooth-scroll.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      // injector:js
      'app/components/attendance/attendance.js',
      'app/components/attendance/modal.js',
      'app/components/eventlist/eventlist.js',
      'app/components/home/home.js',
      'app/scripts/config.js',
      'app/service/apimain/apimain.js',
      'app/service/apimilkcocoa/apimilkcocoa.js',
      'app/service/eventdata/eventdata.js',
      'app/service/gruntfiles/gruntfiles.js',
      'app/service/memberdata/memberdata.js',
      'test/components/about/about.spec.js',
      'test/components/attendance/attendance.spec.js',
      'test/components/contact/contact.spec.js',
      'test/components/eventlist/eventlist.spec.js',
      'test/components/home/home.spec.js',
      'test/main.spec.js',
      'test/service/api/api.mock.js',
      'test/service/api/api.spec.js',
      'test/service/apimain/apimain.mock.js',
      'test/service/apimain/apimain.spec.js',
      'test/service/apimilkcocoa/apimilkcocoa.mock.js',
      'test/service/apimilkcocoa/apimilkcocoa.spec.js',
      'test/service/eventdata/eventdata.mock.js',
      'test/service/eventdata/eventdata.spec.js',
      'test/service/gruntfiles/gruntfiles.mock.js',
      'test/service/gruntfiles/gruntfiles.spec.js',
      'test/service/memberdata/memberdata.mock.js',
      'test/service/memberdata/memberdata.spec.js',
      // endinjector
      'app/scripts/main.js',
      'test/main.spec.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'report',
      subdir: 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
