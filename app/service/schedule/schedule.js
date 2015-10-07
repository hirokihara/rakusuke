/**
 * Schedule Service module.
 *
 * @module rakusuke.service.schedule
 */
(function() {
  'use strict';

  angular
    .module('rakusuke.service.schedule', ['rakusuke.service.apimain'])
    .factory('ScheduleService', ScheduleService);

  ScheduleService.$inject = ['ApimainService'];

  /**
   * ScheduleService
   *
   * @class ScheduleService
   * @constructor
   */
  function ScheduleService(ApimainService) {
    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */

    // 'get': {method: 'GET'},
    // 'save': {method: 'POST'},
    // 'query': {method: 'GET', isArray: true},
    // 'remove': {method: 'DELETE'},
    // 'delete': {method: 'DELETE'}
    // ApimainService.setUri('main');
    var apiService = new ApimainService('main');
    console.log(apiService);

    return apiService;
  }

})();
