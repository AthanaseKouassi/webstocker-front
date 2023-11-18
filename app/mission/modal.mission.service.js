(function() {
    'use strict';

    angular
        .module('app')
        .factory('ModalMissionService', ModalMissionService);

    ModalMissionService.$inject = ['$uibModal'];

    function ModalMissionService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        
        return service;
        
         function open (id) {
            console.log(id);
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'mission/modalmission.html',
                controller: 'ModalMissionController',
                controllerAs: 'vm',
                resolve: {
                    object: function () {
                        return parseInt(id);
                    }
                }
            });
            return modalInstance.result.then(
                resetModal,
                resetModal
            );
        }
    }
})();
