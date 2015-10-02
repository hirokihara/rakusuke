/**
 * Apimilkcocoa Service module.
 *
 * @module rakusuke.service.apimilkcocoa
 */
(function() {
  'use strict';

  angular
    .module('rakusuke.service.apimilkcocoa', [])
    .factory('ApimilkcocoaService', ApimilkcocoaService);

  ApimilkcocoaService.$inject = ['$q'];

  /**
   * ApimilkcocoaService
   *
   * @class ApimilkcocoaService
   * @constructor
   */
  function ApimilkcocoaService($q) {
    console.log('ApimilkcocoaService Constructor');
    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */
    var milkcocoa = new MilkCocoa('postiecel9pz.mlkcca.com');
    var storename = '';
    // 'get': {method: 'GET'},
    // 'save': {method: 'POST'},
    // 'query': {method: 'GET', isArray: true},
    // 'remove': {method: 'DELETE'},
    // 'delete': {method: 'DELETE'}

    var apimilkcocoaService = {
      setUri: function(uri) {
        storename = uri;
      },
      get: function(id) {
        var ds = milkcocoa.dataStore(storename);
        var d = $q.defer();
        ds.get(id, function(err, datum) {
          d.resolve(datum);
        });
        return d.promise;
      },
      query: function() {
        var ds = milkcocoa.dataStore(storename);
        var d = $q.defer();
        ds.stream().next(function(err, data) {
          d.resolve(data);
        });
        return d.promise;
      },
      save: function(data) {
        var ds = milkcocoa.dataStore(storename);
        var d = $q.defer();
        ds.push(data, function(err, datum) {
          d.resolve(datum);
        });
        return d.promise;
      },
      remove: function(id) {
        var ds = milkcocoa.dataStore(storename);
        var d = $q.defer();
        ds.remove(id, function(err, datum) {
          d.resolve(datum);
        });
        return d.promise;
      },
      on: function(event, fnc) {
        var ds = milkcocoa.dataStore(storename);
        if (ds) {
          ds.on(event, function(event) {
            fnc();
          });
          return true;
        } else {
          return false;
        }
      },
      off: function(event) {
        var ds = milkcocoa.dataStore(storename);
        if (ds) {
          ds.off(event);
          return true;
        } else {
          return false;
        }
      }
    };

    return apimilkcocoaService;
  }

})();
