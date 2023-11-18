(function() {
    'use strict';

    angular
        .module('app')
        .controller('EtatTransfertMagasinController',EtatTransfertMagasinController);

    EtatTransfertMagasinController.$inject = ['$uibModalInstance', 'entity', 'Magasin'];

    function EtatTransfertMagasinController($uibModalInstance, entity, Magasin) {
        var vm = this;
        vm.magasin = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Magasin.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
