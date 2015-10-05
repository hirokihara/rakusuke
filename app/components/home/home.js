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

    this.$moment.lang('ja', {
      weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
      weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
    });
    console.log('routeParams.id:', this.id);
  }

  function getEventdata(id) {
    console.log('HomeController getEventdata Method id:', id);
    var promise = vm.EventdataService.get(id);
    promise
      .then(function (datum) {
        vm.eventdata = datum;

        // 取得したスケジュール情報を改行区切りで配列化
        var arr = vm.eventdata.value.schedule.split(/\r\n|\r|\n/);

        // 空の配列を削除
        var i;
        for (i = 0; i < arr.length; i++) {
          if (arr[i].length <= 0) {
            arr.splice(i, 1);
          }
        }

        // バインディング
        vm.scheduleArr = arr;
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

    vm.maxDate = new Date(2020, 5, 22);

    vm.schedule = '';

    if (vm.id) {
      vm.scheduleMode = true;
      getEventdata(vm.id);
    }
  };

  HomeController.prototype.getDayClass = function(date, mode) {
    console.log('HomeController getDayClass');
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    var events =
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
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
      for (var i = 0; i < events.length; i++) {
        var currentDay = new Date(events[i].date).setHours(0, 0, 0, 0);
        if (dayToCheck === currentDay) {
          return events[i].status;
        }
      }
    }
    return '';
  };

  HomeController.prototype.addDate = function(date) {
    console.log('HomeController activate addDate', date);
    vm.schedule = vm.schedule + vm.$moment (date).format('MM月DD日（ddd） 19:00〜') + '\n';
  };

  HomeController.prototype.submitEvent = function() {
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
