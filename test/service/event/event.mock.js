(function() {
  'use strict';

  angular
    .module('rakusuke.mock.service.event', [])
    .factory('EventService', EventService);

  function EventService() {
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
