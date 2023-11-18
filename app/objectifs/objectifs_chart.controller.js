(function() {
    'use strict';

    angular
        .module('app')
        .controller('ObjectifsChartController',ObjectifsChartController);

    ObjectifsChartController.$inject = [ 'entity', 'Objectifs'];

    function ObjectifsChartController( entity, Objectifs) {
        var vm = this;
        vm.objectifs = entity;
//        vm.clear = function() {
//            $uibModalInstance.dismiss('cancel');
//        };
//        vm.confirmDelete = function (id) {
//            Objectifs.delete({id: id},
//                function () {
//                    $uibModalInstance.close(true);
//                });
//        };
    }
})();
