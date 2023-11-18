(function() {
    'use strict';

    angular
        .module('app')
        .controller('FabricantDeleteController',FabricantDeleteController);

    FabricantDeleteController.$inject = ['$uibModalInstance', 'entity', 'Fabricant'];

    function FabricantDeleteController($uibModalInstance, entity, Fabricant) {
        var vm = this;
        vm.fabricant = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Fabricant.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
