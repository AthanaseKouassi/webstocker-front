(function() {
    'use strict';

    angular
        .module('app')
        .controller('CommuneDeleteController',CommuneDeleteController);

    CommuneDeleteController.$inject = ['$uibModalInstance', 'entity', 'Commune'];

    function CommuneDeleteController($uibModalInstance, entity, Commune) {
        var vm = this;
        vm.commune = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Commune.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
