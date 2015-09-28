/**
 * Eventdata Service module.
 *
 * @module rakusuke.service.eventdata
 */
(function() {
  'use strict';

  angular
    .module('rakusuke.service.eventdata', [])
    .factory('EventdataService', EventdataService);

  EventdataService.$inject = ['$q'];

  /**
   * EventdataService
   *
   * @class EventdataService
   * @constructor
   */
  function EventdataService($q) {
    console.log('EventdataService Constructor');
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

    var eventdataService = {
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

    return eventdataService;
  }

})();
