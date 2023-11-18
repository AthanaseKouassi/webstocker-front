(function () {
    'use strict';

    angular
            .module('app')
            .controller('VenteParProduitMagasinController', VenteParProduitMagasinController);

    VenteParProduitMagasinController.$inject = ['$rootScope', '$scope', '$state', '$stateParams','API_URL'];

    function VenteParProduitMagasinController($rootScope, $scope, $state, $stateParams,API_URL) {
        var vm = this;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

    }
})();