/**
 * Participant Service module.
 *
 * @module rakusuke.service.memberdata
 */
(function() {
  'use strict';

  angular
    .module('rakusuke.service.memberdata', ['rakusuke.service.apimain'])
    .factory('MemberdataService', MemberdataService);

  MemberdataService.$inject = ['ApimainService'];

  /**
   * MemberdataService
   *
   * @class MemberdataService
   * @constructor
   */
  function MemberdataService(ApimainService) {

    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */
    // ApimainService.setUri('schedule');
    var apiService = new ApimainService('member');
    console.log(apiService);

    return apiService;
  }

})();
