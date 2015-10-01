/**
 * Scheduledata Service module.
 *
 * @module rakusuke.service.scheduledata
 */
(function() {
  'use strict';

  angular
    .module('rakusuke.service.scheduledata', [])
    .factory('ScheduledataService', ScheduledataService);

  ScheduledataService.$inject = [];

  /**
   * ScheduledataService
   *
   * @class ScheduledataService
   * @constructor
   */
  function ScheduledataService() {

    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */
    var someProperty = {};

    var scheduledataService = {
      someMethod: function() {
        return;
      }
    };

    return scheduledataService;
  }

})();
