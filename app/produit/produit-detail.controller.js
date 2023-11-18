(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProduitDetailController', ProduitDetailController);

    ProduitDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Produit', 'Categorie', 'Fabricant', 'Lignecommande', 'Conditionnement', 'Lot'];

    function ProduitDetailController($scope, $rootScope, $stateParams, entity, Produit, Categorie, Fabricant, Lignecommande, Conditionnement, Lot) {
        var vm = this;
        vm.produit = entity;
        
        vm.load = function (id) {
            Produit.get({id: id}, function(result) {
                vm.produit = result;
            });
        };
        var unsubscribe = $rootScope.$on('webstockerApp:produitUpdate', function(event, result) {
            vm.produit = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
