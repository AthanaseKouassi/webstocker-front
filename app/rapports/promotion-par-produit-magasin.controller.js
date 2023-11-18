(function () {
    'use strict';

    angular
            .module('app')
            .controller('PromotionParProduitMagasinController', PromotionParProduitMagasinController);

    PromotionParProduitMagasinController.$inject = ['$rootScope', '$scope', '$state', '$stateParams','API_URL'];

    function PromotionParProduitMagasinController($rootScope, $scope, $state, $stateParams,API_URL) {
        var vm = this;

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

    }
})();