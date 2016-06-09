/**
 * Home Components module.
 *
 * @module rakusuke.components.home
 */
(function () {
  'use strict';

  angular
    .module('rakusuke.components.home', ['rakusuke.service.eventdata', 'rakusuke.service.memberdata'])
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$routeParams', '$moment', '$location', 'EventdataService', 'MemberdataService'];

  /**
   * HomeController
   *
   * @class HomeController
   * @constructor
   */
  function HomeController($routeParams, $moment, $location, EventdataService, MemberdataService) {
    console.log('HomeController Constructor');
    this.eventId = $routeParams.eventId;
    this.$moment = $moment;
    this.$location = $location;
    this.EventdataService = EventdataService;
    this.MemberdataService = MemberdataService;

    this.$moment.locale('ja', {
      weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
      weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
    });
  }

  /**
   * 改行文字を圧縮する関数
   *
   * @method packLineBreaks
   * @param {String} str 改行文字を圧縮する対象の文字列
   * @return {String} packed 改行文字を圧縮した結果の文字列
   */
  function packLineBreaks(str) {
    var packed = '';

    // 複数の改行文字を一つにまとめる（空行を削除する）
    packed = str.replace(/[\r\n|\r|\n]{1,}/, '\n');

    return packed;
  }

  /**
   * イベントの情報を取得する関数
   * ※ attendance.jsにも同名の関数があるから、リファクタリングしなきゃ！
   *
   * @method getEventData
   * @param {String} id 取得するイベントのID
   */
  function getEventData(id) {
    console.log('HomeController getEventData Method');
    var promise = vm.EventdataService.get(id);
    promise
      .then(function (datum) {
        // イベント情報を取得
        vm.eventData = datum.value;
        console.log('HomeController getEventData', vm.eventData);
      })
      .catch(function (e) {
        console.log(e);
        vm.errorMode = true;
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
    vm.updateSuccess = false;
    vm.attendanceUrl = '';

    // initialize datepicker
    // vm.datepicker = new Date();
    vm.datepicker = '';
    vm.lastDate = '';
    vm.minDate = this.minDate ? null : new Date();
    vm.maxDate = new Date(2020, 5, 22);

    vm.saveWord = '';

    // initialize eventData
    if (vm.eventId) {
      getEventData(vm.eventId);
      vm.attendanceUrl = vm.$location.absUrl().replace('/home/', '/attendance/').replace('/home', '/attendance');
      vm.saveWord = '更新';
    } else {
      vm.eventData = {title: '', description: '', choices: '◯\n△\n×', date: ''};
      vm.saveWord = '決定';
    }

  };

  /**
   * 予定日をカレンダーへ反映するメソッド
   *
   * @method getDayClass
   */
  HomeController.prototype.getDayClass = function(date, mode) {
    console.log('HomeController getDayClass Method');
    // var tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // var afterTomorrow = new Date();
    // afterTomorrow.setDate(tomorrow.getDate() + 2);
    // var events =
    // [
    //   {
    //     date: tomorrow,
    //     status: 'full'
    //   },
    //   {
    //     date: afterTomorrow,
    //     status: 'partially'
    //   }
    // ];
    // if (mode === 'day') {
    //   var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
    //   for (var i = 0; i < events.length; i++) {
    //     var currentDay = new Date(events[i].date).setHours(0, 0, 0, 0);
    //     if (dayToCheck === currentDay) {
    //       return events[i].status;
    //     }
    //   }
    // }
    return '';
  };

  /**
   * カレンダーの入力内容を日にちテキストエリアへ反映するメソッド
   *
   * @method addDate
   */
  HomeController.prototype.addDate = function(date) {
    console.log('HomeController addDate Method');
    if (date !== vm.lastDate) {
      vm.eventData.date = vm.eventData.date + vm.$moment(date).format('MM月DD日（ddd） 19:00〜') + '\n';
      vm.lastDate = date;
    }
  };

  /**
   * 主催者が作成したイベント情報を保存するメソッド
   *
   * @method submitEvent
   */
  HomeController.prototype.submitEvent = function() {
    console.log('HomeController submitEvent Method');
    // 日にちテキストエリアの空行を詰める
    vm.eventData.date = packLineBreaks(vm.eventData.date);
    var saveData = {id:vm.eventId, value:vm.eventData};

    // イベント情報を保存（最大16KByte 全角だと約800文字）
    var promise = vm.EventdataService.save(saveData);
    promise
      .then(function (datum) {
        if (vm.eventId) {
          vm.updateSuccess = true;
        } else {
          // 出欠入力ページへのリンクを生成
          vm.attendanceUrl = vm.$location.absUrl().replace('/home/', '/').replace('/home', '/') + 'attendance/' + datum.id;
          vm.creationSuccess = true;
        }
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  var vm;
})();
