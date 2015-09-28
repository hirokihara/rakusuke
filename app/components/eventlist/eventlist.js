/**
 * Eventlist Components module.
 *
 * @module rakusuke.components.eventlist
 */
(function () {
  'use strict';

  angular
    .module('rakusuke.components.eventlist', ['rakusuke.service.eventdata'])
    .controller('EventlistController', EventlistController);

  EventlistController.$inject = ['EventdataService'];

  /**
   * EventlistController
   *
   * @class EventlistController
   * @constructor
   */
  function EventlistController(EventdataService) {
    console.log('EventlistController Constructor');
    this.EventdataService = EventdataService;
  }

  function read() {
    console.log('HomeController read Method');
    var msgs = vm.EventdataService.read();
    msgs
      .then(function (data) {
        vm.eventdata = data;
      })
      .catch(function (e) {
        console.log(e);
      });
  }
  /**
   * The controller activate makes it convenient to re-use the logic
   * for a refresh for the controller/View, keeps the logic together.
   *
   * @method activate
   */
  EventlistController.prototype.activate = function() {
    console.log('EventlistController activate Method');
    vm = this;
    read();
    vm.EventdataService.onPush(read);
  };

  EventlistController.prototype.sendMes = function() {
    console.log('HomeController activate sendMes');
    vm.EventdataService.push({name: vm.user, text: vm.msg});
  };
  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
