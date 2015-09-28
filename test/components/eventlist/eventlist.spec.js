(function() {
  'use strict';

  describe('Controller: EventlistController', function() {

    beforeEach(module('rakusuke.components.eventlist'));

    var EventlistController;

    beforeEach(inject(function($controller) {
      EventlistController = $controller('EventlistController');
    }));

    describe('EventlistController', function() {
      it('Test Case', function() {
        EventlistController.activate();
      });
    });
  });
})();
