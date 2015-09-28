/**
 * Home Components module.
 *
 * @module rakusuke.components.home
 */
(function () {
  'use strict';

  angular
    .module('rakusuke.components.home', ['rakusuke.service.eventdata'])
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$moment', 'EventdataService'];

  /**
   * HomeController
   *
   * @class HomeController
   * @constructor
   */
  function HomeController($moment, EventdataService) {
    console.log('HomeController Constructor');
    this.$moment = $moment;
    this.EventdataService = EventdataService;
  }

  function read() {
    console.log('HomeController read Method');
    var msgs = vm.EventdataService.read();
    msgs
      .then(function (data) {
        vm.msgBoxes = data;
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
  HomeController.prototype.activate = function() {
    console.log('HomeController activate Method');
    vm = this;

    read();
    vm.EventdataService.onPush(read);

    // initialize datepicker
    vm.dt = new Date();
    vm.minDate = this.minDate ? null : new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    vm.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];
    vm.maxDate = new Date(2020, 5, 22);

    vm.schedule = '';
  };

  HomeController.prototype.sendMes = function() {
    console.log('HomeController activate sendMes');
    vm.EventdataService.push({name: vm.user, text: vm.msg});
  };

  HomeController.prototype.getDayClass = function(date, mode) {
    console.log('HomeController getDayClass');
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
      for (var i = 0; i < vm.events.length; i++) {
        var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);
        if (dayToCheck === currentDay) {
          return vm.events[i].status;
        }
      }
    }
    return '';
  };

  HomeController.prototype.addDate = function(date) {
    console.log('HomeController activate addDate', date);
    vm.schedule = vm.schedule + vm.$moment (date).format('YYYY年MM月DD日 19:00〜') + '\n';
  };

  HomeController.prototype.createEvent = function() {

  };

  var vm;
})();
