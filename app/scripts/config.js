// jshint devel:true
(function () {
  'use strict';

  angular
    .module('rakusuke.config', [])
    .config(AppConfig);

  function AppConfig($locationProvider) {
    /*
      # Hashbang Mode
      http://www.example.com/#/aaa/
      # HTML5 Mode
      http://www.example.com/aaa/
    */
    $locationProvider.html5Mode(false);
  }

  AppConfig.$inject = ['$locationProvider'];
})();
