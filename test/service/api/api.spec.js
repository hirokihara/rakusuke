(function () {
  'use strict';

  describe('Service: ApiService', function() {

    var ApiService, $rootScope;

    beforeEach(module('rakusuke.service.api'));

    beforeEach(inject(function (_$rootScope_, _ApiService_) {
      ApiService = _ApiService_;
      $rootScope = _$rootScope_;
    }));

    describe('someThing', function() {
      it('someThing', function() {

      });
    });
  });
})();
