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

  HomeController.$inject = ['$routeParams', '$moment', 'EventdataService'];

  /**
   * HomeController
   *
   * @class HomeController
   * @constructor
   */
  function HomeController($routeParams, $moment, EventdataService) {
    console.log('HomeController Constructor');
    this.id = $routeParams.id;
    this.$moment = $moment;
    this.EventdataService = EventdataService;
    console.log('routeParams.id:', this.id);
  }

  function read() {
    console.log('HomeController read Method');
    var promise = vm.EventdataService.query();
    promise
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
    vm.creationSuccess = false;
    vm.scheduleMode = false;
    vm.choicess = '◯\n△\n×';

    // initialize datepicker
    vm.datepicker = new Date();
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

    if (vm.id) {
      vm.scheduleMode = true;
    }
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

  HomeController.prototype.submit = function() {
    console.log('HomeController activate sendMes');
    var promise = vm.EventdataService.save({eventname: vm.eventname, description: vm.description, choicess: vm.choicess, schedule: vm.schedule});
    promise
      .then(function (datum) {
        console.log('datum.id:', datum.id);
        vm.id = datum.id;
        vm.creationSuccess = true;
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  var vm;
})();
