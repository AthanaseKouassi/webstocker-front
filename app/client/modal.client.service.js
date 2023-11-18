(function() {
    'use strict';

    angular
        .module('app')
        .factory('ModalClientService', ModalClientService);

    ModalClientService.$inject = ['$uibModal'];

    function ModalClientService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        
        return service;
        
        function open (id) {
            if(parseInt(id)<0){
                alert('Selectionner un client');
            }
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'client/modalclient.html',
                controller: 'ModalClientController',
                controllerAs: 'vm',
                resolve: {
                    object:function () {
                                return id;
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
