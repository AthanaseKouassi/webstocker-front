(function () {
    'use strict';

    angular
            .module('app')
            .controller('PerteParProduitMagasinController', PerteParProduitMagasinController);

    PerteParProduitMagasinController.$inject = ['$rootScope', '$scope', '$state', '$stateParams','API_URL'];

    function PerteParProduitMagasinController($rootScope, $scope, $state, $stateParams,API_URL) {
        var vm = this;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

    }
})();