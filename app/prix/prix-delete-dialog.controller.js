(function() {
    'use strict';

    angular
        .module('app')
        .controller('PrixDeleteController',PrixDeleteController);

    PrixDeleteController.$inject = ['$uibModalInstance', 'entity', 'Prix'];

    function PrixDeleteController($uibModalInstance, entity, Prix) {
        var vm = this;
        vm.prix = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Prix.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
