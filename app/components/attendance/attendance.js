/**
 * Attendance Components module.
 *
 * @module rakusuke.components.attendance
 */
(function () {
  'use strict';

  angular
    .module('rakusuke.components.attendance', ['rakusuke.service.eventdata', 'rakusuke.service.memberdata', 'rakusuke.components.modal'])
    .controller('AttendanceController', AttendanceController);

  AttendanceController.$inject = ['$routeParams', '$timeout', '$moment', 'EventdataService', 'MemberdataService', '$location', '$controller'];

  /**
   * AttendanceController
   *
   * @class AttendanceController
   * @constructor
   */
  function AttendanceController($routeParams, $timeout, $moment, EventdataService, MemberdataService, $location, $controller) {
    console.log('AttendanceController Constructor');
    this.eventId = $routeParams.eventId;
    this.$timeout = $timeout;
    this.$moment = $moment;
    this.EventdataService = EventdataService;
    this.MemberdataService = new MemberdataService(this.eventId);
    this.$location = $location;

    var self = this;
    var ModalController = $controller('ModalController', {
      self: self
    });
    angular.extend(this, ModalController);
    this.ModalController = ModalController;
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
    vm.memberData = {id: '', name: '', choiceSet: array, comment: ''};
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
   * イベント参加者リストを表示する
   *
   * @method dispMemberList
   * @param {String} id 取得するイベントのID
   */
  function dispMemberList() {
    console.log('AttendanceController dispMemberList Method');
    var promise = vm.MemberdataService.query();
    promise
      .then(function (data) {
        // vm.memberList = data;
        var array = [];
        var i;
        for (i = 0; i < data.length; i++) {
          array.push({id: data[i].id, name: data[i].value.name, choice: parseLineBreaks(data[i].value.choice), comment: data[i].value.comment});
        }
        vm.memberList = array;
        vm.memberCount = data.length;
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  /**
   * イベント参加者の情報を参加者情報入力エリアへセットするメソッド
   *
   * @method setMemberData
   * @param {String} id 取得するイベント参加者のID
   */
  function setMemberData(member) {
    console.log('AttendanceController setMemberData Method');
    var i;
    var array = [];
    for (i = 0; i < vm.eventDateArray.length; i++) {
      var data = {date:vm.eventDateArray[i], choice:member.choice[i]};
      array[i] = data;
    }
    vm.memberData = {id: member.id, name: member.name, choiceSet: array, comment: member.comment};
  }

  /**
   * イベントの情報を取得する関数
   *
   * @method getEventData
   * @param {String} id 取得するイベントのID
   */
  function getEventData(id) {
    console.log('AttendanceController getEventData Method');
    var promise = vm.EventdataService.get(id);
    promise
      .then(function (datum) {
        // イベント情報を取得
        vm.eventData = datum.value;

        // 日にち候補を配列にして一覧表示する
        vm.eventDateArray = parseLineBreaks(vm.eventData.date);

        // 参加者の出欠情報を保持するオブジェクトを作成する
        initMemberData();

        // イベント参加者リストを表示する
        dispMemberList();
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
  AttendanceController.prototype.activate = function() {
    console.log('AttendanceController activate Method');
    vm = this;
    vm.editMode = false;
    vm.errorMode = false;
    vm.initButton = true;
    vm.memberCount = 0;

    vm.editOffset = offSetDefault;

    // initialize eventData
    vm.eventData = '';

    // initialize memberData
    vm.memberData = {id: '', name: '', choiceSet: [], comment: ''};

    if (vm.eventId) {
      getEventData(vm.eventId);
    } else {
      vm.errorMode = true;
    }

    vm.homeURL = vm.$location.absUrl().replace('/attendance/', '/home/').replace('/attendance', '/home');
  };

  /**
   * メンバーの出欠情報を編集出来る状態にするメソッド
   *
   * @method editMember
   */
  AttendanceController.prototype.editMember = function(member) {
    var modalInstance = this.ModalController.open();
    // modalInstance.result.then(function() {
    //   // $scope.message = 'closeが実行されました。';
    //   console.log('close!!!');
    // }, function() {
    //   // $scope.message = 'dismissが実行されました。';
    //   console.log('dismiss!!!');
    // });
    this.$timeout(function() {
      vm.editOffset = offSetDefault;
      vm.editMode = true;
      vm.initButton = true;
      setMemberData(member);
    });
  };

  /**
   * メンバー情報の入力エリアを初期化するメソッド
   *
   * @method initMember
   */
  AttendanceController.prototype.initMember = function() {
    this.$timeout(function() {
      vm.editOffset = offSetTopAlignment;
      vm.editMode = true;
      vm.initButton = false;
      initMemberData();
    });
  };

  /**
   * メンバーの出欠情報を保存するメソッド
   *
   * @method submitMember
   */
  AttendanceController.prototype.submitMember = function() {
    console.log('AttendanceController submitMember Method');
    var choice = toStringChoiceArray(vm.memberData.choiceSet);
    var name = vm.memberData.name.length === 0 ? '名無しさん' : vm.memberData.name;
    var value = {name: name, comment: vm.memberData.comment, choice: choice};
    var saveData = {id:vm.memberData.id, value:value};

    // メンバーの出欠情報を保存（最大16KByte 全角だと約800文字）
    var promise = vm.MemberdataService.save(saveData);
    promise
      .then(function (datum) {
        vm.editOffset = offSetDefault;
        vm.editMode = false;
        vm.initButton = true;
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  /**
   * イベント参加者リストをリフレッシュする
   *
   * @method refreshMemberList
   */
  AttendanceController.prototype.refreshMemberList = function() {
    console.log('AttendanceController refreshMemberList Method');
    // リスト更新
    dispMemberList();
  };
  /**
   * Angular ViewModel
   *
   * @property vm
   * @type {Object}
   */
  var vm;
  var offSetTopAlignment = '-200';
  var offSetDefault = '60';
})();
