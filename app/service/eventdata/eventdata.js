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
    var ds = milkcocoa.dataStore('main');

    var eventdataService = {
      read: function() {
        var d = $q.defer();
        ds.stream().next(function(err, data) {
          d.resolve(data);
        });
        return d.promise;
      },
      on: function(event, fnc) {
        if (ds) {
          ds.on(event, function(event) {
            fnc();
          });
          return true;
        } else {
          return false;
        }
      },
      push: function(data) {
        var d = $q.defer();
        ds.push(data, function(err, datum) {
          d.resolve(datum);
        });
        return d.promise;
      }
    };

    return eventdataService;
  }

})();
