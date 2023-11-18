(function() {
    'use strict';

    angular
        .module('app')
        .controller('EtatVenteMagasinController',EtatVenteMagasinController);

    EtatVenteMagasinController.$inject = ['$uibModalInstance', 'entity', 'Magasin'];

    function EtatVenteMagasinController($uibModalInstance, entity, Magasin) {
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
