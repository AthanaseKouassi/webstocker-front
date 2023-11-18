(function() {
    'use strict';

    angular
        .module('app')
        .controller('BonDeSortieDeleteController',BonDeSortieDeleteController);

    BonDeSortieDeleteController.$inject = ['$uibModalInstance', 'entity', 'BonDeSortie'];

    function BonDeSortieDeleteController($uibModalInstance, entity, BonDeSortie) {
        var vm = this;
        vm.bonDeSortie = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            BonDeSortie.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
