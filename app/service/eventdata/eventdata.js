/**
 * Eventdata Service module.
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
    console.log('EventdataService Constructor');
    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */

    return ApimainService;
  }

})();
