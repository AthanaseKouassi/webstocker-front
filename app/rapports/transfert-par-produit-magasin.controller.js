(function () {
    'use strict';

    angular
            .module('app')
            .controller('TransfertParProduitMagasinController', TransfertParProduitMagasinController);

    TransfertParProduitMagasinController.$inject = ['$rootScope', '$scope', '$state', '$stateParams','API_URL'];

    function TransfertParProduitMagasinController($rootScope, $scope, $state, $stateParams,API_URL) {
        var vm = this;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

    }
})();