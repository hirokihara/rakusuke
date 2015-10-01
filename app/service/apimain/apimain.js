/**
 * Apimain Service module.
 *
 * @module rakusuke.service.apimain
 */
(function() {
  'use strict';

  angular
    .module('rakusuke.service.apimain', ['rakusuke.service.apimilkcocoa'])
    .factory('ApimainService', ApimainService);

  ApimainService.$inject = ['ApimilkcocoaService'];

  /**
   * ApimainService
   *
   * @class ApimainService
   * @constructor
   */
  function ApimainService(ApimilkcocoaService) {
    return ApimilkcocoaService;
  }

})();
