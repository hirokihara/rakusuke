(function() {
  'use strict';

  angular
    .module('rakusuke.mock.service.eventdata', [])
    .factory('EventdataService', EventdataService);

  function EventdataService() {
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
