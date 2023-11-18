(function() {
    'use strict';

    angular
        .module('app')
        .controller('LigneobjectifventeDeleteController',LigneobjectifventeDeleteController);

    LigneobjectifventeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Ligneobjectifvente'];

    function LigneobjectifventeDeleteController($uibModalInstance, entity, Ligneobjectifvente) {
        var vm = this;
        vm.ligneobjectifvente = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Ligneobjectifvente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
