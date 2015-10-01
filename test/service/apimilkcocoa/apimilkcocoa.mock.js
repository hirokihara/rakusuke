(function() {
  'use strict';

  angular
    .module('rakusuke.mock.service.apimilkcocoa', [])
    .factory('ApimilkcocoaService', ApimilkcocoaService);

  function ApimilkcocoaService() {
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
