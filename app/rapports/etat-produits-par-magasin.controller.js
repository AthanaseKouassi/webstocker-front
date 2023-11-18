(function () {
    'use strict';

    angular
            .module('app')
            .controller('EtatProduitParMagasinController', EtatProduitParMagasinController);

    EtatProduitParMagasinController.$inject = ['$rootScope', '$scope', '$state', '$stateParams','API_URL','Produit','Magasin'];

    function EtatProduitParMagasinController($rootScope, $scope, $state, $stateParams,API_URL,Produit,Magasin) {
        var vm = this;
        vm.magasins = Magasin.query();
        vm.produits = Produit.query();

        vm.clear = function () {
            // $uibModalInstance.dismiss('cancel');
        };

    }
})();
