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
      'rakusuke.components.home',
      'rakusuke.components.about',
      'rakusuke.components.contact'
    ])
    .controller('AppController', AppController);

  AppController.$routeConfig = [
    {path: '/',       redirectTo: '/home'},
    {path: '/home',    component: 'home'},
    {path: '/about',   component: 'about'},
    {path: '/contact', component: 'contact'}
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
