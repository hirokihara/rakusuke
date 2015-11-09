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
    // 将来の変更に耐えられるよう、基本的に$resourceと同様のメソッドを用意しています。
    // 'get': {method: 'GET'},
    // 'save': {method: 'POST'},
    // 'query': {method: 'GET', isArray: true},
    // 'remove': {method: 'DELETE'},
    // 'delete': {method: 'DELETE'}
    return function(storename, eventId) {
      this.milkcocoa = new MilkCocoa('seaigrszqjz.mlkcca.com');
      if (eventId) {
        this.ds = this.milkcocoa.dataStore(storename).child(eventId);
      } else {
        this.ds = this.milkcocoa.dataStore(storename);
      }

      this.setUri = function(uri) {
        console.log('apimilkcocoaService setUri method uri:', uri);
        storename = uri;
      };
      this.get = function(id) {
        var d = $q.defer();
        this.ds.get(id, function(err, datum) {
          d.resolve(datum);
          console.log(datum);
        });
        return d.promise;
      };
      this.query = function() {
        var d = $q.defer();
        this.ds.stream().size(100).next(function(err, data) {
          d.resolve(data);
        });
        return d.promise;
      };
      this.save = function(data) {
        var d = $q.defer();
        if (data.id) {
          this.ds.set(data.id, data.value, function(err, datum) {
            d.resolve(datum);
          });
        } else {
          this.ds.push(data.value, function(err, datum) {
            d.resolve(datum);
          });
        }
        return d.promise;
      };
      this.remove = function(id) {
        var d = $q.defer();
        this.ds.remove(id, function(err, datum) {
          d.resolve(datum);
        });
        return d.promise;
      };
      this.on = function(event, fnc) {
        if (this.ds) {
          this.ds.on(event, function(event) {
            fnc();
          });
          return true;
        } else {
          return false;
        }
      };
      this.off = function(event) {
        if (this.ds) {
          this.ds.off(event);
          return true;
        } else {
          return false;
        }
      };
    };
  }

})();
