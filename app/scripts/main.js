/**
 * This is rakusuke module.
 *
 * @module rakusuke
 */
(function () {
  'use strict';

  angular
    .module('rakusuke', [
      'ngNewRouter',
      'rakusuke.config',
      'ui.bootstrap',
      'ngTouch',
      'angular-momentjs',
      'smoothScroll',
      'rakusuke.components.home',
      'rakusuke.components.attendance',
      'rakusuke.components.about',
      'rakusuke.components.contact',
      'rakusuke.components.eventlist'
    ])
    .controller('AppController', AppController);

  AppController.$routeConfig = [
    {path: '/',       redirectTo: '/home'},
    {path: '/home',    component: 'home'},
    {path: '/attendance/:eventId',    component: 'attendance'},
    {path: '/about',   component: 'about'},
    {path: '/contact', component: 'contact'},
    {path: '/eventlist', component: 'eventlist'}
  ];

  AppController.$inject = [];

  /**
   * AppController
   *
   * @class AppController
   * @main rakusuke
   * @constructor
   */
  function AppController () {}
})();
