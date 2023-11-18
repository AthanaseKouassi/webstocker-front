(function () {
    'use strict';

    angular
            .module('app')
            .controller('BordereauLivraisonParMagasinController', BordereauLivraisonParMagasinController);

    BordereauLivraisonParMagasinController.$inject = ['$rootScope', '$scope', '$state', '$stateParams','API_URL'];

    function BordereauLivraisonParMagasinController($rootScope, $scope, $state, $stateParams,API_URL) {
        var vm = this;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

    }
})();
