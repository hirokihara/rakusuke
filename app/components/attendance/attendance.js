/**
 * Attendance Components module.
 *
 * @module rakusuke.components.attendance
 */
(function () {
  'use strict';

  angular
    .module('rakusuke.components.attendance', ['rakusuke.service.eventdata', 'rakusuke.service.memberdata'])
    .controller('AttendanceController', AttendanceController);

  AttendanceController.$inject = ['$routeParams', '$moment', 'EventdataService', 'MemberdataService'];

  /**
   * AttendanceController
   *
   * @class AttendanceController
   * @constructor
   */
  function AttendanceController($routeParams, $moment, EventdataService, MemberdataService) {
    console.log('AttendanceController Constructor');
    this.eventId = $routeParams.eventId;
    this.$moment = $moment;
    this.EventdataService = EventdataService;
    this.MemberdataService = new MemberdataService(this.eventId);
  }

  /**
   * 参加者の出席情報の配列を改行区切りの文字列に変換する関数
   *
   * @method toStringChoiceArray
   * @param {Array} array 参加者の出席情報の配列
   * @return {String} str 改行区切りの文字列
   */
  function toStringChoiceArray(array) {
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
   * @method initMemberData
   */
  function initMemberData() {
    var i;
    var array = [];
    for (i = 0; i < vm.eventDateArray.length; i++) {
      var data = {date:vm.eventDateArray[i], choice:'△'};
      array[i] = data;
    }
    // initialize memberData
    vm.memberData = {name:'', choiceArray:array, comment:''};
  }

  /**
   * 改行区切りの文字列を配列にする関数
   *
   * @method parseLineBreaks
   * @param {String} str 配列にする対象の改行区切りの文字列
   * @return {Array} array 改行区切りの文字列をパースした結果の配列
   */
  function parseLineBreaks(str) {
    console.log('AttendanceController parseLineBreaks Method');
    // 改行区切りの文字列を配列にする
    var array = str.split(/\r\n|\r|\n/);

    // 空の配列を削除
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i].length <= 0) {
        array.splice(i, 1);
      }
    }

    return array;
  }

  /**
   * イベントの情報を取得する関数
   *
   * @method getEventData
   * @param {String} id 取得するイベントのID
   */
  function dispMemberList(id) {
    console.log('AttendanceController getEventData Method id:', id);
    var promise = vm.EventdataService.get(id);
    promise
      .then(function (datum) {
        // イベント情報を取得
        vm.eventData = datum.value;

        // 日にち候補を配列にして一覧表示する
        vm.eventDateArray = parseLineBreaks(vm.eventData.date);

        // 参加者の出欠情報を保持するオブジェクトを作成する
        initMemberData();
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  /**
   * イベントの情報を取得する関数
   *
   * @method getEventData
   * @param {String} id 取得するイベントのID
   */
  function getEventData(id) {
    console.log('AttendanceController getEventData Method id:', id);
    var promise = vm.EventdataService.get(id);
    promise
      .then(function (datum) {
        // イベント情報を取得
        vm.eventData = datum.value;
        // datum.timestampはUNIXタイムスタンプ
        console.log('AttendanceController getEventData Method datum:', datum);
        console.log('AttendanceController getEventData Method timestamp:', datum.timestamp);
        vm.eventTimestamp = Date(datum.timestamp);
        console.log('AttendanceController getEventData Method timestamp:', vm.eventTimestamp);

        // 日にち候補を配列にして一覧表示する
        vm.eventDateArray = parseLineBreaks(vm.eventData.date);

        // 参加者の出欠情報を保持するオブジェクトを作成する
        initMemberData();
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
  AttendanceController.prototype.activate = function() {
    console.log('AttendanceController activate Method');
    vm = this;
    vm.scheduleMode = false;

    // initialize eventData
    vm.eventData = '';

    // initialize memberData
    vm.memberData = {name:'', choiceArray:[], comment:''};

    if (vm.eventId) {
      vm.scheduleMode = true;
      getEventData(vm.eventId);
    }
  };

  /**
   * メンバーの出欠情報を保存するメソッド
   *
   * @method submitMember
   */
  AttendanceController.prototype.submitMember = function() {
    console.log('AttendanceController submitMember Method');
    var choice = toStringChoiceArray(vm.memberData.choiceArray);
    var value = {eventId: vm.eventId, name: vm.memberData.name, comment: vm.memberData.comment, choice:choice};
    var saveData = {id:'', value:value};

    // メンバーの出欠情報を保存（最大16KByte 全角だと約800文字）
    var promise = vm.MemberdataService.save(saveData);
    promise
      .then(function (datum) {
        console.log('datum.id:', datum.id);
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
})();
