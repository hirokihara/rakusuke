(function() {
  'use strict';

  angular
    .module('rakusuke.mock.service.participant', [])
    .factory('ParticipantService', ParticipantService);

  function ParticipantService() {
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
