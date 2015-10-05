(function() {
  'use strict';

  angular
    .module('rakusuke.mock.service.schedule', [])
    .factory('ScheduleService', ScheduleService);

  function ScheduleService() {
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
