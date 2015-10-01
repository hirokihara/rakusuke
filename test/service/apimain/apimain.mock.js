(function() {
  'use strict';

  angular
    .module('rakusuke.mock.service.apimain', [])
    .factory('ApimainService', ApimainService);

  function ApimainService() {
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
