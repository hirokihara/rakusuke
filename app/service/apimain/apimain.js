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
    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */

    return ApimilkcocoaService;
  }

})();
