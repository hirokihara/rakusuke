(function() {
  'use strict';

  angular
    .module('rakusuke.mock.service.scheduledata', [])
    .factory('ScheduledataService', ScheduledataService);

  function ScheduledataService() {
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
