(function () {
  'use strict';

  describe('Service: EventService', function() {

    var EventService, $rootScope;

    beforeEach(module('rakusuke.service.event'));

    beforeEach(inject(function (_$rootScope_, _EventService_) {
      EventService = _EventService_;
      $rootScope = _$rootScope_;
    }));

    describe('someThing', function() {
      it('someThing', function() {

      });
    });
  });
})();
