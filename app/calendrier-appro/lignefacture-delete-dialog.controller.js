(function() {
    'use strict';

    angular
        .module('app')
        .controller('LignefactureDeleteController',LignefactureDeleteController);

    LignefactureDeleteController.$inject = ['$uibModalInstance', 'entity', 'Lignefacture'];

    function LignefactureDeleteController($uibModalInstance, entity, Lignefacture) {
        var vm = this;
        vm.lignefacture = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Lignefacture.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
