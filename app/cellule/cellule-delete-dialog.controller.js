(function() {
    'use strict';

    angular
        .module('app')
        .controller('CelluleDeleteController',CelluleDeleteController);

    CelluleDeleteController.$inject = ['$uibModalInstance', 'entity', 'Cellule'];

    function CelluleDeleteController($uibModalInstance, entity, Cellule) {
        var vm = this;
        vm.cellule = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Cellule.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
