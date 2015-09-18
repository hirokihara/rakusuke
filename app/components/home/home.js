/**
 * Home Components module.
 *
 * @module rakusuke.components.home
 */
(function () {
  'use strict';

  angular
    .module('rakusuke.components.home', [])
    .controller('HomeController', HomeController);

  HomeController.$inject = [];

  /**
   * HomeController
   *
   * @class HomeController
   * @constructor
   */
  function HomeController() {
    console.log('HomeController Constructor');
  }

  function readMes() {
    vm.ds.stream().next(function(err, data) {
      vm.msgBoxes = data;
      // vm.$apply();
    });
  }

  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  HomeController.prototype.activate = function() {
    console.log('HomeController activate Method');
    vm = this;
    var milkcocoa = new MilkCocoa('postiecel9pz.mlkcca.com');
    vm.ds = milkcocoa.dataStore('ng-test');
    vm.ds.on('push', function(event) {
      readMes();
    });
  };

  HomeController.prototype.sendMes = function() {
    console.log('HomeController activate sendMes');
    vm.ds.push({name: vm.user, text: vm.msg});
  };

  var vm;
})();
