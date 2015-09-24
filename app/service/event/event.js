/**
 * Event Service module.
 *
 * @module rakusuke.service.event
 */
(function() {
  'use strict';

  angular
    .module('rakusuke.service.event', [])
    .factory('EventService', EventService);

  EventService.$inject = [];

  /**
   * EventService
   *
   * @class EventService
   * @constructor
   */
  function EventService() {

    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */
    var someProperty = {};

    var eventService = {
      someMethod: function() {
        return;
      }
    };

    return eventService;
  }

})();
