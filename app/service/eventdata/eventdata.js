/**
 * Schedule Service module.
 *
 * @module rakusuke.service.eventdata
 */
(function() {
  'use strict';

  angular
    .module('rakusuke.service.eventdata', ['rakusuke.service.apimain'])
    .factory('EventdataService', EventdataService);

  EventdataService.$inject = ['ApimainService'];

  /**
   * EventdataService
   *
   * @class EventdataService
   * @constructor
   */
  function EventdataService(ApimainService) {
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
    var apiService = new ApimainService('event');
    console.log(apiService);

    return apiService;
  }

})();
