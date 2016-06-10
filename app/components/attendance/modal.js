/**
 * Eventlist Components module.
 *
 * @module rakusuke.components.eventlist
 */
(function () {
  'use strict';

  angular
    .module('rakusuke.components.modal', ['rakusuke.components.attendance'])
    .controller('ModalController', ModalController);

  ModalController.$inject = ['$modal'];

  /**
   * ModalController
   *
   * @class ModalController
   * @constructor
   */
  function ModalController($modal) {
    var self = this;
    self.name = 'Open Me!';
    var AttendanceController = function ($scope, $modalInstance) {
      $scope.ok = function () {
        $modalInstance.close({my: 'data'});
      };
      $scope.cancel = function () {
        $modalInstance.dismiss();
      };
    };

    self.open = function (size) {
      var modalInstance = $modal.open({
        animation: self.animationsEnabled,
        templateUrl: 'help.html',
        controller: AttendanceController,
        size: size
      });
    };
  }

  var vm;
})();
