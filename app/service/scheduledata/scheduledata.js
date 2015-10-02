/**
 * Scheduledata Service module.
 *
 * @module rakusuke.service.scheduledata
 */
(function() {
  'use strict';

  angular
    .module('rakusuke.service.scheduledata', ['rakusuke.service.apimain'])
    .factory('ScheduledataService', ScheduledataService);

  ScheduledataService.$inject = ['ApimainService'];

  /**
   * ScheduledataService
   *
   * @class ScheduledataService
   * @constructor
   */
  function ScheduledataService(ApimainService) {

    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */
    ApimainService.setUri('schedule');

    return ApimainService;
  }

})();
