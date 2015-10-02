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
    var promise = vm.EventdataService.query();
    promise
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
    // vm.EventdataService.on('push', read);
  };
  EventlistController.prototype.remove = function(id) {
    console.log('EventlistController remove Method id:',id);
    var promise = vm.EventdataService.remove(id);
    promise
      .then(function (datum) {
        read();
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  // EventlistController.prototype.sendMes = function() {
  //   console.log('HomeController activate sendMes');
  //   vm.EventdataService.push({name: vm.user, text: vm.msg});
  // };
  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
