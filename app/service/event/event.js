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

  EventService.$inject = ['$q'];

  /**
   * EventService
   *
   * @class EventService
   * @constructor
   */
  function EventService($q) {
    console.log('EventService Constructor');
    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */
    var milkcocoa = new MilkCocoa('postiecel9pz.mlkcca.com');
    var ds = milkcocoa.dataStore('ng-test');

    var eventService = {
      read: function() {
        var d = $q.defer();
        ds.stream().next(function(err, data) {
          d.resolve(data);
        });
        return d.promise;
      },
      onPush: function(fnc) {
        if (ds) {
          ds.on('push', function(event) {
            fnc();
          });
          return true;
        } else {
          return false;
        }
      },
      push: function(data) {
        ds.push(data);
      }
    };

    return eventService;
  }

})();
