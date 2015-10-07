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

  HomeController.$inject = ['$routeParams', '$moment', 'EventdataService', 'MemberdataService'];

  /**
   * HomeController
   *
   * @class HomeController
   * @constructor
   */
  function HomeController($routeParams, $moment, EventdataService, MemberdataService) {
    console.log('HomeController Constructor');
    this.id = $routeParams.id;
    this.$moment = $moment;
    this.EventdataService = EventdataService;
    this.MemberdataService = MemberdataService;

    this.$moment.locale('ja', {
      weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
      weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
    });
    console.log('routeParams.id:', this.id);
  }

  /**
   * 参加者の出席情報の配列を改行区切りの文字列に変換する関数
   *
   * @method toStringParticipantArray
   * @param {String} str 改行文字を圧縮する対象の文字列
   * @return {String} packed 改行文字を圧縮した結果の文字列
   */
  function toStringParticipantChoices(array) {
    var str = '';

    var i;
    for (i = 0; i < array.length; i++) {
      str = str + array[i].choice + '\n';
    }

    return str;
  }

  /**
   * 参加者の出欠情報を保持するオブジェクトを作成する関数
   *
   * @method initParticipantData
   */
  function initParticipantData() {
    var i;
    var arr = [];
    for (i = 0; i < vm.eventDateArray.length; i++) {
      var data = {date:vm.eventDateArray[i], choice:'△'};
      arr[i] = data;
    }
    // initialize memberData
    vm.memberData = {name:'', array:arr, comment:''};
  }

  /**
   * 改行区切りの文字列を配列にする関数
   *
   * @method parseLineBreaks
   * @param {String} str 配列にする対象の改行区切りの文字列
   * @return {Array} arr 改行区切りの文字列をパースした結果の配列
   */
  function parseLineBreaks(str) {
    console.log('HomeController parseLineBreaks Method');
    // 改行区切りの文字列を配列にする
    var arr = str.split(/\r\n|\r|\n/);

    // 空の配列を削除
    var i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].length <= 0) {
        arr.splice(i, 1);
      }
    }

    return arr;
  }

  /**
   * イベントの情報を取得する関数
   *
   * @method getEvent
   * @param {String} id 取得するイベントのID
   */
  function getEvent(id) {
    console.log('HomeController getEvent Method id:', id);
    var promise = vm.EventdataService.get(id);
    promise
      .then(function (datum) {
        // イベント情報を取得
        vm.eventData = datum.value;

        // 日にち候補を配列にして一覧表示する
        vm.eventDateArray = parseLineBreaks(vm.eventData.date);

        // 参加者の出欠情報を保持するオブジェクトを作成する
        initParticipantData();
      })
      .catch(function (e) {
        console.log(e);
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
    vm.memberArr = [];

    // initialize datepicker
    vm.datepicker = new Date();
    vm.minDate = this.minDate ? null : new Date();
    vm.maxDate = new Date(2020, 5, 22);

    // initialize eventData
    vm.eventData = {title:'', description:'', choicess:'◯\n△\n×', date:''};

    // initialize memberData
    vm.memberData = {name:'', array:[], comment:''};

    if (vm.id) {
      vm.scheduleMode = true;
      getEvent(vm.id);
    }
  };

  /**
   * 予定日をカレンダーへ反映するメソッド
   *
   * @method getDayClass
   */
  HomeController.prototype.getDayClass = function(date, mode) {
    console.log('HomeController getDayClass Method');
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

  /**
   * カレンダーの入力内容を日にちテキストエリアへ反映するメソッド
   *
   * @method addDate
   */
  HomeController.prototype.addDate = function(date) {
    console.log('HomeController addDate Method', date);
    vm.eventData.date = vm.eventData.date + vm.$moment (date).format('MM月DD日（ddd） 19:00〜') + '\n';
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

    // イベント情報を保存
    var promise = vm.EventdataService.save(vm.eventData);
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

  /**
   * 参加者が入力した情報を保存するメソッド
   *
   * @method submitParticipation
   */
  HomeController.prototype.submitParticipation = function() {
    console.log('HomeController submitParticipation Method');
    console.log('vm.memberData:', vm.memberData);
    console.log('vm.memberDataArray:', toStringParticipantChoices(vm.memberData.array));
    var choices = toStringParticipantChoices(vm.memberData.array);
    var data = {eventId: vm.id, name: vm.memberData.name, comment: vm.memberData.comment, choices:choices};
    var promise = vm.MemberdataService.save(data);
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
