(function() {
  'use strict';

  angular
    .module('rakusuke.mock.service.api', [])
    .factory('ApiService', ApiService);

  function ApiService() {
    return {
      some: someSpy
    };
  }

  var someSpy = jasmine.createSpy().and.returnValue(
    function(cb) {
      return result;
    }
  );

  var result = {};
})();
