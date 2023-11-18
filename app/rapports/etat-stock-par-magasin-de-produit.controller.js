(function () {
    'use strict';

    angular
            .module('app')
            .controller('EtatStockParMagasinDeProduitController', EtatStockParMagasinDeProduitController);

    EtatStockParMagasinDeProduitController.$inject = ['$rootScope', '$scope', '$state', '$stateParams','API_URL','Produit','Magasin'];

    function EtatStockParMagasinDeProduitController($rootScope, $scope, $state, $stateParams,API_URL,Produit,Magasin) {
        var vm = this;
        vm.magasins = Magasin.query();
        vm.produits = Produit.query();

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

    }
})();
