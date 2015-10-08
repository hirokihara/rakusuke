(function() {
  'use strict';

  describe('Controller: AttendanceController', function() {

    beforeEach(module('rakusuke.components.attendance'));

    var AttendanceController;

    beforeEach(inject(function($controller) {
      AttendanceController = $controller('AttendanceController');
    }));

    describe('AttendanceController', function() {
      it('Test Case', function() {
        AttendanceController.activate();
      });
    });
  });
})();
