(function () {
  'use strict';

  describe('Service: ParticipantService', function() {

    var ParticipantService, $rootScope;

    beforeEach(module('rakusuke.service.participant'));

    beforeEach(inject(function (_$rootScope_, _ParticipantService_) {
      ParticipantService = _ParticipantService_;
      $rootScope = _$rootScope_;
    }));

    describe('someThing', function() {
      it('someThing', function() {

      });
    });
  });
})();
