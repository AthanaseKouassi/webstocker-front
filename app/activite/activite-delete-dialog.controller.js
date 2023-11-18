(function() {
    'use strict';

    angular
        .module('app')
        .controller('ActiviteDeleteController',ActiviteDeleteController);

    ActiviteDeleteController.$inject = ['$uibModalInstance', 'entity', 'Activite'];

    function ActiviteDeleteController($uibModalInstance, entity, Activite) {
        var vm = this;
        vm.activite = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Activite.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
