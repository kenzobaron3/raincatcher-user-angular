var CONSTANTS = require('../constants');

/**
 *
 * Controller for listing workers.
 *
 * @param $scope
 * @param mediator
 * @param {UserMediatorService} userMediatorService
 * @param $timeout
 * @constructor
 */
function WorkerListController($scope, mediator, userMediatorService, $timeout) {
  var self = this;

  userMediatorService.listUsers().then(function(workers) {
    $timeout(function() {
      self.workers = workers;
    });
  });

  self.selectWorker = function(event, worker) {
    mediator.publish('wfm:worker:selected', worker);
    event.preventDefault();
    event.stopPropagation();
  };

  self.isWorkerShown = function(worker) {
    return self.shownWorker === worker;
  };

  self.applyFilter = function(term) {
    term = term.toLowerCase();
    self.workers = $scope.workers.filter(function(worker) {
      return String(worker.id).indexOf(term) !== -1
        || String(worker.name).toLowerCase().indexOf(term) !== -1;
    });
  };
}


angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).controller("WorkerListController", ['$scope', 'mediator', 'userMediatorService', '$timeout', WorkerListController]);