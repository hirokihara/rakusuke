/**
 * Participant Service module.
 *
 * @module rakusuke.service.participant
 */
(function() {
  'use strict';

  angular
    .module('rakusuke.service.participant', ['rakusuke.service.apimain'])
    .factory('ParticipantService', ParticipantService);

  ParticipantService.$inject = ['ApimainService'];

  /**
   * ParticipantService
   *
   * @class ParticipantService
   * @constructor
   */
  function ParticipantService(ApimainService) {

    /**
     * My property description.  Like other pieces of your comment blocks,
     * this can span multiple lines.
     *
     * @property propertyName
     * @type {Object}
     * @default "foo"
     */
    ApimainService.setUri('schedule');

    return ApimainService;
  }

})();
