(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProduitAbimePerimeController', ProduitAbimePerimeController);

    ProduitAbimePerimeController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Produit', 'Categorie', 'Fabricant', 'Lignecommande', 'Conditionnement', 'Lot'];

    function ProduitAbimePerimeController ($scope, $stateParams, $uibModalInstance, entity, Produit, Categorie, Fabricant, Lignecommande, Conditionnement, Lot) {
        var vm = this;
        vm.produit = entity;
        vm.categories = Categorie.query();
        vm.fabricants = Fabricant.query();
        vm.lignecommandes = Lignecommande.query();
        vm.conditionnements = Conditionnement.query();
        vm.lots = Lot.query();
        vm.load = function(id) {
            Produit.get({id : id}, function(result) {
                vm.produit = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('webstockerApp:produitUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.produit.id !== null) {
                Produit.update(vm.produit, onSaveSuccess, onSaveError);
            } else {
                Produit.save(vm.produit, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
