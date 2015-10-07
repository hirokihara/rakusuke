(function() {
  'use strict';

  angular
    .module('rakusuke.mock.service.memberdata', [])
    .factory('MemberdataService', MemberdataService);

  function MemberdataService() {
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
